import type { LearnMode, NavGroup, TopbarLink } from '../types';
import { contentRoutes } from './registry';
import { conceptSequence, guidedPhases, referenceNum } from './order';

const HIDDEN_SIDEBAR_GROUPS = new Set(['Start here', 'Exercises']);

const interactiveLabsGroup: NavGroup = {
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
};

const routeByPath = new Map(contentRoutes.map((r) => [r.path, r]));

function referenceGroups(): NavGroup[] {
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
    const num = route.nav.num ?? (route.concept ? referenceNum(route.path) : '·');
    group.links.push({ num, label: route.nav.label, path: route.path });
  }
  return groups;
}

function guidedGroups(): NavGroup[] {
  return guidedPhases.map((phase) => ({
    label: `Phase ${phase.num} · ${phase.title}`,
    links: phase.paths.map((path, i) => ({
      num: `${i + 1}.`,
      label: routeByPath.get(path)?.nav?.label ?? path,
      path,
    })),
  }));
}

/** Sidebar groups for the current learn mode. Interactive Labs is identical in both. */
export function getNavGroups(mode: LearnMode): NavGroup[] {
  const groups = mode === 'guided' ? guidedGroups() : referenceGroups();
  return [...groups, interactiveLabsGroup];
}

function pathFor(label: string): string {
  const route = contentRoutes.find((r) => r.nav?.label === label);
  if (!route) throw new Error(`content/nav: no registry entry with nav.label "${label}"`);
  return route.path;
}

export function getTopbarLinks(mode: LearnMode): TopbarLink[] {
  return [
    { label: 'Cheat Sheet', path: pathFor('Cheat Sheet') },
    { label: 'Concepts', path: conceptSequence(mode)[0], matchPrefix: '/concepts/' },
    { label: 'Labs', path: '/concepts/static-semantics', matchPrefix: '/interpreter/' },
    { label: 'Exercises', path: '/exercises', matchPrefix: '/exercises/' },
    { label: 'Playground', path: '/playground' },
  ];
}
