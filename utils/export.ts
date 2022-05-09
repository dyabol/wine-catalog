import { saveAs } from "file-saver";
import moment from "moment";
import { Wine } from "../components/WineForm/WineForm";
import ExcelJS from "exceljs";
import i18n from "i18next";
import useStore from "./store";

const setData = (
  sheet: ExcelJS.Worksheet,
  variaties: string[],
  wines: Wine[],
  aliases: Record<string, string>
) => {
  let number = 0;
  variaties.forEach((variety) => {
    const headingRow = sheet.addRow(["", variety]);
    headingRow.getCell(2).font = {
      bold: true,
      size: 20,
      underline: true,
    };
    headingRow.number;
    sheet.mergeCells(headingRow.number, 2, headingRow.number, 7);
    sheet.addRow([]);
    if (useStore.getState().scored) {
      const headerRow = sheet.addRow([
        "",
        i18n.t("Id_short"),
        i18n.t("Name"),
        i18n.t("Address"),
        i18n.t("Year"),
        i18n.t("Quality"),
        i18n.t("Note_short"),
        i18n.t("Points"),
        i18n.t("Number of bottles"),
      ]);
      for (let i = 2; i < 9; i++) {
        headerRow.getCell(i).border = {
          bottom: { style: "thin", color: { argb: "00000000" } },
        };
      }
      headerRow.getCell(2);
    } else {
      const headerRow = sheet.addRow([
        "",
        i18n.t("Id_short"),
        i18n.t("Name"),
        i18n.t("Address"),
        i18n.t("Year"),
        i18n.t("Quality"),
        i18n.t("Note_short"),
        i18n.t("Number of bottles"),
      ]);
      for (let i = 2; i < 8; i++) {
        headerRow.getCell(i).border = {
          bottom: { style: "thin", color: { argb: "00000000" } },
        };
      }
      headerRow.getCell(2);
    }
    sheet.addRow([]);
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
          props = [...props, ...w.properties];
        }
        if (useStore.getState().scored) {
          const dataRow = sheet.addRow([
            w.id,
            number,
            w.name,
            w.address,
            parseInt(w.year.format("YYYY"), 10),
            props.map((p) => aliases[p] ?? p).join(", "),
            w.note ?? "",
            w.points,
            w.number_of_bottles,
          ]);
          dataRow.getCell(1).font = {
            bold: true,
          };
        } else {
          const dataRow = sheet.addRow([
            w.id,
            number,
            w.name,
            w.address,
            parseInt(w.year.format("YYYY"), 10),
            props.map((p) => aliases[p] ?? p).join(", "),
            w.note ?? "",
            w.number_of_bottles,
          ]);
          dataRow.getCell(1).font = {
            bold: true,
          };
        }
      });
    sheet.addRow([]);
    sheet.addRow([]);
  });
};

export const exportToExcel = async (
  variaties: string[],
  wines: Wine[],
  aliases: Record<string, string>
) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "katalog.hromek.cz";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(i18n.t("Catalog of wines"));
  setData(sheet, variaties, wines, aliases);

  const buffer = await workbook.xlsx.writeBuffer();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const fileExtension = ".xlsx";

  const blob = new Blob([buffer], { type: fileType });
  saveAs(
    blob,
    `katalog_${moment().format("YYYY-MM-DD_HH-mm-ss")}${fileExtension}`
  );
};
