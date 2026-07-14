// Lexical analysis for full ToyCaml - a faithful TypeScript port of the
// lecture's OCaml lexer (Lecture 8, pages 33–37):
//
//   type token =
//     | LP | RP | COL | ARR | ADD | SUB | MUL | LEQ
//     | IF | THEN | ELSE | FUN | CON of con | VAR of string | BOOL | INT
//
//   let rec lex cs = match cs with
//     | [] -> []
//     | (' ' | '\t' | '\n') :: cr -> lex cr
//     | '(' :: cr -> LP :: lex cr
//     | ...
//     | '-' :: '>' :: cr -> ARR :: lex cr        (* before SUB: maximal munch *)
//     | '-' :: cr -> SUB :: lex cr
//     | '<' :: '=' :: cr -> LEQ :: lex cr
//     | ('0'..'9') :: _ -> lex_num 0 cs
//     | ('a'..'z'|'A'..'Z'|'_') :: _ -> lex_var [] cs
//     | _ -> failwith "lex"
//
// The point of this module (versus the parser's own inline lexer) is teaching:
// it carries a *step trace* so LexerView can animate the run character by
// character, and its token datatype matches the slides verbatim so the code
// panel and the live widget are the same thing.

import type { Con } from '../toycaml/ast';

export type Token =
  | { t: 'LP' }
  | { t: 'RP' }
  | { t: 'COL' }
  | { t: 'ARR' }
  | { t: 'ADD' }
  | { t: 'SUB' }
  | { t: 'MUL' }
  | { t: 'LEQ' }
  | { t: 'IF' }
  | { t: 'THEN' }
  | { t: 'ELSE' }
  | { t: 'FUN' }
  | { t: 'RFUN' } // slice 5 extension (recursive abstractions), not in the slides' lexer
  | { t: 'BOOL' }
  | { t: 'INT' }
  | { t: 'CON'; con: Con }
  | { t: 'VAR'; name: string };

// How the slides print a token list, e.g. [LP; INT; ARR; CON (ICon 3); VAR "x"].
export function showToken(tok: Token): string {
  switch (tok.t) {
    case 'CON':
      return tok.con.kind === 'BCon' ? `CON (BCon ${tok.con.value})` : `CON (ICon ${tok.con.value})`;
    case 'VAR':
      return `VAR "${tok.name}"`;
    default:
      return tok.t;
  }
}

// Surface form of a token - what it looks like in the source text (`(`, `->`,
// `if`, the identifier itself, the literal). Distinct from `showToken`, which
// prints the constructor (`LP`, `ARR`, `VAR "x"`). Used as concrete-syntax-tree
// leaf labels in the parser slice.
export function tokenText(tok: Token): string {
  switch (tok.t) {
    case 'LP':
      return '(';
    case 'RP':
      return ')';
    case 'COL':
      return ':';
    case 'ARR':
      return '->';
    case 'ADD':
      return '+';
    case 'SUB':
      return '-';
    case 'MUL':
      return '*';
    case 'LEQ':
      return '<=';
    case 'IF':
      return 'if';
    case 'THEN':
      return 'then';
    case 'ELSE':
      return 'else';
    case 'FUN':
      return 'fun';
    case 'RFUN':
      return 'rfun';
    case 'BOOL':
      return 'bool';
    case 'INT':
      return 'int';
    case 'CON':
      return String(tok.con.value);
    case 'VAR':
      return tok.name;
  }
}

// One unit of lexer progress: the half-open source span [start, end) that was
// consumed, and the token emitted (or `null` for skipped whitespace). Maximal
// munch shows up directly - a number or identifier is a single step whose span
// covers every character it greedily consumed.
export type LexStep = { start: number; end: number; token: Token | null };

export type LexResult = { tokens: Token[]; steps: LexStep[] };

export class LexError extends Error {
  constructor(
    message: string,
    public readonly pos: number,
  ) {
    super(message);
    this.name = 'LexError';
  }
}

const isDigit = (c: string) => c >= '0' && c <= '9';
const isLetter = (c: string) =>
  (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
// `is_letter` in the lecture also admits digits (for the tail of an identifier).
const isIdentChar = (c: string) => isLetter(c) || isDigit(c);

const KEYWORDS: Record<string, Token> = {
  bool: { t: 'BOOL' },
  int: { t: 'INT' },
  if: { t: 'IF' },
  then: { t: 'THEN' },
  else: { t: 'ELSE' },
  fun: { t: 'FUN' },
  rfun: { t: 'RFUN' },
  false: { t: 'CON', con: { kind: 'BCon', value: false } },
  true: { t: 'CON', con: { kind: 'BCon', value: true } },
};

/**
 * `lex src` - translate a source string into a token list, recording each step.
 * Throws `LexError` on a character that begins no token ("lexically inadmissible"
 * in the slides). Never partially returns: either the whole input lexes or it
 * throws.
 */
export function lex(src: string): LexResult {
  const steps: LexStep[] = [];
  const tokens: Token[] = [];
  const emit = (token: Token | null, start: number, end: number) => {
    steps.push({ start, end, token });
    if (token) tokens.push(token);
  };

  let i = 0;
  while (i < src.length) {
    const c = src[i];

    if (c === ' ' || c === '\t' || c === '\n') {
      emit(null, i, i + 1);
      i++;
      continue;
    }

    // Two-character tokens first - maximal munch means "->" must beat "-".
    if (c === '-' && src[i + 1] === '>') {
      emit({ t: 'ARR' }, i, i + 2);
      i += 2;
      continue;
    }
    if (c === '<' && src[i + 1] === '=') {
      emit({ t: 'LEQ' }, i, i + 2);
      i += 2;
      continue;
    }

    const single: Record<string, Token> = {
      '(': { t: 'LP' },
      ')': { t: 'RP' },
      ':': { t: 'COL' },
      '+': { t: 'ADD' },
      '-': { t: 'SUB' },
      '*': { t: 'MUL' },
    };
    if (c in single) {
      emit(single[c], i, i + 1);
      i++;
      continue;
    }

    // lex_num: greedily read the longest run of digits (maximal munch).
    if (isDigit(c)) {
      let j = i;
      let acc = 0;
      while (j < src.length && isDigit(src[j])) {
        acc = acc * 10 + (src.charCodeAt(j) - 48);
        j++;
      }
      emit({ t: 'CON', con: { kind: 'ICon', value: acc } }, i, j);
      i = j;
      continue;
    }

    // lex_var: greedily read the identifier, THEN classify - keywords are only
    // recognised once the whole word is read, so `internal` stays a VAR.
    if (isLetter(c)) {
      let j = i;
      while (j < src.length && isIdentChar(src[j])) j++;
      const word = src.slice(i, j);
      emit(KEYWORDS[word] ?? { t: 'VAR', name: word }, i, j);
      i = j;
      continue;
    }

    throw new LexError(`lexically inadmissible character "${c}"`, i);
  }

  return { tokens, steps };
}
