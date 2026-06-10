import type { NavGroup, TopbarLink } from '../types';
import { contentRoutes } from './registry';

const HIDDEN_SIDEBAR_GROUPS = new Set(['Start here', 'Exercises']);

export const navGroups: NavGroup[] = (() => {
  const groups: NavGroup[] = [];
  const byLabel = new Map<string, NavGroup>();

  for (const route of contentRoutes) {
    if (!route.nav) continue;
    if (HIDDEN_SIDEBAR_GROUPS.has(route.nav.group)) continue;
    let group = byLabel.get(route.nav.group);
    if (!group) {
      group = { label: route.nav.group, links: [] };
      byLabel.set(route.nav.group, group);
      groups.push(group);
    }
    group.links.push({ num: route.nav.num, label: route.nav.label, path: route.path });
  }

  groups.push({
    label: 'Interactive Labs',
    links: [
      { num: '·', label: 'Static Semantics', path: '/concepts/static-semantics' },
      { num: '·', label: 'Tree Lab', path: '/concepts/tree-lab' },
      { num: '·', label: 'Playground', path: '/playground' },
      { num: '', label: 'Building an Interpreter', path: '', subHeader: true },
      { num: '1.', label: 'Lexing', path: '/interpreter/lexing' },
      { num: '2.', label: 'Parsing', path: '/interpreter/parsing' },
      { num: '3.', label: 'Static Semantics', path: '/concepts/static-semantics' },
      { num: '4.', label: 'Dynamic Semantics', path: '/interpreter/dynamics' },
      { num: '5.', label: 'Recursion & Divergence', path: '/interpreter/recursion' },
    ],
  });

  return groups;
})();

function pathFor(label: string): string {
  const route = contentRoutes.find((r) => r.nav?.label === label);
  if (!route) throw new Error(`content/nav: no registry entry with nav.label "${label}"`);
  return route.path;
}

export const topbarLinks: TopbarLink[] = [
  { label: 'Cheat Sheet', path: pathFor('Cheat Sheet') },
  { label: 'Concepts', path: pathFor('Bindings'), matchPrefix: '/concepts/' },
  { label: 'Labs', path: '/concepts/static-semantics', matchPrefix: '/interpreter/' },
  { label: 'Exercises', path: '/exercises', matchPrefix: '/exercises/' },
  { label: 'Playground', path: '/playground' },
];
