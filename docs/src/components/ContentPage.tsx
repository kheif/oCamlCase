import { StrictMode, useEffect, useRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import PageMeta from './PageMeta';
import { islandRegistry } from '../content/islands';

type Props = {
  html: string;
  title: string;
  description?: string;
};

// Renders a static HTML fragment ported from the legacy site, but intercepts
// internal `<a href>` clicks so they go through React Router (no full page
// reload) and rebinds the legacy `.sol-toggle` accordion behavior.
export default function ContentPage({ html, title, description }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
  // already detached by the innerHTML rewrite — both are safe with unmount().
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
    </>
  );
}
