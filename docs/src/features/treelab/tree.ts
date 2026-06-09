// Rose tree types, mirroring the lecture's:
//   type tree = T of tree list
//   type 'a ltree = L of 'a * 'a ltree list
//
// Each node carries a stable integer `id` used as:
// - React keys in the SVG renderer
// - The identity tracked by stepper events (activeNodeId, activeEdge)
// - Cross-panel synchronisation (which node lights up in which panel)

let _nextId = 0;

/** Monotone counter — each tree node gets a unique int at creation. */
export function freshId(): number {
  return _nextId++;
}

/** Reset counter. Called before building presets so IDs start at 0. */
export function resetIds(): void {
  _nextId = 0;
}

// ---------- unlabeled rose trees ----------

export type Tree = {
  readonly id: number;
  readonly children: readonly Tree[];
};

/** Create an unlabeled tree node with a fresh ID. */
export function makeTree(children: Tree[] = []): Tree {
  return { id: freshId(), children };
}

/**
 * Add a new leaf child to the node with `targetId`.
 * Returns a new tree value (structurally persistent — unchanged nodes keep
 * the same identity, so React diffs stay minimal).
 */
export function addChild(t: Tree, targetId: number): Tree {
  if (t.id === targetId) {
    return { ...t, children: [...t.children, makeTree([])] };
  }
  const next = t.children.map((c) => addChild(c, targetId));
  const changed = next.some((c, i) => c !== t.children[i]);
  return changed ? { ...t, children: next } : t;
}

/**
 * Remove the leaf with `leafId` from wherever it appears.
 * No-op if not found or if the node has children (only leaves may be removed).
 */
export function removeLeaf(t: Tree, leafId: number): Tree {
  return {
    ...t,
    children: t.children
      .filter((c) => !(c.id === leafId && c.children.length === 0))
      .map((c) => removeLeaf(c, leafId)),
  };
}

// ---------- labeled rose trees ----------

export type LTree = {
  readonly id: number;
  readonly label: string;
  readonly children: readonly LTree[];
};

/** Create a labeled tree node with a fresh ID. */
export function makeLTree(label: string, children: LTree[] = []): LTree {
  return { id: freshId(), label, children };
}

export function addLChild(lt: LTree, targetId: number): LTree {
  if (lt.id === targetId) {
    return { ...lt, children: [...lt.children, makeLTree('?', [])] };
  }
  const next = lt.children.map((c) => addLChild(c, targetId));
  const changed = next.some((c, i) => c !== lt.children[i]);
  return changed ? { ...lt, children: next } : lt;
}

export function removeLLeaf(lt: LTree, leafId: number): LTree {
  return {
    ...lt,
    children: lt.children
      .filter((c) => !(c.id === leafId && c.children.length === 0))
      .map((c) => removeLLeaf(c, leafId)),
  };
}

export function updateLabel(lt: LTree, targetId: number, label: string): LTree {
  if (lt.id === targetId) return { ...lt, label };
  return { ...lt, children: lt.children.map((c) => updateLabel(c, targetId, label)) };
}

// ---------- pure properties ----------

export function arity(t: Tree): number {
  return t.children.length;
}

export function treeDepth(t: Tree): number {
  if (t.children.length === 0) return 0;
  return 1 + Math.max(...t.children.map(treeDepth));
}

export function ltreeDepth(lt: LTree): number {
  if (lt.children.length === 0) return 0;
  return 1 + Math.max(...lt.children.map(ltreeDepth));
}

/** Collect all nodes depth-first, pre-order (root first). */
export function allNodes(t: Tree): Tree[] {
  return [t, ...t.children.flatMap(allNodes)];
}

export function allLNodes(lt: LTree): LTree[] {
  return [lt, ...lt.children.flatMap(allLNodes)];
}

/** Extract LTree into a plain Tree + a label map, for sharing the SVG renderer. */
export function stripLabels(lt: LTree): { tree: Tree; labels: Map<number, string> } {
  const labels = new Map<number, string>();
  function convert(l: LTree): Tree {
    labels.set(l.id, l.label);
    return { id: l.id, children: l.children.map(convert) };
  }
  return { tree: convert(lt), labels };
}
