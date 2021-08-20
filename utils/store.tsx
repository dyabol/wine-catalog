import create from "zustand";
import shallow from "zustand/shallow";
import { Wine } from "../components/WineForm/WineForm";
import { LOCAL_STORAGE_WINES } from "./constants";
import { parseWines, stringifyWines } from "./json";

type StoreType = {
  wines: Wine[];
  nextId: number;
  selectedId: number | undefined;
  clearWines: () => void;
  loadWines: () => void;
  setWines: (wines: Wine[]) => void;
  addWine: (wine: Wine) => void;
  updateWine: (wine: Wine) => void;
  deleteWine: (wine: Wine) => void;
  setSelectedId: (id: number | undefined) => void;
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
  clearWines: () =>
    set(() => {
      return { wines: [], nextId: 1, selectedId: undefined };
    }),
  loadWines: () =>
    set(() => {
      const wines = getSavedWines();
      return { wines, nextId: getNextID(wines), selectedId: undefined };
    }),
  setWines: (wines: Wine[]) =>
    set(() => {
      return { wines, nextId: getNextID(wines), selectedId: undefined };
    }),
  addWine: (wine) =>
    set((state) => ({
      wines: [...state.wines, wine],
      nextId: state.nextId + 1,
    })),
  updateWine: (wine) =>
    set((state) => ({
      wines: state.wines.map((w) => (w.id === wine.id ? wine : w)),
    })),
  deleteWine: (wine) =>
    set((state) => ({
      wines: state.wines.filter((w) => w.id !== wine.id),
    })),
  setSelectedId: (selectedId) => set(() => ({ selectedId })),
}));

useStore.subscribe<Wine[]>(saveWines, (state) => state.wines, shallow);

export default useStore;
