import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table/Table";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Wine } from "../WineForm/WineForm";

type Props = {
  onDelete?: (wine: Wine) => void;
  disableActions?: boolean;
};

const useWineColumns = ({ onDelete, disableActions }: Props) => {
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
      {
        title: t("Action"),
        key: "action",
        align: "center",
        // eslint-disable-next-line react/display-name
        render: (record: Wine) => (
          <Button
            disabled={disableActions}
            type="link"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => onDelete?.(record)}
          />
        ),
      },
    ],
    [onDelete, t]
  );

  return columns;
};

export default useWineColumns;
