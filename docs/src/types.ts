// Central shared types for the docs app's content/navigation layer.
// Feature-local types (e.g. mini-exercise data shapes) stay in their feature folder.

/** One renderable content page: raw HTML + routing/meta + its place in the sidebar nav. */
export type ContentPageDef = {
  path: string;
  html: string;
  title: string;
  description: string;
  /** Sidebar placement. Omit for pages that aren't listed in the sidebar. */
  nav?: {
    group: string;
    num: string;
    label: string;
  };
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
