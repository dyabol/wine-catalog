import create from "zustand";
import shallow from "zustand/shallow";
import { Wine } from "../components/WineForm/WineForm";
import { LOCAL_STORAGE_WINES } from "./constants";
import { parseWines, stringifyWines } from "./json";

type StoreType = {
  wines: Wine[];
  nextId: number;
  selectedId: number | undefined;
  inEditId: number | undefined;
  scored: boolean;
  toggleScored: () => void;
  setInEditId: (id: number | undefined) => void;
  clearWines: () => void;
  loadWines: () => void;
  setWines: (wines: Wine[]) => void;
  addWine: (wine: Wine) => void;
  updateWine: (wine: Wine) => void;
  deleteWine: (id: number) => void;
  setSelectedId: (id: number | undefined) => void;
  cancelAdding: () => void;
};

const getSavedWines = () => {
  const savedWines = localStorage.getItem(LOCAL_STORAGE_WINES);
  if (savedWines) {
    return parseWines(savedWines);
  }
  return [];
};

const getNextID = (wines: Wine[]) => {
  const b = Math.max(...wines.map((w) => w.id));
  return b !== -Infinity ? b + 1 : 1;
};

const saveWines = (wines: Wine[]) => {
  localStorage.setItem(LOCAL_STORAGE_WINES, stringifyWines(wines));
};

const useStore = create<StoreType>((set) => ({
  wines: [],
  nextId: 1,
  selectedId: undefined,
  inEditId: undefined,
  scored: true,
  toggleScored: () => set(({ scored }) => ({ scored: !scored })),
  setInEditId: (inEditId) => set(() => ({ inEditId })),
  clearWines: () =>
    set(() => ({ wines: [], nextId: 1, selectedId: undefined })),
  loadWines: () =>
    set(() => {
      const wines = getSavedWines();
      return { wines, nextId: getNextID(wines), selectedId: undefined };
    }),
  setWines: (wines: Wine[]) =>
    set(() => ({ wines, nextId: getNextID(wines), selectedId: undefined })),
  addWine: (wine) =>
    set((state) => ({
      wines: [...state.wines, wine],
      nextId: state.nextId + 1,
    })),
  updateWine: (wine) =>
    set((state) => ({
      wines: state.wines.map((w) => (w.id === wine.id ? wine : w)),
      inEditId: undefined,
    })),
  deleteWine: (id) =>
    set((state) => {
      const n = state.wines.filter((w) => w.id !== id);
      return {
        wines: n,
        selectedId: n.length === 0 ? undefined : n[0].id,
      };
    }),
  setSelectedId: (selectedId) => set(() => ({ selectedId })),
  cancelAdding: () =>
    set((state) => ({
      selectedId: state.wines.length > 0 ? state.wines[0].id : undefined,
    })),
}));

useStore.subscribe<Wine[]>(saveWines, (state) => state.wines, shallow);

export default useStore;
