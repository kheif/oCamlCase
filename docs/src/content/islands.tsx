import type { ComponentType } from 'react';
import StackGrowthDemo from '../features/demos/StackGrowthDemo';

// React "islands" mountable inside raw-HTML content pages. A fragment opts in
// with `<div data-island="<key>"></div>`; ContentPage scans for these after
// rendering the HTML and mounts the mapped component into each placeholder.
export const islandRegistry: Record<string, ComponentType> = {
  'stack-growth': StackGrowthDemo,
};
