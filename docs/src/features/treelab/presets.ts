// Preset trees for the Tree Lab, derived directly from Lecture 7.
//
// Each preset defines an unlabeled `tree` (for Tour, Linearization, Balance modes)
// and a labeled `ltree` (for Projection mode) with the same structure.
//
// Expected outputs serve two purposes:
// 1. Dev-only self-check (asserted in TreeLab.tsx, cf. Toycaml.tsx:284-311).
// 2. Documentation of the exact values the lecture prints on slides 5-10.

import { makeLTree, makeTree, resetIds, type LTree, type Tree } from './tree';

export type Preset = {
  id: string;
  label: string;
  tree: Tree;
  ltree: LTree;
  /** pre(tree) — expected output from Lecture 7 slides. */
  expectedPre: number[];
  /** post(tree). */
  expectedPost: number[];
  /** prep(ltree). */
  expectedPrep: string[];
  /** pop(ltree). */
  expectedPop: string[];
};

// Reset the ID counter once before building all presets so IDs are small and
// deterministic across hot-reloads (development convenience only — the
// engine never depends on specific ID values).
resetIds();

// ---- Preset 1: Simple (5 nodes) ----------------------------------------
// T[T[]; T[T[]; T[]]]
// Matches the tree used in the existing CSS linearization demos on trees.html
// (nodes A/B/C/D/E).  pre = [2; 0; 2; 0; 0]  post = [0; 0; 0; 2; 2]

const _leaf_s1 = makeTree([]);    // id=0  (left leaf, "B")
const _leaf_s2 = makeTree([]);    // id=1  ("D")
const _leaf_s3 = makeTree([]);    // id=2  ("E")
const _inner_s = makeTree([_leaf_s2, _leaf_s3]);  // id=3 ("C")
const _root_s  = makeTree([_leaf_s1, _inner_s]);  // id=4 ("A")

const _lB = makeLTree('B', []);
const _lD = makeLTree('D', []);
const _lE = makeLTree('E', []);
const _lC = makeLTree('C', [_lD, _lE]);
const _lA = makeLTree('A', [_lB, _lC]);

const SIMPLE: Preset = {
  id: 'simple',
  label: 'Simple  T[T[]; T[T[];T[]]]',
  tree: _root_s,
  ltree: _lA,
  expectedPre:  [2, 0, 2, 0, 0],
  expectedPost: [0, 0, 0, 2, 2],
  expectedPrep: ['A', 'B', 'C', 'D', 'E'],
  expectedPop:  ['B', 'D', 'E', 'C', 'A'],
};

// ---- Preset 2: Lecture (11 nodes, slide 5) ------------------------------
// T[ T[T[T[];T[];T[]]]; T[]; T[T[];T[];T[]] ]
// pre = [3; 1; 3; 0; 0; 0; 0; 3; 0; 0; 0]

const _l0 = makeTree([]); const _l1 = makeTree([]); const _l2 = makeTree([]);
const _c00 = makeTree([_l0, _l1, _l2]);
const _c0  = makeTree([_c00]);
const _c1  = makeTree([]);
const _l3 = makeTree([]); const _l4 = makeTree([]); const _l5 = makeTree([]);
const _c2  = makeTree([_l3, _l4, _l5]);
const _root_lec = makeTree([_c0, _c1, _c2]);

// Labeled version: labels are arity strings for legibility
const _lL0 = makeLTree('○', []); const _lL1 = makeLTree('○', []); const _lL2 = makeLTree('○', []);
const _lC00 = makeLTree('T₃', [_lL0, _lL1, _lL2]);
const _lC0  = makeLTree('T₁', [_lC00]);
const _lC1  = makeLTree('○', []);
const _lL3 = makeLTree('○', []); const _lL4 = makeLTree('○', []); const _lL5 = makeLTree('○', []);
const _lC2  = makeLTree('T₃', [_lL3, _lL4, _lL5]);
const _lRoot_lec = makeLTree('T₃', [_lC0, _lC1, _lC2]);

const LECTURE: Preset = {
  id: 'lecture',
  label: 'Lecture slide 5  (11 nodes)',
  tree: _root_lec,
  ltree: _lRoot_lec,
  expectedPre:  [3, 1, 3, 0, 0, 0, 0, 3, 0, 0, 0],
  expectedPost: [0, 0, 0, 3, 1, 0, 0, 0, 0, 3, 3],
  expectedPrep: ['T₃','T₁','T₃','○','○','○','○','T₃','○','○','○'],
  expectedPop:  ['○','○','○','T₃','T₁','○','○','○','○','T₃','T₃'],
};

// ---- Preset 3: Balanced (slide 9 left example) --------------------------
// T[T[T[];T[]]; T[T[];T[]]]

const _bll = makeTree([]); const _blr = makeTree([]);
const _brl = makeTree([]); const _brr = makeTree([]);
const _bl = makeTree([_bll, _blr]);
const _br = makeTree([_brl, _brr]);
const _broot = makeTree([_bl, _br]);

const _lbll = makeLTree('d',[]); const _lblr = makeLTree('e',[]);
const _lbrl = makeLTree('f',[]); const _lbrr = makeLTree('g',[]);
const _lbl = makeLTree('b',[_lbll,_lblr]);
const _lbr = makeLTree('c',[_lbrl,_lbrr]);
const _lbroot = makeLTree('a',[_lbl,_lbr]);

const BALANCED: Preset = {
  id: 'balanced',
  label: 'Balanced  T[T[T[];T[]]; T[T[];T[]]]',
  tree: _broot,
  ltree: _lbroot,
  expectedPre:  [2, 2, 0, 0, 2, 0, 0],
  expectedPost: [0, 0, 2, 0, 0, 2, 2],
  expectedPrep: ['a','b','d','e','c','f','g'],
  expectedPop:  ['d','e','b','f','g','c','a'],
};

// ---- Preset 4: Unbalanced (slide 9 right example) -----------------------
// T[T[T[];T[]]; T[]]

const _ull = makeTree([]); const _ulr = makeTree([]);
const _ul  = makeTree([_ull, _ulr]);
const _ur  = makeTree([]);
const _uroot = makeTree([_ul, _ur]);

const _lull = makeLTree('c',[]); const _lulr = makeLTree('d',[]);
const _lul  = makeLTree('b',[_lull,_lulr]);
const _lur  = makeLTree('e',[]);
const _luroot = makeLTree('a',[_lul,_lur]);

const UNBALANCED: Preset = {
  id: 'unbalanced',
  label: 'Unbalanced  T[T[T[];T[]]; T[]]',
  tree: _uroot,
  ltree: _luroot,
  expectedPre:  [2, 2, 0, 0, 0],
  expectedPost: [0, 0, 2, 0, 2],
  expectedPrep: ['a','b','c','d','e'],
  expectedPop:  ['c','d','b','e','a'],
};

export const PRESETS: Preset[] = [SIMPLE, LECTURE, BALANCED, UNBALANCED];
