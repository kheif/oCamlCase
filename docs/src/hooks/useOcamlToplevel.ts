/**
 * Reusable hook that loads the js_of_ocaml toplevel and exposes a `run`
 * function that executes OCaml source and returns the output text.
 *
 * The toplevel bundle is a module-level singleton: it is loaded once and
 * reused by every component that calls this hook.  The bundle writes its
 * output to a DOM element with id="output".  We create a hidden element with
 * that id if none exists (the standalone /playground page creates its own;
 * when practice exercises are mounted that page is not mounted, so we are
 * safe to own the element).
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// Globals injected by the toplevel bundle after window.onload() fires.
declare global {
  interface Window {
    version?: string;
    executecallback?: { execute(session: string, code: string): void };
    toplevelcallback?: { reset(): void; clear(): void };
  }
}

export type RunResult = {
  /** Raw text from the OCaml toplevel (input-echo lines excluded). */
  raw: string;
  /** True if the output contains a compile-time or runtime Error. */
  hasError: boolean;
};

// ── Module-level singleton state ─────────────────────────────────────────────

type LoadState = 'idle' | 'loading' | 'ready' | 'error';
let _state: LoadState = 'idle';
const _readyCbs: Array<() => void> = [];
const _errorCbs: Array<() => void> = [];

const OUTPUT_EL_ID = 'output'; // the id the toplevel bundle hardcodes
const CONTAINER_EL_ID = 'toplevel-container';
const SCRIPT_SRC = '/playground/toplevels/toplevel-5.1.1.js';

const OFFSCREEN =
  'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';

/**
 * The toplevel's init (run on window.onload) wires stdout to `#output`, but it
 * ALSO reads `#userinput` and a working `#test-canvas` during setup and throws
 * `Not_found` if they are missing -- in which case it silently falls back to
 * writing to the JS console and `#output` stays empty (tests then see no
 * output). The standalone /playground page provides this whole hidden subtree
 * (see src/features/playground/legacy/playground-body.html); when practice
 * exercises mount that page is not present, so we recreate the same structure.
 */
function ensureOutputEl(): HTMLElement {
  let output = document.getElementById(OUTPUT_EL_ID);
  if (output) return output;

  const container = document.createElement('div');
  container.id = CONTAINER_EL_ID;
  container.style.cssText = OFFSCREEN;
  container.innerHTML =
    '<pre id="output"></pre>' +
    '<div><div id="sharp" class="sharp"></div>' +
    '<textarea id="userinput" autocorrect="off" autocapitalize="none">Loading ...</textarea></div>';
  document.body.appendChild(container);

  if (!document.getElementById('test-canvas')) {
    const canvas = document.createElement('canvas');
    canvas.id = 'test-canvas';
    canvas.style.cssText = OFFSCREEN + 'display:block;';
    document.body.appendChild(canvas);
  }

  output = document.getElementById(OUTPUT_EL_ID)!;
  return output;
}

function drainCallbacks(list: Array<() => void>) {
  const snapshot = list.splice(0);
  snapshot.forEach((cb) => cb());
}

function ensureLoaded(onReady: () => void, onError: () => void) {
  if (_state === 'ready') { onReady(); return; }
  if (_state === 'error') { onError(); return; }

  _readyCbs.push(onReady);
  _errorCbs.push(onError);
  if (_state === 'loading') return;

  _state = 'loading';
  ensureOutputEl();

  window.version = '5.1.1';
  const script = document.createElement('script');
  script.src = SCRIPT_SRC;
  script.onload = () => {
    // The toplevel sets window.onload to its own init which wires stdout→#output.
    // The browser already fired the real load event, so we trigger it manually.
    if (typeof window.onload === 'function') {
      try { window.onload(new Event('load')); } catch { /* ignore */ }
    }

    const startedAt = Date.now();
    const TIMEOUT_MS = 12000;
    const poll = setInterval(() => {
      if (window.executecallback) {
        clearInterval(poll);
        _state = 'ready';
        drainCallbacks(_readyCbs);
        _errorCbs.splice(0); // discard
      } else if (Date.now() - startedAt > TIMEOUT_MS) {
        clearInterval(poll);
        _state = 'error';
        drainCallbacks(_errorCbs);
        _readyCbs.splice(0);
      }
    }, 100);
  };
  script.onerror = () => {
    _state = 'error';
    drainCallbacks(_errorCbs);
    _readyCbs.splice(0);
  };
  document.head.appendChild(script);
}

// ── Output scraping ───────────────────────────────────────────────────────────

function scrapeOutput(): string {
  const el = document.getElementById(OUTPUT_EL_ID);
  if (!el) return '';
  let text = '';
  el.childNodes.forEach((node) => {
    // The toplevel echoes input in .sharp blocks; skip them so we only see
    // actual stdout (same logic as getRuntimeOutputText in playground-main.js).
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as Element).classList.contains('sharp')
    ) {
      return;
    }
    text += node.textContent ?? '';
  });
  return text.replace(/\r/g, '');
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export type ToplevelStatus = 'idle' | 'loading' | 'ready' | 'error';

export function useOcamlToplevel() {
  const [status, setStatus] = useState<ToplevelStatus>(() =>
    _state === 'ready' ? 'ready' : 'idle',
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Kick off loading as soon as the hook mounts (lazy: only if not ready yet).
  // The initial useState value handles 'ready'; here we handle the load path.
  useEffect(() => {
    if (_state === 'ready') return;
    // Defer one tick so status update does not happen synchronously in the
    // effect body (satisfies react-hooks/set-state-in-effect).
    const id = setTimeout(() => {
      if (!mountedRef.current) return;
      setStatus('loading');
      ensureLoaded(
        () => { if (mountedRef.current) setStatus('ready'); },
        () => { if (mountedRef.current) setStatus('error'); },
      );
    }, 0);
    return () => clearTimeout(id);
  }, []);

  /**
   * Reset the OCaml environment and execute `code`.
   * Returns the output text and whether an Error was detected.
   */
  const run = useCallback((code: string, opts?: { reset?: boolean }): RunResult => {
    if (!window.executecallback) {
      return { raw: 'OCaml runtime not ready.', hasError: true };
    }
    try {
      // Reset environment so each run starts clean. Callers running follow-up
      // code against definitions from a previous run (e.g. test expressions
      // that call a function defined in the compile step) pass reset:false so
      // the toplevel keeps the definitions in scope.
      if (opts?.reset !== false) window.toplevelcallback?.reset();

      const outputEl = ensureOutputEl();
      outputEl.innerHTML = '';

      window.executecallback.execute('toplevel', code);

      const raw = scrapeOutput();
      const hasError = /\berror\b/i.test(raw);
      return { raw, hasError };
    } catch (err) {
      // A synchronous throw from the toplevel must not propagate -- callers
      // treat this as a normal failed run rather than crashing (and hanging
      // their "running" UI state).
      const message = err instanceof Error ? err.message : String(err);
      return { raw: `OCaml runtime error: ${message}`, hasError: true };
    }
  }, []);

  /**
   * Load the runtime now if it has not been loaded yet.
   * Components can call this on user intent (e.g. clicking "Run Tests") to
   * show a loading indicator rather than waiting silently.
   */
  const load = useCallback(() => {
    if (_state !== 'idle') return;
    setStatus('loading');
    ensureLoaded(
      () => { if (mountedRef.current) setStatus('ready'); },
      () => { if (mountedRef.current) setStatus('error'); },
    );
  }, []);

  return { status, run, load };
}
