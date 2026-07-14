// Tree Lab - interactive rose-tree explorer for Lecture 7.
//
// Four stepper modes share one tree (or labeled tree for projections):
//   Tour         - animated standard tour, builds pre/post numbering live
//   Linearize    - same tour, output list grows in lockstep (pre or post)
//   Project      - labeled tour, builds prep / pop lists
//   Balance      - animated depthb fold, shows check/Unbalanced
//
// Architecture mirrors Toycaml.tsx: pure engine (.ts files) + React UI.
// Stepping uses the shared useStepper hook (src/hooks/useStepper.ts).

import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useStepper } from '../../hooks/useStepper';
import { highlightOcaml } from '../../lib/highlightOcaml';
import {
  addChild,
  addLChild,
  allNodes,
  removeLeaf,
  removeLLeaf,
  stripLabels,
  treeDepth,
  updateLabel,
  type LTree,
  type Tree,
} from './tree';
import {
  balActiveNodeId,
  balBadges,
  balCaption,
  balanceSteps,
  labeledTour,
  lActiveEdgePair,
  lActiveVisitNodeId,
  linCaption,
  postList,
  postNums,
  preList,
  preNums,
  projCaption,
  standardTour,
  tourCaption,
  activeEdgePair,
  activeEdgeDirection,
  activeVisitNodeId,
  popList,
  prepList,
} from './traverse';
import { PRESETS } from './presets';
import TreeView, { type NodeBadge } from './TreeView';
import './TreeLab.css';

// ---- static OCaml code listings --------------------------------------------

const CODE_PRE = `let rec pre (T ts) =
  List.length ts :: List.concat (List.map pre ts)`;

const CODE_POST = `let rec post (T ts) =
  List.concat (List.map post ts) @ [List.length ts]`;

const CODE_PREP = `type 'a ltree = L of 'a * 'a ltree list

let rec prep (L (x, ts)) =
  [x] @ List.concat (List.map prep ts)`;

const CODE_POP = `let rec pop (L (x, ts)) =
  List.concat (List.map pop ts) @ [x]`;

const CODE_BALANCE = `exception Unbalanced

let check n m = if n = m then n else raise Unbalanced

let rec depthb (T ts) = match ts with
  | [] -> 0
  | t :: tr ->
      1 + List.fold_left check (depthb t) (List.map depthb tr)

let balanced t =
  try (let _ = depthb t in true)
  with Unbalanced -> false`;

function CodeBlock({ code, fname }: { code: string; fname: string }) {
  const lines = code.split('\n');
  return (
    <div className="code-block tl-code-block">
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

// ---- dev self-check (mirrors Toycaml.tsx:284-311) --------------------------

if (import.meta.env.DEV) {
  for (const p of PRESETS) {
    // Compute pre / post from the engine and compare with lecture values.
    const tourEvts = standardTour(p.tree);
    const gotPre = preList(tourEvts, tourEvts.length);
    const gotPost = postList(tourEvts, tourEvts.length);

    const prettyPre = JSON.stringify(gotPre);
    const prettyPost = JSON.stringify(gotPost);
    const expPre = JSON.stringify(p.expectedPre);
    const expPost = JSON.stringify(p.expectedPost);

    if (prettyPre !== expPre)
      console.error(`[TreeLab self-check] preset "${p.id}" pre mismatch\n  got:      ${prettyPre}\n  expected: ${expPre}`);
    if (prettyPost !== expPost)
      console.error(`[TreeLab self-check] preset "${p.id}" post mismatch\n  got:      ${prettyPost}\n  expected: ${expPost}`);

    // Projection
    const lEvts = labeledTour(p.ltree);
    const gotPrep = prepList(lEvts, lEvts.length);
    const gotPop  = popList(lEvts, lEvts.length);
    if (JSON.stringify(gotPrep) !== JSON.stringify(p.expectedPrep))
      console.error(`[TreeLab self-check] preset "${p.id}" prep mismatch`, gotPrep, p.expectedPrep);
    if (JSON.stringify(gotPop) !== JSON.stringify(p.expectedPop))
      console.error(`[TreeLab self-check] preset "${p.id}" pop mismatch`, gotPop, p.expectedPop);
  }
}

// ---- types -----------------------------------------------------------------

type Mode = 'tour' | 'linearize' | 'project' | 'balance';
type LinSub = 'pre' | 'post';
type ProjSub = 'prep' | 'pop';

// ---- main component ---------------------------------------------------------

export default function TreeLab() {
  // ---- shared tree state ---------------------------------------------------
  const [presetIdx, setPresetIdx] = useState(0);
  const [tree, setTree] = useState<Tree>(PRESETS[0].tree);
  const [ltree, setLtree] = useState<LTree>(PRESETS[0].ltree);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingLabelId, setEditingLabelId] = useState<number | null>(null);
  const [editingLabelText, setEditingLabelText] = useState('');

  // ---- mode state ----------------------------------------------------------
  const [mode, setMode] = useState<Mode>('tour');
  const [linSub, setLinSub] = useState<LinSub>('pre');
  const [projSub, setProjSub] = useState<ProjSub>('prep');

  // ---- engine: compute events from current tree / ltree -------------------
  const tourEvents  = useMemo(() => standardTour(tree), [tree]);
  const lTourEvents = useMemo(() => labeledTour(ltree), [ltree]);
  const balEvents   = useMemo(() => balanceSteps(tree), [tree]);

  // Steps length per mode
  const tourLen  = tourEvents.length;
  const lTourLen = lTourEvents.length;
  const balLen   = balEvents.length;

  // ---- four steppers (independent per mode) --------------------------------
  const tourStepper  = useStepper(tourLen);
  const projStepper  = useStepper(lTourLen);
  const balStepper   = useStepper(balLen);

  // Linearize shares the same event array as tour but has its own stepper
  const linStepper = useStepper(tourLen);

  // Active stepper for current mode
  const stepper =
    mode === 'tour'      ? tourStepper
    : mode === 'linearize' ? linStepper
    : mode === 'project'   ? projStepper
    :                        balStepper;

  // ---- display state from steppers ----------------------------------------

  // Tour / Linearize (same event array)
  const tourStep = tourStepper.stepIdx;
  const linStep  = linStepper.stepIdx;

  const tourPreNums  = useMemo(() => preNums(tourEvents, tourStep), [tourEvents, tourStep]);
  const tourPostNums = useMemo(() => postNums(tourEvents, tourStep), [tourEvents, tourStep]);
  const tourActiveN  = useMemo(() => activeVisitNodeId(tourEvents, tourStep), [tourEvents, tourStep]);
  const tourActiveE  = useMemo(() => activeEdgePair(tourEvents, tourStep), [tourEvents, tourStep]);
  const tourActiveDir = useMemo(() => activeEdgeDirection(tourEvents, tourStep), [tourEvents, tourStep]);

  const linPreNums  = useMemo(() => preNums(tourEvents, linStep), [tourEvents, linStep]);
  const linPostNums = useMemo(() => postNums(tourEvents, linStep), [tourEvents, linStep]);
  const linActiveN  = useMemo(() => activeVisitNodeId(tourEvents, linStep), [tourEvents, linStep]);
  const linActiveE  = useMemo(() => activeEdgePair(tourEvents, linStep), [tourEvents, linStep]);
  const linActiveDir = useMemo(() => activeEdgeDirection(tourEvents, linStep), [tourEvents, linStep]);
  const linPreItems  = useMemo(() => preList(tourEvents, linStep), [tourEvents, linStep]);
  const linPostItems = useMemo(() => postList(tourEvents, linStep), [tourEvents, linStep]);

  // Projection
  const projStep  = projStepper.stepIdx;
  const projLtree = useMemo(() => stripLabels(ltree), [ltree]);
  const projActiveN = useMemo(() => lActiveVisitNodeId(lTourEvents, projStep), [lTourEvents, projStep]);
  const projActiveE = useMemo(() => lActiveEdgePair(lTourEvents, projStep), [lTourEvents, projStep]);
  const projPrepItems = useMemo(() => prepList(lTourEvents, projStep), [lTourEvents, projStep]);
  const projPopItems  = useMemo(() => popList(lTourEvents, projStep), [lTourEvents, projStep]);

  // Balance
  const balStep   = balStepper.stepIdx;
  const balActive = useMemo(() => balActiveNodeId(balEvents, balStep), [balEvents, balStep]);
  const balBadgeMap = useMemo(() => balBadges(balEvents, balStep), [balEvents, balStep]);

  // Build NodeBadge maps for TreeView
  const tourBadges = useMemo<Map<number, NodeBadge>>(() => {
    const m = new Map<number, NodeBadge>();
    for (const [id, n] of tourPreNums) m.set(id, { ...m.get(id), preNum: n });
    for (const [id, n] of tourPostNums) m.set(id, { ...m.get(id), postNum: n });
    return m;
  }, [tourPreNums, tourPostNums]);

  const linBadges = useMemo<Map<number, NodeBadge>>(() => {
    const m = new Map<number, NodeBadge>();
    for (const [id, n] of linPreNums) m.set(id, { ...m.get(id), preNum: n });
    for (const [id, n] of linPostNums) m.set(id, { ...m.get(id), postNum: n });
    return m;
  }, [linPreNums, linPostNums]);

  const balBadgesForView = useMemo<Map<number, NodeBadge>>(() => {
    const m = new Map<number, NodeBadge>();
    for (const [id, val] of balBadgeMap) {
      m.set(id, { depthVal: val.depth, failed: val.failed });
    }
    return m;
  }, [balBadgeMap]);

  // ---- caption for current mode + step -------------------------------------
  const caption = useMemo(() => {
    if (mode === 'tour')      return tourCaption(tourEvents, tourStep);
    if (mode === 'linearize') return linCaption(tourEvents, linStep, linSub);
    if (mode === 'project')   return projCaption(lTourEvents, projStep, projSub);
    return balCaption(balEvents, balStep);
  }, [mode, tourEvents, tourStep, linStep, linSub, lTourEvents, projStep, projSub, balEvents, balStep]);

  // ---- tree editing --------------------------------------------------------

  function applyPreset(idx: number) {
    const p = PRESETS[idx];
    setPresetIdx(idx);
    setTree(p.tree);
    setLtree(p.ltree);
    setSelectedId(null);
    setEditingLabelId(null);
  }

  function handleAddChild() {
    if (selectedId === null) return;
    if (mode === 'project') {
      setLtree((lt) => addLChild(lt, selectedId));
    } else {
      setTree((t) => addChild(t, selectedId));
    }
  }

  function handleRemoveLeaf() {
    if (selectedId === null) return;
    if (mode === 'project') {
      setLtree((lt) => removeLLeaf(lt, selectedId));
    } else {
      setTree((t) => removeLeaf(t, selectedId));
    }
    setSelectedId(null);
  }

  function handleNodeClick(id: number) {
    setSelectedId((prev) => (prev === id ? null : id));
    setEditingLabelId(null);
  }

  function handleLabelDblClick(id: number, currentLabel: string) {
    if (mode !== 'project') return;
    setEditingLabelId(id);
    setEditingLabelText(currentLabel);
  }

  function commitLabel() {
    if (editingLabelId === null) return;
    setLtree((lt) => updateLabel(lt, editingLabelId, editingLabelText || '?'));
    setEditingLabelId(null);
  }

  // Determine if selected node is a removable leaf
  const selectedIsLeaf = useMemo(() => {
    if (selectedId === null) return false;
    const active = mode === 'project' ? projLtree.tree : tree;
    return allNodes(active).find((n) => n.id === selectedId)?.children.length === 0;
  }, [selectedId, mode, projLtree.tree, tree]);

  const selectedIsRoot = useMemo(() => {
    if (selectedId === null) return false;
    return (mode === 'project' ? projLtree.tree : tree).id === selectedId;
  }, [selectedId, mode, projLtree.tree, tree]);

  const treeIsTooDeep = treeDepth(mode === 'project' ? projLtree.tree : tree) >= 4;

  // ---- render --------------------------------------------------------------

  // Current tree/ltree fed to TreeView, and which badges/active to show
  const currentTree   = mode === 'project' ? projLtree.tree : tree;
  const currentLabels = mode === 'project' ? projLtree.labels : undefined;
  const currentBadges =
    mode === 'tour'      ? tourBadges
    : mode === 'linearize' ? linBadges
    : mode === 'balance'   ? balBadgesForView
    : undefined;
  const currentActiveN =
    mode === 'tour'      ? tourActiveN
    : mode === 'linearize' ? linActiveN
    : mode === 'project'   ? projActiveN
    :                        balActive;
  const currentActiveE =
    mode === 'tour'      ? tourActiveE
    : mode === 'linearize' ? linActiveE
    : mode === 'project'   ? projActiveE
    : undefined;
  const currentActiveDir =
    mode === 'tour'      ? tourActiveDir
    : mode === 'linearize' ? linActiveDir
    : undefined;

  return (
    <div className="article">
      <PageMeta
        title="Tree Lab | oCamlCase"
        description="Interactive rose-tree explorer: animated standard tour, live pre/post linearizations and projections, and the depthb balance check, all computed on your own tree."
      />

      <div className="page-header">
        <div className="page-label">Concept · Trees Part 3</div>
        <h1 className="page-title">Tree Lab</h1>
        <p className="page-intro">
          Explore the standard tour, pre/post numbering, linearizations, projections, and
          balanced trees, computed live on any tree you choose. Every output list grows in
          lockstep with the tour cursor so you can see exactly <em>why</em> pre-order and
          post-order differ.
        </p>
      </div>

      {/* ---- Mode tabs --------------------------------------------------- */}
      <div className="tl-tabs" role="tablist">
        {(
          [
            { id: 'tour',      label: 'Standard Tour & Numbering' },
            { id: 'linearize', label: 'Linearizations' },
            { id: 'project',   label: 'Projections' },
            { id: 'balance',   label: 'Balancedness' },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={mode === id}
            className={`tl-tab ${mode === id ? 'is-active' : ''}`}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ---- Sub-mode selectors (Linearize / Project) -------------------- */}
      {mode === 'linearize' && (
        <div className="tl-submode">
          <button
            className={`tl-submode-btn ${linSub === 'pre' ? 'is-active' : ''}`}
            onClick={() => setLinSub('pre')}
          >
            pre = arity :: concat (map pre ts)
          </button>
          <button
            className={`tl-submode-btn ${linSub === 'post' ? 'is-active' : ''}`}
            onClick={() => setLinSub('post')}
          >
            post = concat (map post ts) @ [arity]
          </button>
        </div>
      )}
      {mode === 'project' && (
        <div className="tl-submode">
          <button
            className={`tl-submode-btn ${projSub === 'prep' ? 'is-active' : ''}`}
            onClick={() => setProjSub('prep')}
          >
            prep = [x] @ concat (map prep ts)
          </button>
          <button
            className={`tl-submode-btn ${projSub === 'pop' ? 'is-active' : ''}`}
            onClick={() => setProjSub('pop')}
          >
            pop = concat (map pop ts) @ [x]
          </button>
        </div>
      )}

      {/* ---- Main area: tree + controls ---------------------------------- */}
      <div className="tl-main">

        {/* ---- Left column: tree editor + SVG + output list -------------- */}
        <div className="tl-left">

          {/* Preset selector + tree editor toolbar */}
          <div className="tl-toolbar">
            <label className="tl-toolbar-label" htmlFor="tl-preset">Preset</label>
            <select
              id="tl-preset"
              value={presetIdx}
              onChange={(e) => applyPreset(Number(e.target.value))}
            >
              {PRESETS.map((p, i) => (
                <option key={p.id} value={i}>{p.label}</option>
              ))}
            </select>

            <div className="tl-toolbar-sep" />

            <button
              className="tl-toolbar-btn"
              disabled={selectedId === null || treeIsTooDeep}
              onClick={handleAddChild}
              title={treeIsTooDeep ? 'Tree too deep (max depth 4)' : 'Add a leaf child to the selected node'}
            >
              + Add child
            </button>
            <button
              className="tl-toolbar-btn tl-toolbar-btn-remove"
              disabled={selectedId === null || !selectedIsLeaf || selectedIsRoot}
              onClick={handleRemoveLeaf}
              title="Remove the selected leaf node"
            >
              × Remove leaf
            </button>

            {selectedId !== null && (
              <span className="tl-selected-hint">
                {selectedIsRoot
                  ? 'Root selected'
                  : selectedIsLeaf
                    ? 'Leaf selected'
                    : 'Internal node selected'}
              </span>
            )}
          </div>

          {/* SVG tree view */}
          <div className="tl-svg-wrap">
            <TreeView
              tree={currentTree}
              badges={currentBadges}
              activeNodeId={currentActiveN}
              activeEdge={currentActiveE ?? undefined}
              activeEdgeDir={currentActiveDir ?? undefined}
              selectedNodeId={selectedId}
              labels={currentLabels}
              showArity={mode !== 'project'}
              onNodeClick={handleNodeClick}
            />
          </div>

          {/* Projection mode: label editor hint */}
          {mode === 'project' && selectedId !== null && (
            <div className="tl-label-editor">
              {editingLabelId === selectedId ? (
                <>
                  <input
                    className="tl-label-input"
                    value={editingLabelText}
                    onChange={(e) => setEditingLabelText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') commitLabel(); if (e.key === 'Escape') setEditingLabelId(null); }}
                    maxLength={4}
                    autoFocus
                  />
                  <button className="tl-toolbar-btn" onClick={commitLabel}>Set label</button>
                  <button className="tl-toolbar-btn" onClick={() => setEditingLabelId(null)}>Cancel</button>
                </>
              ) : (
                <button
                  className="tl-toolbar-btn"
                  onClick={() => {
                    const lbl = projLtree.labels.get(selectedId) ?? '?';
                    handleLabelDblClick(selectedId, lbl);
                  }}
                >
                  Edit label "{projLtree.labels.get(selectedId) ?? '?'}"
                </button>
              )}
            </div>
          )}

          {/* Output list panel (Linearize + Project modes) */}
          {(mode === 'linearize' || mode === 'project') && (
            <div className="tl-output-panel">
              {mode === 'linearize' && (
                <>
                  <div className="tl-output-row">
                    <span className="tl-output-fn">pre t</span>
                    <span className="tl-output-eq">=</span>
                    <OutputList
                      items={linPreItems.map(String)}
                      total={preList(tourEvents, tourEvents.length).map(String)}
                      active={linSub === 'pre' && linStep > 0 && tourEvents[linStep - 1]?.kind === 'firstVisit'}
                      dimmed={linSub !== 'pre'}
                    />
                  </div>
                  <div className="tl-output-row">
                    <span className="tl-output-fn">post t</span>
                    <span className="tl-output-eq">=</span>
                    <OutputList
                      items={linPostItems.map(String)}
                      total={postList(tourEvents, tourEvents.length).map(String)}
                      active={linSub === 'post' && linStep > 0 && tourEvents[linStep - 1]?.kind === 'lastVisit'}
                      dimmed={linSub !== 'post'}
                    />
                  </div>
                </>
              )}
              {mode === 'project' && (
                <>
                  <div className="tl-output-row">
                    <span className="tl-output-fn">prep t</span>
                    <span className="tl-output-eq">=</span>
                    <OutputList
                      items={projPrepItems}
                      total={prepList(lTourEvents, lTourEvents.length)}
                      active={projSub === 'prep' && projStep > 0 && lTourEvents[projStep - 1]?.kind === 'firstVisit'}
                      dimmed={projSub !== 'prep'}
                    />
                  </div>
                  <div className="tl-output-row">
                    <span className="tl-output-fn">pop t</span>
                    <span className="tl-output-eq">=</span>
                    <OutputList
                      items={projPopItems}
                      total={popList(lTourEvents, lTourEvents.length)}
                      active={projSub === 'pop' && projStep > 0 && lTourEvents[projStep - 1]?.kind === 'lastVisit'}
                      dimmed={projSub !== 'pop'}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Balance result banner */}
          {mode === 'balance' && balStep >= balEvents.length && balEvents.length > 0 && (
            <div className={`tl-balance-result ${balEvents[balEvents.length - 1].kind === 'fail' ? 'is-fail' : 'is-ok'}`}>
              {balEvents[balEvents.length - 1].kind === 'fail'
                ? '⚠ balanced t = false: Unbalanced was raised'
                : `✓ balanced t = true: depthb returned ${(balEvents[balEvents.length - 1] as { depth: number }).depth}`}
            </div>
          )}
        </div>

        {/* ---- Right column: code + stepper + caption ------------------- */}
        <div className="tl-right">

          {/* Reference code block */}
          <CodeBlock
            fname={
              mode === 'tour'      ? 'tour.ml'
              : mode === 'linearize' ? (linSub === 'pre' ? 'pre.ml' : 'post.ml')
              : mode === 'project'   ? (projSub === 'prep' ? 'prep.ml' : 'pop.ml')
              : 'balanced.ml'
            }
            code={
              mode === 'tour'      ? `${CODE_PRE}\n\n${CODE_POST}`
              : mode === 'linearize' ? (linSub === 'pre' ? CODE_PRE : CODE_POST)
              : mode === 'project'   ? (projSub === 'prep' ? CODE_PREP : CODE_POP)
              : CODE_BALANCE
            }
          />

          {/* Legend (tour and linearize modes) */}
          {(mode === 'tour' || mode === 'linearize') && (
            <div className="tl-legend">
              <span className="tl-legend-item tl-legend-pre">
                <span className="tl-badge-dot" style={{ background: 'var(--pre-badge, #4a90d9)' }} />
                pre# (first visit)
              </span>
              <span className="tl-legend-item tl-legend-post">
                <span className="tl-badge-dot" style={{ background: 'var(--post-badge, #e8a317)' }} />
                post# (last visit)
              </span>
            </div>
          )}

          {/* Stepper controls */}
          <div className="tl-stepper">
            <button className="tl-step-btn" onClick={stepper.replay} title="Replay from start">
              ⟨⟨ Replay
            </button>
            <button className="tl-step-btn" onClick={stepper.prev} disabled={stepper.stepIdx === 0}>
              ⟨ Prev
            </button>
            <button
              className={`tl-step-btn tl-play-btn ${stepper.playing ? 'is-playing' : ''}`}
              onClick={stepper.togglePlay}
            >
              {stepper.playing ? '⏸ Pause' : stepper.atEnd ? '▶ Replay' : '▶ Play'}
            </button>
            <button className="tl-step-btn" onClick={stepper.next} disabled={stepper.atEnd}>
              Next ⟩
            </button>
            <button className="tl-step-btn" onClick={stepper.showAll} disabled={stepper.atEnd}>
              Show all
            </button>
          </div>

          <div className="tl-progress">
            Step {stepper.stepIdx} / {
              mode === 'tour'      ? tourLen
              : mode === 'linearize' ? tourLen
              : mode === 'project'   ? lTourLen
              : balLen
            }
          </div>

          {/* Caption */}
          <div className="tl-caption" aria-live="polite">
            {caption}
          </div>

          {/* Concept note per mode */}
          <div className="tl-concept-note">
            {mode === 'tour' && (
              <>
                <strong>Standard tour</strong> (Lecture 7, p.3): starts and ends at the root; each edge
                traversed exactly twice: first ↓ from above, then ↑ from below; successor trees
                visited left to right. The <em>pre-numbering</em> assigns numbers at first visit;{' '}
                the <em>post-numbering</em> assigns them at last visit.
              </>
            )}
            {mode === 'linearize' && (
              <>
                <strong>Linearization</strong> (Lecture 7, p.5-6): <code>pre</code> emits each node's
                arity <em>before</em> its children; <code>post</code> emits it <em>after</em>. The
                output list grows exactly when a visit event fires; watch the list and the tour cursor
                stay in lockstep.
              </>
            )}
            {mode === 'project' && (
              <>
                <strong>Projections</strong> (Lecture 7, p.8): <code>'a ltree</code> attaches a label
                to every node. <code>prep</code>/<code>pop</code> use the same traversal order as{' '}
                <code>pre</code>/<code>post</code>; only what is collected (a label vs. an arity)
                changes. Double-click a selected node to edit its label.
              </>
            )}
            {mode === 'balance' && (
              <>
                <strong>Balancedness</strong> (Lecture 7, p.9-10): a tree is balanced when all leaves
                have the same address length. <code>depthb</code> uses <code>check</code> inside a{' '}
                <code>fold_left</code>; the first mismatch raises <code>Unbalanced</code> and
                short-circuits the entire fold. Green badges = computed depth; red badge = exception.
              </>
            )}
          </div>

          {/* Link back to the static trees page */}
          <p className="tl-back-link">
            ← <Link to="/concepts/trees">Back to Trees (core concepts)</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- OutputList: the growing list below the tree ----------------------------

function OutputList({
  items,
  total,
  active,
  dimmed,
}: {
  items: string[];
  total: string[];
  active: boolean;
  dimmed: boolean;
}) {
  const pending = total.slice(items.length);
  return (
    <span className={`tl-list ${dimmed ? 'is-dimmed' : ''}`}>
      [
      {items.map((item, i) => (
        <span key={`${items.length}-${i}`} className={`tl-list-item ${active && i === items.length - 1 ? 'is-new' : ''}`}>
          {i > 0 && <span className="tl-list-sep">; </span>}
          {item}
        </span>
      ))}
      {pending.length > 0 && (
        <span className="tl-list-pending">
          {items.length > 0 && <span className="tl-list-sep">; </span>}
          {pending.map((item, i) => (
            <Fragment key={`p-${i}`}>
              {i > 0 && <span className="tl-list-sep">; </span>}
              <span className="tl-list-ghost">{item}</span>
            </Fragment>
          ))}
        </span>
      )}
      ]
    </span>
  );
}
