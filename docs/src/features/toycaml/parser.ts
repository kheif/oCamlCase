// A small recursive-descent parser from ToyCaml concrete syntax to the `Exp`/`Ty`
// abstract syntax in ./ast. This is what makes the elaborator widget genuinely
// interactive: instead of only replaying fixed examples, a learner can type any
// expression the grammar allows and see it elaborated live.
//
// Grammar (standard arithmetic precedence; application binds tightest, `<=`
// loosest among operators - matching how `2 * x <= y` is read intuitively):
//
//   expr   := "if" expr "then" expr "else" expr
//           | "fun" "(" ident ":" ty ")" "->" expr
//           | leqExpr
//   leqExpr:= addExpr ( "<=" addExpr )?
//   addExpr:= mulExpr ( ("+" | "-") mulExpr )*
//   mulExpr:= appExpr ( "*" appExpr )*
//   appExpr:= atom+                              -- left-assoc application by juxtaposition
//   atom   := ident | int | "true" | "false" | "(" expr ")"
//
//   ty     := atomTy ( "->" ty )?                -- right-assoc
//   atomTy := "bool" | "int" | "(" ty ")"

import { Arrow, Bool, Int, type Exp, type Op, type Ty } from './ast';

export class ParseError extends Error {
  constructor(
    message: string,
    public readonly pos: number,
  ) {
    super(message);
    this.name = 'ParseError';
  }
}

type TokKind = 'ident' | 'int' | 'kw' | 'punct' | 'eof';
type Token = { kind: TokKind; text: string; pos: number };

const KEYWORDS = new Set(['if', 'then', 'else', 'fun', 'rfun', 'true', 'false']);
// Two-character tokens, tested before the single-character set so "->" and
// "<=" win over "-"/"<" (maximal munch). ToyCaml has no three-character tokens.
const PUNCT2 = ['->', '<='];
const PUNCT1 = '()+-*:';

function lex(src: string): Token[] {
  const toks: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9]/.test(src[j])) j++;
      toks.push({ kind: 'int', text: src.slice(i, j), pos: i });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_']/.test(src[j])) j++;
      const word = src.slice(i, j);
      toks.push({ kind: KEYWORDS.has(word) ? 'kw' : 'ident', text: word, pos: i });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (PUNCT2.includes(two)) {
      toks.push({ kind: 'punct', text: two, pos: i });
      i += 2;
      continue;
    }
    if (PUNCT1.includes(c)) {
      toks.push({ kind: 'punct', text: c, pos: i });
      i++;
      continue;
    }
    throw new ParseError(`unexpected character "${c}"`, i);
  }
  toks.push({ kind: 'eof', text: '', pos: src.length });
  return toks;
}

class Parser {
  private i = 0;
  constructor(private readonly toks: Token[]) {}

  private peek(): Token {
    return this.toks[this.i];
  }
  private take(): Token {
    return this.toks[this.i++];
  }
  private at(kind: TokKind, text?: string): boolean {
    const t = this.peek();
    return t.kind === kind && (text === undefined || t.text === text);
  }
  private expect(kind: TokKind, text?: string): Token {
    if (!this.at(kind, text)) {
      const t = this.peek();
      const found = t.kind === 'eof' ? 'end of input' : `"${t.text}"`;
      throw new ParseError(`expected ${text ? `"${text}"` : kind}, found ${found}`, t.pos);
    }
    return this.take();
  }

  expectEof(): void {
    if (!this.at('eof')) {
      const t = this.peek();
      throw new ParseError(
        `unexpected "${t.text}"; did you mean to stop the expression earlier?`,
        t.pos,
      );
    }
  }

  // ---- expressions -------------------------------------------------------

  expr(): Exp {
    if (this.at('kw', 'if')) return this.ifExpr();
    if (this.at('kw', 'fun')) return this.funExpr();
    if (this.at('kw', 'rfun')) return this.rfunExpr();
    return this.leqExpr();
  }

  private ifExpr(): Exp {
    this.expect('kw', 'if');
    const cond = this.expr();
    this.expect('kw', 'then');
    const then = this.expr();
    this.expect('kw', 'else');
    const els = this.expr();
    return { kind: 'If', cond, then, else: els };
  }

  private funExpr(): Exp {
    this.expect('kw', 'fun');
    this.expect('punct', '(');
    const param = this.expect('ident').text;
    this.expect('punct', ':');
    const paramTy = this.ty();
    this.expect('punct', ')');
    this.expect('punct', '->');
    const body = this.expr();
    return { kind: 'Fun', param, paramTy, body };
  }

  // rfun f (x : t) : t' -> e
  private rfunExpr(): Exp {
    this.expect('kw', 'rfun');
    const fnName = this.expect('ident').text;
    this.expect('punct', '(');
    const param = this.expect('ident').text;
    this.expect('punct', ':');
    const paramTy = this.ty();
    this.expect('punct', ')');
    this.expect('punct', ':');
    // Atomic return type: the next `->` separates the body, so a function return
    // type must be parenthesized, e.g. `rfun f (x:int) : (int -> int) -> ...`.
    const retTy = this.atomTy();
    this.expect('punct', '->');
    const body = this.expr();
    return { kind: 'RFun', fnName, param, paramTy, retTy, body };
  }

  private leqExpr(): Exp {
    const left = this.addExpr();
    if (this.at('punct', '<=')) {
      this.take();
      const right = this.addExpr();
      return mkOp('Leq', left, right);
    }
    return left;
  }

  private addExpr(): Exp {
    let left = this.mulExpr();
    while (this.at('punct', '+') || this.at('punct', '-')) {
      const op = this.take().text === '+' ? 'Add' : 'Sub';
      left = mkOp(op, left, this.mulExpr());
    }
    return left;
  }

  private mulExpr(): Exp {
    let left = this.appExpr();
    while (this.at('punct', '*')) {
      this.take();
      left = mkOp('Mul', left, this.appExpr());
    }
    return left;
  }

  private appExpr(): Exp {
    let head = this.atom();
    while (this.startsAtom()) {
      head = { kind: 'FApp', fn: head, arg: this.atom() };
    }
    return head;
  }

  private startsAtom(): boolean {
    const t = this.peek();
    return (
      t.kind === 'ident' ||
      t.kind === 'int' ||
      (t.kind === 'kw' && (t.text === 'true' || t.text === 'false')) ||
      (t.kind === 'punct' && t.text === '(')
    );
  }

  private atom(): Exp {
    const t = this.peek();
    if (t.kind === 'ident') {
      this.take();
      return { kind: 'Var', name: t.text };
    }
    if (t.kind === 'int') {
      this.take();
      return { kind: 'Con', con: { kind: 'ICon', value: parseInt(t.text, 10) } };
    }
    if (t.kind === 'kw' && (t.text === 'true' || t.text === 'false')) {
      this.take();
      return { kind: 'Con', con: { kind: 'BCon', value: t.text === 'true' } };
    }
    if (t.kind === 'punct' && t.text === '(') {
      this.take();
      const e = this.expr();
      this.expect('punct', ')');
      return e;
    }
    const found = t.kind === 'eof' ? 'end of input' : `"${t.text}"`;
    throw new ParseError(`expected an expression, found ${found}`, t.pos);
  }

  // ---- types --------------------------------------------------------------

  ty(): Ty {
    const left = this.atomTy();
    if (this.at('punct', '->')) {
      this.take();
      return Arrow(left, this.ty());
    }
    return left;
  }

  private atomTy(): Ty {
    const t = this.peek();
    if (t.kind === 'ident' && t.text === 'bool') {
      this.take();
      return Bool;
    }
    if (t.kind === 'ident' && t.text === 'int') {
      this.take();
      return Int;
    }
    if (t.kind === 'punct' && t.text === '(') {
      this.take();
      const ty = this.ty();
      this.expect('punct', ')');
      return ty;
    }
    const found = t.kind === 'eof' ? 'end of input' : `"${t.text}"`;
    throw new ParseError(`expected a type ("int", "bool", or "(...)"), found ${found}`, t.pos);
  }
}

function mkOp(op: Op, left: Exp, right: Exp): Exp {
  return { kind: 'OApp', op, left, right };
}

export function parseExp(src: string): Exp {
  const p = new Parser(lex(src));
  const e = p.expr();
  p.expectEof();
  return e;
}

export function parseTy(src: string): Ty {
  const p = new Parser(lex(src));
  const t = p.ty();
  p.expectEof();
  return t;
}
