import create from "zustand";
import { Wine } from "../components/WineForm/WineForm";

type StoreType = {
  wines: Wine[];
  addWine: (wine: Wine) => void;
};

const useStore = create<StoreType>((set) => ({
  wines: [],
  addWine: (wine: Wine) => set((state) => ({ wines: [...state.wines, wine] })),
}));

export default useStore;
