import { Table } from "antd";
import React, { useCallback } from "react";
import { Wine } from "../WineForm/WineForm";
import useWineColumns from "./useWineColumns";
import styles from "./WineTable.module.css";

type Props = {
  className?: string;
  dataSource?: Wine[];
  selectedId?: number;
  onRowSelect?: (wine: Wine) => void;
  disabled?: boolean;
};

const WineTable: React.FC<Props> = ({
  className,
  dataSource,
  selectedId,
  onRowSelect,
  disabled,
}) => {
  const columns = useWineColumns();

  const onRowClick = useCallback(
    (record: Wine) => () => {
      if (!disabled) onRowSelect?.(record);
    },
    [onRowSelect, disabled]
  );

  const rowClassName = useCallback(
    (record: Wine) => {
      return selectedId === record.id ? styles.selected : "";
    },
    [selectedId]
  );

  return (
    <div
      className={`${styles.tableWrapper} ${disabled ? "disable-table" : ""}`}
    >
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
  );
};

export default WineTable;
