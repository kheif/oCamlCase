import type { NavGroup, TopbarLink } from '../types';
import { contentRoutes } from './registry';

// navGroups (sidebar) is DERIVED from the content registry: each ContentPageDef
// carries its own `nav` placement, so a new page only needs to be added once,
// in registry.ts, and it shows up in the sidebar automatically.
export const navGroups: NavGroup[] = (() => {
  const groups: NavGroup[] = [];
  const byLabel = new Map<string, NavGroup>();

  for (const route of contentRoutes) {
    if (!route.nav) continue;
    let group = byLabel.get(route.nav.group);
    if (!group) {
      group = { label: route.nav.group, links: [] };
      byLabel.set(route.nav.group, group);
      groups.push(group);
    }
    group.links.push({ num: route.nav.num, label: route.nav.label, path: route.path });
  }

  // Mini Exercises isn't a single-HTML content route (it's its own feature with
  // its own routing), so it's appended to the Exercises group here.
  byLabel
    .get('Exercises')
    ?.links.push({ num: '·', label: 'Mini Exercises', path: '/exercises/mini' });

  // Static Semantics is a live elaborator feature, not a registry HTML page —
  // appended to Concepts the same way Mini Exercises joins Exercises above.
  byLabel
    .get('Concepts')
    ?.links.push({ num: '·', label: 'Static Semantics', path: '/concepts/static-semantics' });

  return groups;
})();

function pathFor(label: string): string {
  const route = contentRoutes.find((r) => r.nav?.label === label);
  if (!route) throw new Error(`content/nav: no registry entry with nav.label "${label}"`);
  return route.path;
}

// Curated subset shown in the topbar. References registry-derived paths (via
// pathFor) for entries that are content pages, so the strings can't drift from
// registry.ts; /playground is its own route (not in the content registry).
export const topbarLinks: TopbarLink[] = [
  { label: 'Home', path: pathFor('Home') },
  { label: 'Cheat Sheet', path: pathFor('Cheat Sheet') },
  { label: 'Concepts', path: pathFor('Bindings'), matchPrefix: '/concepts/' },
  { label: 'Playground', path: '/playground' },
];
