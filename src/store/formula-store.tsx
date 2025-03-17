import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Tag {
  id: string;
  label: string;
  value?: number;
}

export interface FormulaState {
  formula: string;
  tags: Tag[];
  setFormula: (formula: string) => void;
  addTag: (tag: Tag) => void;
  removeTag: (id: string) => void;
  updateTag: (id: string, newLabel: string) => void;
}

export const useFormulaStore = create<FormulaState>()(
  immer<FormulaState>((set) => ({
    formula: "",
    tags: [],
    setFormula: (formula: string) =>
      set((state) => {
        state.formula = formula;
      }),

    addTag: (tag: Tag) =>
      set((state) => {
        state.tags.push(tag);
      }),

    removeTag: (id: string) =>
      set((state) => {
        state.tags = state.tags.filter((tag) => tag.id !== id);
      }),

    updateTag: (id: string, newLabel: string) =>
      set((state) => {
        const tag = state.tags.find((t) => t.id === id);
        if (tag) tag.label = newLabel;
      }),
  }))
);
