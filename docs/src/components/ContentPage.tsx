import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from './PageMeta';
import { islandRegistry } from '../content/islands';
import { contentRoutes } from '../content/registry';
import { pagePosition } from '../content/order';
import { useLearnMode } from '../learn/learn-mode-context';

type Props = {
  html: string;
  title: string;
  description?: string;
  /** Route path; enables computed page label + prev/next footer on concept pages. */
  path?: string;
};

type OrderingHosts = { label: HTMLElement; nav: HTMLElement };

// Page label ("Concept 2 of 20" / "Phase 2 · Step 4 of 4 · ...") and the
// "Continue learning" footer, computed from the current learn mode. Rendered
// through portals into hosts inside the raw HTML so the label keeps its
// `.page-header > .page-label` placement (CSS stagger) and the footer keeps
// the existing `.page-nav` classes.
function ConceptOrdering({ path, hosts }: { path: string; hosts: OrderingHosts }) {
  const { mode } = useLearnMode();
  const pos = pagePosition(path, mode);
  if (!pos) return null;
  const extras = contentRoutes.find((r) => r.path === path)?.concept?.footerExtras ?? [];

  return (
    <>
      {createPortal(
        <span key={mode} className="mode-crossfade">
          {pos.label}
        </span>,
        hosts.label,
      )}
      {createPortal(
        <div key={mode} className="page-nav mode-crossfade">
          <p className="page-nav-label">Continue learning</p>
          <div className="page-nav-links">
            <Link to={pos.prev.href} className="page-nav-prev">
              {pos.prev.label}
            </Link>
            <Link to={pos.next.href} className="page-nav-next">
              Next: {pos.next.label}
            </Link>
            {extras.map((e) => (
              <Link key={e.href + e.label} to={e.href} className={`page-nav-${e.kind}`}>
                {e.kind === 'practice' ? 'Practice: ' : 'Deep dive: '}
                {e.label}
              </Link>
            ))}
          </div>
        </div>,
        hosts.nav,
      )}
    </>
  );
}

// Renders a static HTML fragment ported from the legacy site, but intercepts
// internal `<a href>` clicks so they go through React Router (no full page
// reload) and rebinds the legacy `.sol-toggle` accordion behavior.
export default function ContentPage({ html, title, description, path }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hosts, setHosts] = useState<OrderingHosts | null>(null);

  // Concept pages get their ordering chrome injected: an empty `.page-label`
  // host prepended to `.page-header` and a footer host appended to `.article`.
  // (Guided-only pages like the orientation get hosts too; ConceptOrdering
  // renders nothing into them while the current mode excludes the page.)
  const isConcept =
    path !== undefined && contentRoutes.some((r) => r.path === path && r.concept);
  useEffect(() => {
    const root = ref.current;
    if (!root || !isConcept) {
      setHosts(null);
      return;
    }
    const header = root.querySelector('.page-header');
    const article = root.querySelector('.article');
    if (!header || !article) {
      setHosts(null);
      return;
    }
    const label = document.createElement('div');
    label.className = 'page-label';
    header.prepend(label);
    const nav = document.createElement('div');
    article.appendChild(nav);
    setHosts({ label, nav });
    return () => {
      label.remove();
      nav.remove();
      setHosts(null);
    };
  }, [html, isConcept]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Intercept internal link navigation
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (a.target === '_blank') return;
      if (/^[a-z]+:/i.test(href) || href.startsWith('//') || href.startsWith('#')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      // Playground is a separate JS app with module-scope globals, so never SPA-nav to it.
      if (href.startsWith('/playground')) {
        window.location.assign(href);
        return;
      }
      navigate(href);
    };

    // Wire up sol-toggle accordions (used on exercise pages)
    const onSolToggle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const toggle = target.closest('.sol-toggle');
      if (!toggle) return;
      toggle.classList.toggle('open');
      const body = toggle.nextElementSibling;
      if (body && body.classList.contains('sol-body')) {
        body.classList.toggle('open');
      }
    };

    // Wire up copy buttons (.copy-btn inside .code-block)
    const onCopy = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.copy-btn');
      if (!btn) return;
      const block = btn.closest('.code-block');
      const pre = block?.querySelector('pre');
      if (!pre) return;
      const text = pre.textContent ?? '';
      navigator.clipboard
        ?.writeText(text)
        .then(() => {
          const orig = btn.textContent;
          btn.textContent = 'copied';
          setTimeout(() => {
            btn.textContent = orig;
          }, 1200);
        })
        .catch(() => {});
    };

    root.addEventListener('click', onClick);
    root.addEventListener('click', onSolToggle);
    root.addEventListener('click', onCopy);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('click', onSolToggle);
      root.removeEventListener('click', onCopy);
    };
  }, [html, navigate]);

  // Mount React islands into `[data-island]` placeholders inside the raw HTML.
  // Each mount renders into a freshly created child host (not the placeholder
  // itself) so a deferred unmount can never clobber a successor root's DOM
  // (StrictMode remounts the effect in dev). Cleanup is deferred one tick:
  // unmounting a nested root synchronously from a passive-effect cleanup
  // triggers a React 18 dev warning, and on route change the container is
  // already detached by the innerHTML rewrite - both are safe with unmount().
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mounted: { r: Root; host: HTMLElement }[] = [];
    root.querySelectorAll<HTMLElement>('[data-island]').forEach((el) => {
      const Comp = islandRegistry[el.dataset.island ?? ''];
      if (!Comp) return;
      const host = document.createElement('div');
      el.appendChild(host);
      const r = createRoot(host);
      r.render(
        <StrictMode>
          <Comp />
        </StrictMode>,
      );
      mounted.push({ r, host });
    });
    return () => {
      setTimeout(() => {
        mounted.forEach(({ r, host }) => {
          r.unmount();
          host.remove();
        });
      });
    };
  }, [html]);

  return (
    <>
      <PageMeta title={title} description={description} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
      {path !== undefined && hosts && <ConceptOrdering path={path} hosts={hosts} />}
    </>
  );
}
