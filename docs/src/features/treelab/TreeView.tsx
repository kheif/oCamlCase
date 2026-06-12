// SVG rose-tree renderer used by all four Tree Lab modes.
//
// Layout: a simple bottom-up algorithm assigns each subtree a "width" in leaf
// units (leaves = 1, inner = sum of children). Horizontal positions are the
// centres of those slots; vertical positions are levels (depth × LEVEL_H).
//
// Styling mirrors the site's design tokens (--accent, --bg-warm, --border …)
// via `currentColor` and inline `fill/stroke` that reference CSS variables -
// the SVG inherits the page's light/dark theme without extra class toggling.

import type { Tree } from './tree';

// ---- layout constants -------------------------------------------------------

const NODE_R = 18;    // circle radius
const LEVEL_H = 70;   // vertical spacing per depth level
const UNIT_W = 56;    // horizontal unit width (one leaf slot)
const PAD = 28;       // padding around the SVG

// ---- layout computation -----------------------------------------------------

type LayoutEntry = { id: number; x: number; y: number };

/** Compute (x, y) for every node.  Returns layout + total slot-width of `t`. */
function layout(
  t: Tree,
  depth: number,
  slotOffset: number,
): { entries: LayoutEntry[]; width: number } {
  if (t.children.length === 0) {
    return {
      entries: [{ id: t.id, x: (slotOffset + 0.5) * UNIT_W, y: depth * LEVEL_H }],
      width: 1,
    };
  }

  let cx = slotOffset;
  const all: LayoutEntry[] = [];
  let totalW = 0;

  for (const child of t.children) {
    const r = layout(child, depth + 1, cx);
    all.push(...r.entries);
    cx += r.width;
    totalW += r.width;
  }

  totalW = Math.max(totalW, 1);
  all.push({ id: t.id, x: (slotOffset + totalW / 2) * UNIT_W, y: depth * LEVEL_H });
  return { entries: all, width: totalW };
}

// ---- component props --------------------------------------------------------

export type NodeBadge = {
  preNum?: number;
  postNum?: number;
  depthVal?: number;
  failed?: boolean;
};

type Props = {
  tree: Tree;
  /** Optional node decorations (badges). Key = nodeId. */
  badges?: ReadonlyMap<number, NodeBadge>;
  /** Node ID currently highlighted as "active" (tour cursor on a visit event). */
  activeNodeId?: number | null;
  /** Edge currently highlighted [parentId, childId]. */
  activeEdge?: readonly [number, number] | null;
  /** Direction of the active edge traversal (affects arrowhead). */
  activeEdgeDir?: 'down' | 'up' | null;
  /** Node ID the user has selected for editing (dashed ring). */
  selectedNodeId?: number | null;
  /** Labels to display inside nodes (for projection mode). */
  labels?: ReadonlyMap<number, string>;
  /** If true, show arity as a small secondary label inside the node. */
  showArity?: boolean;
  /** Called when the user clicks a node. */
  onNodeClick?: (id: number) => void;
};

// ---- main component ---------------------------------------------------------

export default function TreeView({
  tree,
  badges,
  activeNodeId,
  activeEdge,
  activeEdgeDir,
  selectedNodeId,
  labels,
  showArity,
  onNodeClick,
}: Props) {
  const { entries, width } = layout(tree, 0, 0);
  const pos = new Map(entries.map((e) => [e.id, e]));

  const svgW = width * UNIT_W + PAD * 2;
  const maxDepth = Math.max(...entries.map((e) => e.y)) / LEVEL_H;
  const svgH = maxDepth * LEVEL_H + NODE_R * 2 + PAD * 2;

  // Collect all parent→child pairs for drawing edges
  const edges: Array<{ parentId: number; childId: number }> = [];
  function collectEdges(t: Tree) {
    for (const c of t.children) {
      edges.push({ parentId: t.id, childId: c.id });
      collectEdges(c);
    }
  }
  collectEdges(tree);

  function isActiveEdge(parentId: number, childId: number): boolean {
    if (!activeEdge) return false;
    return activeEdge[0] === parentId && activeEdge[1] === childId;
  }

  return (
    <svg
      className="tl-svg"
      viewBox={`0 0 ${svgW} ${svgH}`}
      width={svgW}
      height={svgH}
      role="img"
      aria-label="Rose tree diagram"
    >
      <g transform={`translate(${PAD}, ${PAD + NODE_R})`}>
        {/* ---- edges ---- */}
        {edges.map(({ parentId, childId }) => {
          const p = pos.get(parentId);
          const c = pos.get(childId);
          if (!p || !c) return null;
          const active = isActiveEdge(parentId, childId);
          const dir = active ? activeEdgeDir : null;

          // Midpoint for directional arrow (only when active)
          const mx = (p.x + c.x) / 2;
          const my = (p.y + c.y) / 2;

          return (
            <g key={`e-${parentId}-${childId}`}>
              <line
                x1={p.x}
                y1={p.y}
                x2={c.x}
                y2={c.y}
                strokeWidth={active ? 2.5 : 1.5}
                stroke={active ? 'var(--accent)' : 'var(--border-dk, var(--border))'}
                strokeLinecap="round"
              />
              {/* Direction indicator dot when edge is active */}
              {active && dir && (
                <circle
                  cx={dir === 'down' ? mx + (c.x - p.x) * 0.15 : mx - (c.x - p.x) * 0.15}
                  cy={dir === 'down' ? my + (c.y - p.y) * 0.15 : my - (c.y - p.y) * 0.15}
                  r={4}
                  fill="var(--accent)"
                />
              )}
            </g>
          );
        })}

        {/* ---- nodes ---- */}
        {entries.map((entry) => {
          const badge = badges?.get(entry.id);
          const label = labels?.get(entry.id);
          const isActive = activeNodeId === entry.id;
          const isSelected = selectedNodeId === entry.id;
          const node = findNode(tree, entry.id);
          const nodeArity = node?.children.length ?? 0;

          const fill = isActive
            ? 'var(--accent-bg)'
            : badge?.failed
              ? 'var(--error-bg, #ffe9e9)'
              : 'var(--bg-warm)';
          const stroke = isActive
            ? 'var(--accent)'
            : badge?.failed
              ? 'var(--error, #c0392b)'
              : 'var(--border)';
          const strokeW = isActive || badge?.failed ? 2 : 1.5;

          return (
            <g
              key={`n-${entry.id}`}
              style={{ cursor: onNodeClick ? 'pointer' : 'default' }}
              onClick={() => onNodeClick?.(entry.id)}
            >
              {/* Selection ring */}
              {isSelected && (
                <circle
                  cx={entry.x}
                  cy={entry.y}
                  r={NODE_R + 5}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  opacity={0.7}
                />
              )}

              {/* Main circle */}
              <circle
                cx={entry.x}
                cy={entry.y}
                r={NODE_R}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeW}
              />

              {/* Primary label (node label in projection mode, or 'T' otherwise) */}
              <text
                x={entry.x}
                y={entry.y + (showArity && label ? -3 : 4.5)}
                textAnchor="middle"
                fontSize={label && label.length > 1 ? 11 : 13}
                fontFamily="var(--mono)"
                fill={isActive ? 'var(--accent)' : badge?.failed ? 'var(--error, #c0392b)' : 'var(--text)'}
                fontWeight={isActive ? '600' : '400'}
              >
                {label ?? 'T'}
              </text>

              {/* Secondary: arity below the main label */}
              {showArity && (
                <text
                  x={entry.x}
                  y={entry.y + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily="var(--mono)"
                  fill="var(--dim)"
                >
                  {nodeArity}
                </text>
              )}

              {/* Pre-number badge (top-left) */}
              {badge?.preNum !== undefined && (
                <g>
                  <circle cx={entry.x - 14} cy={entry.y - 14} r={9} fill="var(--pre-badge, #4a90d9)" />
                  <text
                    x={entry.x - 14}
                    y={entry.y - 10}
                    textAnchor="middle"
                    fontSize={9}
                    fontFamily="var(--mono)"
                    fill="#fff"
                    fontWeight="600"
                  >
                    {badge.preNum}
                  </text>
                </g>
              )}

              {/* Post-number badge (bottom-right) */}
              {badge?.postNum !== undefined && (
                <g>
                  <circle cx={entry.x + 14} cy={entry.y + 14} r={9} fill="var(--post-badge, #e8a317)" />
                  <text
                    x={entry.x + 14}
                    y={entry.y + 18}
                    textAnchor="middle"
                    fontSize={9}
                    fontFamily="var(--mono)"
                    fill="#fff"
                    fontWeight="600"
                  >
                    {badge.postNum}
                  </text>
                </g>
              )}

              {/* Depth badge (top-right, for balance mode) */}
              {badge?.depthVal !== undefined && (
                <g>
                  <circle cx={entry.x + 14} cy={entry.y - 14} r={9} fill="var(--depth-badge, #2ecc71)" />
                  <text
                    x={entry.x + 14}
                    y={entry.y - 10}
                    textAnchor="middle"
                    fontSize={9}
                    fontFamily="var(--mono)"
                    fill="#fff"
                    fontWeight="600"
                  >
                    {badge.depthVal}
                  </text>
                </g>
              )}

              {/* Fail badge (bottom-right, for balance mode) */}
              {badge?.failed && (
                <g>
                  <circle cx={entry.x + 14} cy={entry.y + 14} r={9} fill="var(--error, #c0392b)" />
                  <text
                    x={entry.x + 14}
                    y={entry.y + 18}
                    textAnchor="middle"
                    fontSize={10}
                    fontFamily="var(--mono)"
                    fill="#fff"
                    fontWeight="700"
                  >
                    !
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Linear search for a node by ID (trees are small so this is fine). */
function findNode(t: Tree, id: number): Tree | null {
  if (t.id === id) return t;
  for (const c of t.children) {
    const found = findNode(c, id);
    if (found) return found;
  }
  return null;
}
