import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Space, Table, Modal } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Wine } from "../WineForm/WineForm";
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
  const columns = useWineColumns({
    onDelete,
    disableActions: selectedId !== undefined,
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
      <Space size="small">
        <Button onClick={onClearHandler} icon={<DeleteOutlined />} danger>
          {t("Clear all")}
        </Button>
      </Space>
    </>
  );
};

export default WineTable;
