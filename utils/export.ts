import XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import { Wine } from "../components/WineForm/WineForm";

const getData = (variaties: string[], wines: Wine[]) => {
  const data: (string | number)[][] = [];
  let number = 0;
  variaties.forEach((variety) => {
    data.push(
      ["", variety],
      [],
      [
        "",
        "Č.vz.",
        "Jméno",
        "Adresa",
        "Ročník",
        "Jakost",
        "Pozn.",
        "Počet lahví",
      ],
      []
    );
    wines
      .filter((w) => w.variety === variety)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((w) => {
        number += 1;
        let props = [];
        if (w.sugar_content) {
          props.push(w.sugar_content);
        }
        if (w.properties) {
          props = [...props, w.properties];
        }
        data.push([
          w.id,
          number,
          w.name,
          w.address,
          w.year.format("YYYY"),
          props.join(", "),
          w.note ?? "",
          w.number_of_bottles,
        ]);
      });
    data.push([], []);
  });
  return data;
};

export const exportToExcel = (variaties: string[], wines: Wine[]) => {
  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: `Katalog vín ${new Date().getFullYear()}`,
    Author: "katalog.skluzice.cz",
    CreatedDate: new Date(),
  };
  wb.SheetNames.push("Katalog vín");
  const ws_data = getData(variaties, wines);
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["Katalog vín"] = ws;

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  function s2ab(s: string) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  }

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    `katalog_${moment().format("YYYY-MM-DD_HH-mm-ss")}.xlsx`
  );
};
