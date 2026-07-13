import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

/**
 * CodeMirror 5 editor wrapper for practice code exercises.
 *
 * Reuses the CodeMirror bundle already shipped for the standalone Playground
 * (under /playground/js/codemirror/*.js + /playground/css/...). The bundle
 * exposes a global `CodeMirror`. We instantiate it once per mount and expose an
 * imperative `setTypeHints` so the parent can render inferred OCaml types as
 * line-widgets ABOVE each `let` -- the same trick playground-main.js uses.
 */

// The CodeMirror global injected by the bundle scripts.
type AnyCm = any; // eslint-disable-line @typescript-eslint/no-explicit-any

const CM_SCRIPTS = [
  '/playground/js/codemirror/codemirror.js',
  '/playground/js/codemirror/closebrackets.js',
  '/playground/js/codemirror/matchbrackets.min.js',
  '/playground/js/codemirror/mllike.js',
];
const CM_BASE_CSS = '/playground/css/codemirror/codemirror.min.css';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-pr-cm="${src}"]`);
    if (existing) {
      if (existing.getAttribute('data-loaded') === '1') resolve();
      else {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error(`Failed: ${src}`)));
      }
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.dataset.prCm = src;
    s.onload = () => { s.setAttribute('data-loaded', '1'); resolve(); };
    s.onerror = () => reject(new Error(`Failed: ${src}`));
    document.body.appendChild(s);
  });
}

function ensureBaseCss() {
  if (document.querySelector(`link[data-pr-cm-css]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = CM_BASE_CSS;
  link.setAttribute('data-pr-cm-css', '1');
  document.head.appendChild(link);
}

let _cmLoading: Promise<void> | null = null;
function ensureCodeMirror(): Promise<void> {
  if ((window as { CodeMirror?: AnyCm }).CodeMirror) return Promise.resolve();
  if (_cmLoading) return _cmLoading;
  ensureBaseCss();
  _cmLoading = (async () => {
    for (const src of CM_SCRIPTS) await loadScript(src);
  })();
  return _cmLoading;
}

export type TypeSig = { name: string; type: string };

export type CmEditorHandle = {
  /** Render inferred types as line-widgets above matching `let` lines. */
  setTypeHints: (sigs: TypeSig[]) => void;
  /** Remove all type-hint widgets. */
  clearTypeHints: () => void;
  /** Re-measure the editor (needed after it was display:none, e.g. tab swap). */
  refresh: () => void;
};

type CmEditorProps = {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  theme: 'light' | 'dark';
  onRun?: () => void;
};

function cmTheme(theme: 'light' | 'dark') {
  return theme === 'dark' ? 'ocamlcase' : 'ocamlcase-light';
}

const CmEditor = forwardRef<CmEditorHandle, CmEditorProps>(function CmEditor(
  { value, onChange, disabled, theme, onRun },
  ref,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<AnyCm>(null);
  const widgetsRef = useRef<AnyCm[]>([]);
  // Latest props captured for the (stable) CodeMirror callbacks.
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);
  onChangeRef.current = onChange;
  onRunRef.current = onRun;
  // Guard so programmatic setValue does not loop back through onChange.
  const settingRef = useRef(false);

  const clearTypeHints = () => {
    widgetsRef.current.forEach((w) => w.clear());
    widgetsRef.current = [];
  };

  useImperativeHandle(ref, () => ({
    clearTypeHints,
    refresh() {
      editorRef.current?.refresh();
    },
    setTypeHints(sigs: TypeSig[]) {
      const cm = editorRef.current;
      if (!cm) return;
      clearTypeHints();
      const lines = cm.getValue().split('\n');
      sigs.forEach(({ name, type }) => {
        for (let i = 0; i < lines.length; i++) {
          const m = lines[i].match(/^\s*let\s+(?:rec\s+)?(\S+)/);
          if (m && m[1] === name) {
            const el = document.createElement('div');
            el.className = 'pr-type-hint';
            el.textContent = `val ${name} : ${type}`;
            widgetsRef.current.push(
              cm.addLineWidget(i, el, { above: true, noHScroll: true }),
            );
            break;
          }
        }
      });
    },
  }));

  // ── Init once ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    let editor: AnyCm = null;
    ensureCodeMirror()
      .then(() => {
        if (cancelled || !hostRef.current) return;
        const CodeMirror = (window as { CodeMirror?: AnyCm }).CodeMirror;
        if (!CodeMirror) return;

        editor = CodeMirror(hostRef.current, {
          value,
          mode: 'text/x-ocaml',
          theme: cmTheme(theme),
          lineNumbers: true,
          indentUnit: 2,
          tabSize: 2,
          indentWithTabs: false,
          autoCloseBrackets: true,
          matchBrackets: true,
          readOnly: disabled ? 'nocursor' : false,
          extraKeys: {
            'Ctrl-Enter': () => onRunRef.current?.(),
            'Cmd-Enter': () => onRunRef.current?.(),
            Tab: (cm: AnyCm) => cm.execCommand('insertSoftTab'),
          },
        });
        editor.setSize('100%', '100%');
        editorRef.current = editor;

        editor.on('change', (cm: AnyCm) => {
          if (settingRef.current) return;
          // A real edit invalidates the previous inferred types.
          clearTypeHints();
          onChangeRef.current(cm.getValue());
        });
      })
      .catch((err) => console.error('[practice] CodeMirror load error:', err));

    return () => {
      cancelled = true;
      clearTypeHints();
      const wrapper = editor?.getWrapperElement?.();
      if (wrapper && wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync external value (Show solution, exercise switch) ─────────────────────
  useEffect(() => {
    const cm = editorRef.current;
    if (!cm) return;
    if (cm.getValue() !== value) {
      settingRef.current = true;
      cm.setValue(value);
      settingRef.current = false;
      clearTypeHints();
    }
  }, [value]);

  // ── Sync theme + disabled ────────────────────────────────────────────────────
  useEffect(() => {
    editorRef.current?.setOption('theme', cmTheme(theme));
  }, [theme]);
  useEffect(() => {
    editorRef.current?.setOption('readOnly', disabled ? 'nocursor' : false);
  }, [disabled]);

  return <div ref={hostRef} className="pr-cm-host" />;
});

export default CmEditor;
