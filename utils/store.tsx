import moment from "moment";
import create from "zustand";
import shallow from "zustand/shallow";
import { Wine } from "../components/WineForm/WineForm";

type StoreType = {
  wines: Wine[];
  nextId: number;
  selectedId: number | undefined;
  loadWines: () => void;
  addWine: (wine: Wine) => void;
  updateWine: (wine: Wine) => void;
  deleteWine: (wine: Wine) => void;
  setSelectedId: (id: number | undefined) => void;
};

export const getSavedWines = () => {
  const savedWines = localStorage.getItem("wines");
  if (savedWines) {
    return (JSON.parse(savedWines) as any[]).map((w) => ({
      ...w,
      year: moment({ year: w.year }),
    }));
  }
  return [];
};

const getNextID = (wines: Wine[]) => {
  const b = Math.max(...wines.map((w) => w.id));
  return b !== -Infinity ? b + 1 : 1;
};

const useStore = create<StoreType>((set) => ({
  wines: [],
  nextId: 1,
  selectedId: undefined,
  loadWines: () =>
    set(() => {
      const wines = getSavedWines();
      return { wines, nextId: getNextID(wines) };
    }),
  addWine: (wine) => set((state) => ({ wines: [...state.wines, wine] })),
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

useStore.subscribe<Wine[]>(
  (wines) => {
    localStorage.setItem(
      "wines",
      JSON.stringify(wines.map((w) => ({ ...w, year: w.year.format("YYYY") })))
    );
  },
  (state) => state.wines,
  shallow
);

export default useStore;
