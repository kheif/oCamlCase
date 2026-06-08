import { useEffect } from 'react';
import Topbar from '../../components/Topbar';
import PageMeta from '../../components/PageMeta';
import bodyHtml from './legacy/playground-body.html?raw';
import './legacy/playground.css';

const CODEMIRROR_SCRIPTS = [
  '/playground/js/codemirror/codemirror.js',
  '/playground/js/codemirror/closebrackets.js',
  '/playground/js/codemirror/matchbrackets.min.js',
  '/playground/js/codemirror/mllike.js',
  '/playground/js/codemirror/searchcursor.js',
  '/playground/js/codemirror/dialog.js',
  '/playground/js/codemirror/search.js',
  '/playground/js/codemirror/show-hint.js',
];

const PLAYGROUND_MAIN = '/playground/js/playground-main.js';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Reuse if already present (e.g., HMR / re-mount)
    const existing = document.querySelector(`script[data-pg-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.dataset.pgSrc = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

export default function Playground() {
  useEffect(() => {
    document.documentElement.setAttribute('data-pg-theme', 'light');

    let cancelled = false;
    (async () => {
      for (const src of CODEMIRROR_SCRIPTS) {
        await loadScript(src);
        if (cancelled) return;
      }
      // Always reload the main script on mount so init runs each time.
      const existing = document.querySelector(`script[data-pg-src="${PLAYGROUND_MAIN}"]`);
      if (existing) existing.remove();
      const s = document.createElement('script');
      s.src = PLAYGROUND_MAIN + '?t=' + Date.now();
      s.async = false;
      s.dataset.pgSrc = PLAYGROUND_MAIN;
      document.body.appendChild(s);
    })().catch((err) => console.error('[playground] load error:', err));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageMeta title="Playground | oCamlCase" />
      <Topbar />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
