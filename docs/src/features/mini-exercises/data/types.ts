export type LineOrderItem = { id: string; code: string };

export type MiniExercise = {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  conceptLink?: { label: string; href: string };
  prompt: string;
  filename: string; // shown in the file tab + breadcrumb
  category: string; // for the breadcrumb, e.g. "iteration"
  prefixCode: string; // text shown above the drop slots, joined with \n
  suffixCode: string; // text shown below the drop slots
  items: LineOrderItem[]; // lines to drop, in canonical correct order; should already include the indentation that belongs in the slot
  expectedOutput: string; // output the suffix `let () = Printf.printf ...` should produce when slots are correct
};
