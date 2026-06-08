import { Fragment, type ReactNode } from 'react';

const KEYWORDS = new Set([
  'let',
  'rec',
  'in',
  'if',
  'then',
  'else',
  'match',
  'with',
  'fun',
  'function',
  'true',
  'false',
  'mod',
  'and',
  'or',
  'of',
  'begin',
  'end',
  'when',
  'as',
  'do',
  'done',
  'for',
  'to',
  'downto',
  'while',
  'try',
  'raise',
  'open',
  'module',
  'struct',
  'sig',
  'type',
  'val',
  'lor',
  'land',
  'lxor',
  'lsl',
  'lsr',
  'asr',
  'not',
]);

const TYPES = new Set([
  'int',
  'bool',
  'string',
  'float',
  'list',
  'option',
  'unit',
  'char',
  'array',
  'ref',
  'exn',
  'bytes',
]);

type Tok = { cls: string | null; text: string };

function tokenize(line: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < line.length) {
    const c = line[i];

    // (* comment *) (single-line; we treat spans within one line)
    if (c === '(' && line[i + 1] === '*') {
      const end = line.indexOf('*)', i + 2);
      const stop = end === -1 ? line.length : end + 2;
      out.push({ cls: 'cmt', text: line.slice(i, stop) });
      i = stop;
      continue;
    }

    // string literal
    if (c === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === '\\' && j + 1 < line.length) j++;
        j++;
      }
      const stop = Math.min(j + 1, line.length);
      out.push({ cls: 'str', text: line.slice(i, stop) });
      i = stop;
      continue;
    }

    // whitespace
    if (c === ' ' || c === '\t') {
      let j = i;
      while (j < line.length && (line[j] === ' ' || line[j] === '\t')) j++;
      out.push({ cls: null, text: line.slice(i, j) });
      i = j;
      continue;
    }

    // number
    if (c >= '0' && c <= '9') {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      out.push({ cls: 'num', text: line.slice(i, j) });
      i = j;
      continue;
    }

    // identifier
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_']/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (KEYWORDS.has(word)) out.push({ cls: 'kw', text: word });
      else if (TYPES.has(word)) out.push({ cls: 'ty', text: word });
      else out.push({ cls: null, text: word });
      i = j;
      continue;
    }

    // single char (operator/punctuation)
    out.push({ cls: null, text: c });
    i++;
  }

  // Post-pass: identifier following `let` (and optional `rec`) -> fn class
  for (let k = 0; k < out.length; k++) {
    if (out[k].cls === 'kw' && (out[k].text === 'let' || out[k].text === 'and')) {
      let m = k + 1;
      while (
        m < out.length &&
        (out[m].cls == null || (out[m].cls === 'kw' && out[m].text === 'rec')) &&
        out[m].text !== '='
      ) {
        if (out[m].cls == null && /^[A-Za-z_][A-Za-z0-9_']*$/.test(out[m].text)) {
          out[m] = { cls: 'fn', text: out[m].text };
          break;
        }
        m++;
      }
    }
  }

  return out;
}

export function highlightOcaml(line: string): ReactNode {
  const toks = tokenize(line);
  return toks.map((t, i) =>
    t.cls ? (
      <span key={i} className={t.cls}>
        {t.text}
      </span>
    ) : (
      <Fragment key={i}>{t.text}</Fragment>
    ),
  );
}
