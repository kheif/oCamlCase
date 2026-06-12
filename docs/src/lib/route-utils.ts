// Shared active-link logic for Sidebar and Topbar. Both treat a path and its
// `.html` counterpart as the same destination (the app auto-redirects
// `*.html` -> clean URL - see App.tsx), and treat `/` specially because
// `/index.html` also redirects to it.

/** Is `pathname` the (possibly `.html`-suffixed) route for `path`? */
export function isActive(pathname: string, path: string): boolean {
  if (path === '/') return pathname === '/' || pathname === '/index.html';
  return pathname === path || pathname === path + '.html';
}

/** Topbar variant: also supports prefix matching (e.g. any `/concepts/*`). */
export function isTopbarActive(
  pathname: string,
  link: { path: string; matchPrefix?: string },
): boolean {
  if (link.matchPrefix) return pathname.startsWith(link.matchPrefix);
  return isActive(pathname, link.path);
}
