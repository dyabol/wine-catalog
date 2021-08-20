import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Modal } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Wine } from "../WineForm/WineForm";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";
import useWineColumns from "./useWineColumns";
import styles from "./WineTable.module.css";

const { confirm } = Modal;

type Props = {
  className?: string;
  dataSource?: Wine[];
  selectedId?: number;
  onRowSelect?: (wine: Wine) => void;
  onDelete?: (wine: Wine) => void;
  onClear?: () => void;
};

const WineTable: React.FC<Props> = ({
  className,
  dataSource,
  selectedId,
  onRowSelect,
  onDelete,
  onClear,
}) => {
  const { t } = useTranslation();
  const inEdit = selectedId !== undefined;
  const columns = useWineColumns({
    onDelete,
    disableActions: inEdit,
  });

  const onRowClick = useCallback(
    (record: Wine) => () => {
      onRowSelect?.(record);
    },
    [onRowSelect]
  );

  const rowClassName = useCallback(
    (record: Wine) => {
      return selectedId === record.id ? styles.selected : "";
    },
    [selectedId]
  );

  const onClearHandler = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      okText: t("OK"),
      cancelText: t("Cancel"),
      content: t("clearAllConfirm"),
      onOk: onClear,
    });
  };

  return (
    <>
      <div className={styles.tableWrapper}>
        <Table
          rowClassName={rowClassName}
          dataSource={dataSource}
          columns={columns.filter((c) => !c.hidden)}
          className={className}
          onRow={(record) => ({
            onClick: onRowClick(record),
          })}
        />
      </div>
      <Space size="small" wrap>
        <ExportButton disabled={inEdit || dataSource?.length === 0} />
        <ImportButton disabled={inEdit} />
        <Button
          onClick={onClearHandler}
          icon={<DeleteOutlined />}
          disabled={inEdit || dataSource?.length === 0}
          danger
        >
          {t("Clear all")}
        </Button>
      </Space>
    </>
  );
};

export default WineTable;
