import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "../../utils/responsiveService";
import { Wine } from "../WineForm/WineForm";

type Props = {
  onDelete?: (wine: Wine) => void;
  disableActions?: boolean;
};

type Column = ColumnType<Wine> & {
  hidden?: boolean;
};

const useWineColumns = ({ onDelete, disableActions }: Props): Column[] => {
  const { t } = useTranslation();
  const size = useResponsive();

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
        hidden: size === "s",
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
        hidden: size === "s",
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
    [disableActions, onDelete, size, t]
  );

  return columns;
};

export default useWineColumns;
