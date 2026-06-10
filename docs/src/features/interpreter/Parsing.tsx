import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { highlightOcaml } from '../../lib/highlightOcaml';
import { showExpAst } from '../toycaml/ast';
import { lex } from './lex';
import { parse } from './parse';
import ParserView from './ParserView';
import './Interpreter.css';

// ---- static OCaml listings (Lecture 8, pages 42–45) ------------------------

const TY = `let ty = function
  | BOOL :: tr -> (Bool, tr)
  | INT  :: tr -> (Int,  tr)
  | ts -> failwith "ty"`;

const AUX = `let expect t = function
  | t' :: tr when t' = t -> tr
  | ts -> failwith "expect"

let var = function
  | VAR x :: ts -> (x, ts)
  | ts -> failwith "var"`;

const EXP_IF = `let rec exp = function
  | IF :: ts ->
      let e1, ts = exp ts in
      let ts = expect THEN ts in
      let e2, ts = exp ts in
      let ts = expect ELSE ts in
      let e3, ts = exp ts in
      (If (e1, e2, e3), ts)`;

const EXP_REST = `  | FUN :: ts ->
      let ts = expect LP ts in
      let x, ts = var ts in
      let ts = expect COL ts in
      let t, ts = ty ts in
      let ts = expect RP ts in
      let ts = expect ARR ts in
      let e, ts = exp ts in
      (Fun (x, t, e), ts)
  | VAR x :: ts -> (Var x, ts)
  | CON c :: ts -> (Con c, ts)
  | ts -> failwith "exp"`;

const TOP = `let parse ts =
  match exp ts with
  | e, [] -> e
  | _, ts -> failwith "parse"`;

// Page 39: the derivation that builds "fun (x:bool) -> if x then 1 else 0".
const DERIVATION = [
  'exp',
  'fun ( var : ty ) -> exp',
  'fun ( x : ty ) -> exp',
  'fun ( x : bool ) -> exp',
  'fun ( x : bool ) -> if exp then exp else exp',
  'fun ( x : bool ) -> if x then 1 else 0',
];

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

// ---- dev self-check: parser must match the slides (page 45) ----------------
if (import.meta.env.DEV) {
  const got = showExpAst(parse(lex('fun (x : bool) -> if x then 1 else 0').tokens).exp);
  const expected = 'Fun ("x", Bool, If (Var "x", Con (ICon 1), Con (ICon 0)))';
  if (got !== expected)
    console.error(`[Parsing self-check]\n  got:      ${got}\n  expected: ${expected}`);
}

export default function Parsing() {
  return (
    <div className="article">
      <PageMeta
        title="Parsing | oCamlCase"
        description="The second phase of a ToyCaml interpreter: a recursive-descent parser that turns a token sequence into an abstract syntax tree. Watch the concrete syntax tree grow as each grammar rule is chosen."
      />

      <div className="page-header">
        <div className="page-label">Building an Interpreter · 2. Parsing</div>
        <h1 className="page-title">Parsing: tokens to a tree</h1>
        <p className="page-intro">
          <Link to="/interpreter/lexing">Lexing</Link> gave us a flat list of tokens. Parsing asks
          the next question: does that list describe a program? The <strong>phrasal syntax</strong>{' '}
          says how the trees of the abstract syntax are written as token sequences; a{' '}
          <strong>parser</strong> reconstructs the tree from the tokens.
        </p>
      </div>

      <h2>The grammar</h2>
      <p>
        We use the lecture&rsquo;s simple fragment, covering conditionals, functions, variables, and
        constants (operators and function types are omitted here on purpose):
      </p>
      <CodeBlock
        fname="concrete grammar"
        code={`exp ::= if exp then exp else exp
      | fun ( var : ty ) -> exp
      | var
      | con
ty  ::= bool | int`}
      />

      <h2>Derivation</h2>
      <p>
        We derive a phrase by repeatedly replacing a non-terminal (left) with one of its
        alternatives (right), until only terminals remain:
      </p>
      <div className="deriv-seq">
        {DERIVATION.map((line, i) => (
          <div key={i} className="deriv-line">
            <span className="deriv-arrow">{i === 0 ? ' ' : '⇒'}</span>
            <code>{line}</code>
          </div>
        ))}
      </div>
      <p>
        That derivation induces the <strong>concrete syntax tree</strong>: inner nodes are syntactic
        categories, leaves are terminals (tokens).
      </p>

      <h2>Try it</h2>
      <p>
        Step through the parser below. Each step either <em>chooses a production</em> for an{' '}
        <code>exp</code> (a new inner node) or <em>consumes a token</em> (a leaf), so the tree grows
        top-down exactly like the derivation above. The token cursor advances in lockstep, and the
        abstract syntax tree the parser returns appears at the end.
      </p>
      <ParserView />

      <h2>Recursive-descent parsing</h2>
      <p>
        The approach declares <em>one function per syntactic category</em>; parsing follows the same
        recursive structure as the grammar, the first token chooses the rule, and each function
        returns the parsed tree together with the <em>remaining</em> tokens.
      </p>
      <CodeBlock fname="ty" code={TY} />
      <p>Two helpers: skip an expected token, and read a variable name.</p>
      <CodeBlock fname="expect / var" code={AUX} />
      <p>
        The conditional rule reads <code>if e1 then e2 else e3</code>, threading the token list
        through each sub-parse:
      </p>
      <CodeBlock fname="exp (conditionals)" code={EXP_IF} />
      <p>The remaining rules cover functions, variables, and constants:</p>
      <CodeBlock fname="exp (fun / var / con)" code={EXP_REST} />
      <p>
        The top-level <code>parse</code> runs <code>exp</code> and insists the whole token list was
        consumed:
      </p>
      <CodeBlock fname="parse" code={TOP} />

      <div className="lx-next">
        Next: <Link to="/concepts/static-semantics">Static Semantics →</Link>. The abstract syntax
        tree gets type-checked.
      </div>
    </div>
  );
}
