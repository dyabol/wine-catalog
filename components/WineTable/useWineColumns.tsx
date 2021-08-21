import { Grid } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Wine } from "../WineForm/WineForm";

const { useBreakpoint } = Grid;

type Column = ColumnType<Wine> & {
  hidden?: boolean;
};

const useWineColumns = (): Column[] => {
  const { t } = useTranslation();
  const { sm } = useBreakpoint();
  const columns: Column[] = useMemo(
    () => [
      {
        title: t("Id"),
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("Name"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("Address"),
        dataIndex: "address",
        key: "address",
        hidden: !sm,
      },
      {
        title: t("Variety"),
        dataIndex: "variety",
        key: "variety",
      },
      {
        title: t("Year"),
        dataIndex: "year",
        key: "year",
        render: (year: moment.Moment) => year.format("YYYY"),
        hidden: !sm,
      },
    ],
    [sm, t]
  );

  return columns;
};

export default useWineColumns;
