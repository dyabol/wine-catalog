import create from "zustand";
import { Wine } from "../components/WineForm/WineForm";

type StoreType = {
  wines: Wine[];
  addWine: (wine: Wine) => void;
  updateWine: (wine: Wine) => void;
  deleteWine: (wine: Wine) => void;
  selectedId: number | undefined;
  setSelectedId: (id: number | undefined) => void;
};

const useStore = create<StoreType>((set) => ({
  wines: [],
  addWine: (wine) => set((state) => ({ wines: [...state.wines, wine] })),
  updateWine: (wine) =>
    set((state) => ({
      wines: state.wines.map((w) => (w.id === wine.id ? wine : w)),
    })),
  deleteWine: (wine) =>
    set((state) => ({
      wines: state.wines.filter((w) => w.id !== wine.id),
    })),
  selectedId: undefined,
  setSelectedId: (selectedId) => set(() => ({ selectedId })),
}));

export default useStore;
