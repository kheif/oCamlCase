import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { highlightOcaml } from '../../lib/highlightOcaml';
import LexerView from './LexerView';
import { lex, showToken } from './lex';
import './Interpreter.css';

// ---- static OCaml listings (ported from Lecture 8, pages 30–37) -------------

const EXPLODE = `let explode s = String.fold_right (fun c cr -> c :: cr) s []
let implode cs = String.init (List.length cs) (List.nth cs)`;

const TOKEN_TYPE = `type con = BCon of bool | ICon of int
type token =
  | LP (* ( *) | RP (* ) *) | COL (* : *) | ARR (* -> *)
  | ADD (* + *) | SUB (* - *) | MUL (* * *) | LEQ (* <= *)
  | IF | THEN | ELSE | FUN
  | CON of con | VAR of string | BOOL | INT`;

const PATTERNS = `let is_digit = function '0' .. '9' -> true | _ -> false

let is_letter = function
  | '0' .. '9' | 'a' .. 'z' | 'A' .. 'Z' | '_' -> true
  | _ -> false`;

const LEX = `let rec lex cs = match cs with
  | [] -> []
  | (' ' | '\\t' | '\\n') :: cr -> lex cr
  | '(' :: cr -> LP :: lex cr
  | ')' :: cr -> RP :: lex cr
  | ':' :: cr -> COL :: lex cr
  | '-' :: '>' :: cr -> ARR :: lex cr
  | '+' :: cr -> ADD :: lex cr
  | '-' :: cr -> SUB :: lex cr
  | '*' :: cr -> MUL :: lex cr
  | '<' :: '=' :: cr -> LEQ :: lex cr
  | ('0' .. '9') :: _ -> lex_num 0 cs
  | ('a' .. 'z' | 'A' .. 'Z' | '_') :: _ -> lex_var [] cs
  | _ -> failwith "lex"`;

const LEX_VAR_NUM = `and lex_var acc = function
  | c :: cr when is_letter c -> lex_var (acc @ [c]) cr
  | cs -> (match implode acc with
      | "bool" -> BOOL :: lex cs | "int"  -> INT  :: lex cs
      | "if" -> IF :: lex cs | "then" -> THEN :: lex cs
      | "else" -> ELSE :: lex cs | "fun" -> FUN :: lex cs
      | "false" -> CON (BCon false) :: lex cs
      | "true"  -> CON (BCon true)  :: lex cs
      | v -> VAR v :: lex cs)

and lex_num acc = function
  | c :: cr when is_digit c -> lex_num (acc * 10 + Char.code c - Char.code '0') cr
  | cs -> CON (ICon acc) :: lex cs`;

function CodeBlock({ fname, code }: { fname: string; code: string }) {
  const lines = code.split('\n');
  return (
    <div className="code-block">
      <div className="code-top">
        <span className="code-fname">{fname}</span>
      </div>
      <pre>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {highlightOcaml(line)}
            {i < lines.length - 1 ? '\n' : ''}
          </Fragment>
        ))}
      </pre>
    </div>
  );
}

// ---- dev self-check: the widget engine must match the slides (page 29) ------
if (import.meta.env.DEV) {
  const cases: [string, string][] = [
    ['(int->bool)->int', '[LP; INT; ARR; BOOL; RP; ARR; INT]'],
    ['int bool->int', '[INT; BOOL; ARR; INT]'],
  ];
  for (const [input, expected] of cases) {
    const got = `[${lex(input).tokens.map(showToken).join('; ')}]`;
    if (got !== expected)
      console.error(`[Lexing self-check] "${input}"\n  got:      ${got}\n  expected: ${expected}`);
  }
}

export default function Lexing() {
  return (
    <div className="article">
      <PageMeta
        title="Lexing | oCamlCase"
        description="The first phase of a ToyCaml interpreter: a lexer that turns a character sequence into a token sequence. Watch lex consume input one token at a time, with maximal munch made visible."
      />

      <div className="page-header">
        <div className="page-label">Building an Interpreter · 1. Lexing</div>
        <h1 className="page-title">Lexing: characters to tokens</h1>
        <p className="page-intro">
          An interpreter reads a flat string of characters, but the rest of the pipeline wants
          structure. <strong>Lexing</strong> is the first abstraction step: it groups characters
          into <em>tokens</em> (the indivisible words of the language) and throws away whitespace.
          Everything downstream (parsing, typing, evaluation) works on tokens, never raw characters.
        </p>
      </div>

      <p>
        The lexer is a function from a character sequence to a token sequence. A well-defined lexical
        syntax yields <em>one</em> tokenization for every admissible input, though it is generally
        not injective, since whitespace is discarded and <code>int bool</code> and
        <code> int&nbsp;&nbsp;bool</code> tokenize identically.
      </p>

      <h2>Try it</h2>
      <p>
        Type any source below and step through <code>lex</code>. The character strip shows what has
        been consumed, what is being read right now, and what is still ahead; the token list grows in
        lockstep. Notice how a number or an identifier lights up as a single span, because the lexer
        reads
        the <em>longest</em> admissible sequence (&ldquo;maximal munch&rdquo;).
      </p>

      <LexerView />

      <h2>Strings as character lists</h2>
      <p>
        The lecture works on <code>char list</code>, so two helpers bridge to and from{' '}
        <code>string</code>. <code>explode</code> turns a string into its characters;{' '}
        <code>implode</code> rebuilds a string from them.
      </p>
      <CodeBlock fname="explode / implode" code={EXPLODE} />

      <h2>The token type</h2>
      <p>
        Each token is one variant. Punctuation and keywords carry no data; only <code>CON</code> (a
        constant) and <code>VAR</code> (an identifier) carry a payload.
      </p>
      <CodeBlock fname="token" code={TOKEN_TYPE} />

      <h2>Two OCaml features the lexer leans on</h2>
      <p>
        <strong>Range patterns</strong> (<code>'0' .. '9'</code>) and{' '}
        <strong>disjunctive patterns</strong> (<code>a | b | c</code>) make the character classes
        read almost like the grammar. See{' '}
        <Link to="/concepts/pattern-matching">Pattern Matching</Link> for the full story.
      </p>
      <CodeBlock fname="is_digit / is_letter" code={PATTERNS} />

      <h2>The lexer</h2>
      <p>
        <code>lex</code> dispatches on the first character. Order matters: <code>'-' :: '&gt;'</code>{' '}
        is tested before plain <code>'-'</code> so that <code>-&gt;</code> lexes as a single{' '}
        <code>ARR</code>, never as <code>SUB</code> followed by <code>&gt;</code>.
      </p>
      <CodeBlock fname="lex" code={LEX} />
      <p>
        Numbers and identifiers need their own helpers, mutually recursive with <code>lex</code> via{' '}
        <code>and</code>. Each greedily accumulates characters (maximal munch); a keyword like{' '}
        <code>if</code> is only recognized <em>after</em> the whole word is read, so an identifier
        like <code>internal</code> stays a <code>VAR</code>.
      </p>
      <CodeBlock fname="lex_var / lex_num" code={LEX_VAR_NUM} />

      <div className="lx-next">
        Next: <Link to="/concepts/static-semantics">Static Semantics →</Link> (parsing slice coming
        soon: tokens become an abstract syntax tree).
      </div>
    </div>
  );
}
