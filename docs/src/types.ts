// Central shared types for the docs app's content/navigation layer.
// Feature-local types (e.g. mini-exercise data shapes) stay in their feature folder.

/** Which learning order the UI presents: flat reference list or phased guided path. */
export type LearnMode = 'reference' | 'guided';

/** Extra curated footer link on a concept page (practice exercise or deep dive). */
export type FooterExtra = {
  label: string;
  href: string;
  kind: 'practice' | 'deep';
};

/** One renderable content page: raw HTML + routing/meta + its place in the sidebar nav. */
export type ContentPageDef = {
  path: string;
  html: string;
  title: string;
  description: string;
  /** Sidebar placement. Omit for pages that aren't listed in the sidebar. */
  nav?: {
    group: string;
    /** Fixed marker for non-concept pages ('·', 'E1.'). Concept numbers are computed from order. */
    num?: string;
    label: string;
  };
  /** Present on concept pages: home-TOC blurb plus any curated footer links.
   *  Ordering (page label, prev/next) is computed in content/order.ts, never stored here. */
  concept?: {
    tocDesc: string;
    footerExtras?: FooterExtra[];
    /** True for pages on the guided path that carry no reference-mode number (e.g. orientation). */
    unnumbered?: boolean;
  };
};

/** One phase of the guided path: a titled group of concept paths in learning order. */
export type GuidedPhase = {
  num: number;
  title: string;
  paths: string[];
};

export type NavLink = {
  num: string;
  label: string;
  path: string;
  subHeader?: boolean;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

export type TopbarLink = {
  label: string;
  path: string;
  matchPrefix?: string;
};
