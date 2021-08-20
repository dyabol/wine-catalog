import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Grid } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Wine } from "../WineForm/WineForm";

const { useBreakpoint } = Grid;

type Props = {
  onDelete?: (wine: Wine) => void;
  disableActions?: boolean;
};

type Column = ColumnType<Wine> & {
  hidden?: boolean;
};

const useWineColumns = ({ onDelete, disableActions }: Props): Column[] => {
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
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(record);
            }}
          />
        ),
      },
    ],
    [sm, disableActions, onDelete, t]
  );

  return columns;
};

export default useWineColumns;
