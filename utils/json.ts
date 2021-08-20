import moment from "moment";
import { Wine } from "../components/WineForm/WineForm";

export const parseWines = (input: string): Wine[] =>
  (JSON.parse(input) as any[]).map((w) => ({
    ...w,
    year: moment({ year: w.year }),
  }));

export const stringifyWines = (input: Wine[]): string =>
  JSON.stringify(input.map((w) => ({ ...w, year: w.year.format("YYYY") })));
