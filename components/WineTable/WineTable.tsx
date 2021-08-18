import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Wine } from "../WineForm/WineForm";

type Props = {
  className?: string;
  dataSource?: any[];
};

const WineTable: React.FC<Props> = ({ className, dataSource }) => {
  const { t } = useTranslation();
  const columns: ColumnsType<Wine> = useMemo(
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
      },
    ],
    [t]
  );
  return (
    <Table dataSource={dataSource} columns={columns} className={className} />
  );
};

export default WineTable;
