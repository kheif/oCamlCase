// Syntactic analysis (parsing) for the lecture's simple ToyCaml fragment
// (Lecture 8, pages 38–45). A recursive-descent parser: one function per
// syntactic category, the first token choosing the production.
//
//   exp ::= if exp then exp else exp
//         | fun ( var : ty ) -> exp
//         | var
//         | con
//   ty  ::= bool | int
//
// As on page 46, this fragment deliberately omits operators and function types
// - it is the slice the lecture's parser actually covers, kept verbatim so the
// code panel and the live widget are the same parser.
//
// Two outputs, built together:
//   - the abstract syntax tree (`Exp`/`Ty`) the parser returns, and
//   - a *concrete* syntax tree (`Cst`) carrying reveal `order` stamps and a
//     human caption per node, so ParserView can animate the parse top-down
//     (choose a production, then descend into its parts) - the same shape as
//     the derivation sequence on page 39.

import { Bool, Int, type Con, type Exp, type Ty } from '../toycaml/ast';
import { tokenText, type Token } from './lex';

// ---- concrete syntax tree --------------------------------------------------

export type Cst = {
  id: number;
  /** Category name ("exp", "ty") or a terminal's surface text ("if", "x", "1"). */
  label: string;
  kind: 'cat' | 'term';
  /** Stepper index at which this node is revealed (parent < children). */
  order: number;
  /** Caption shown while this node is the active step. */
  desc: string;
  /** For terminals: index into the token list this leaf consumed. */
  tokenIndex?: number;
  children: Cst[];
};

export class ParseError extends Error {
  constructor(
    message: string,
    public readonly tokenIndex: number,
  ) {
    super(message);
    this.name = 'ParseError';
  }
}

export type ParseResult = { cst: Cst; exp: Exp; steps: number };

class Tracer {
  private i = 0;
  private step = 0;
  private nextId = 0;
  constructor(private readonly toks: Token[]) {}

  private peek(): Token | undefined {
    return this.toks[this.i];
  }

  private cat(label: string, desc: string): Cst {
    return { id: this.nextId++, label, kind: 'cat', order: ++this.step, desc, children: [] };
  }

  /** Consume one token, asserting its kind, producing a terminal leaf. */
  private term(kind: Token['t'], display?: string): Cst {
    const t = this.peek();
    if (!t || t.t !== kind) {
      const found = t ? `"${tokenText(t)}"` : 'end of input';
      throw new ParseError(`expected ${kind}, found ${found}`, this.i);
    }
    const idx = this.i++;
    return {
      id: this.nextId++,
      label: display ?? tokenText(t),
      kind: 'term',
      order: ++this.step,
      desc: `consume ${kind}`,
      tokenIndex: idx,
      children: [],
    };
  }

  expr(): { cst: Cst; exp: Exp } {
    const t = this.peek();
    if (!t) throw new ParseError('expected an expression, found end of input', this.i);

    switch (t.t) {
      case 'IF': {
        const node = this.cat('exp', 'rule  exp ::= if exp then exp else exp');
        node.children.push(this.term('IF'));
        const c = this.expr();
        node.children.push(c.cst);
        node.children.push(this.term('THEN'));
        const th = this.expr();
        node.children.push(th.cst);
        node.children.push(this.term('ELSE'));
        const el = this.expr();
        node.children.push(el.cst);
        return { cst: node, exp: { kind: 'If', cond: c.exp, then: th.exp, else: el.exp } };
      }
      case 'FUN': {
        const node = this.cat('exp', 'rule  exp ::= fun ( var : ty ) -> exp');
        node.children.push(this.term('FUN'));
        node.children.push(this.term('LP'));
        const v = this.term('VAR');
        const param = v.label;
        node.children.push(v);
        node.children.push(this.term('COL'));
        const ty = this.ty();
        node.children.push(ty.cst);
        node.children.push(this.term('RP'));
        node.children.push(this.term('ARR'));
        const body = this.expr();
        node.children.push(body.cst);
        return { cst: node, exp: { kind: 'Fun', param, paramTy: ty.ty, body: body.exp } };
      }
      case 'VAR': {
        const node = this.cat('exp', 'rule  exp ::= var');
        const leaf = this.term('VAR');
        node.children.push(leaf);
        return { cst: node, exp: { kind: 'Var', name: leaf.label } };
      }
      case 'CON': {
        const node = this.cat('exp', 'rule  exp ::= con');
        const con: Con = t.con;
        node.children.push(this.term('CON'));
        return { cst: node, exp: { kind: 'Con', con } };
      }
      default:
        throw new ParseError(`expected an expression, found "${tokenText(t)}"`, this.i);
    }
  }

  ty(): { cst: Cst; ty: Ty } {
    const t = this.peek();
    if (!t) throw new ParseError('expected a type, found end of input', this.i);
    if (t.t === 'BOOL') {
      const node = this.cat('ty', 'rule  ty ::= bool');
      node.children.push(this.term('BOOL'));
      return { cst: node, ty: Bool };
    }
    if (t.t === 'INT') {
      const node = this.cat('ty', 'rule  ty ::= int');
      node.children.push(this.term('INT'));
      return { cst: node, ty: Int };
    }
    throw new ParseError(`expected a type ("bool" or "int"), found "${tokenText(t)}"`, this.i);
  }

  finish(start: { cst: Cst; exp: Exp }): ParseResult {
    if (this.i < this.toks.length) {
      throw new ParseError(
        `unexpected "${tokenText(this.toks[this.i])}" after a complete expression`,
        this.i,
      );
    }
    return { cst: start.cst, exp: start.exp, steps: this.step };
  }
}

/** `parse toks` - recursive-descent parse, returning the CST, AST, and step count. */
export function parse(toks: Token[]): ParseResult {
  const tr = new Tracer(toks);
  const start = tr.expr();
  return tr.finish(start);
}

/** Count of terminal leaves revealed at `stepIdx` - i.e. tokens consumed so far. */
export function consumedCount(cst: Cst, stepIdx: number): number {
  let n = 0;
  const walk = (node: Cst) => {
    if (node.order > stepIdx) return;
    if (node.kind === 'term') n++;
    node.children.forEach(walk);
  };
  walk(cst);
  return n;
}

/** The node whose reveal order equals `stepIdx` (the one "happening now"). */
export function activeNode(cst: Cst, stepIdx: number): Cst | null {
  let hit: Cst | null = null;
  const walk = (node: Cst) => {
    if (node.order === stepIdx) hit = node;
    node.children.forEach(walk);
  };
  walk(cst);
  return hit;
}
