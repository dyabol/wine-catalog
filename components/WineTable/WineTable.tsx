import { Table } from "antd";
import React, { useCallback } from "react";
import { Wine } from "../WineForm/WineForm";
import useWineColumns from "./useWineColumns";
import style from "./WineTable.module.css";

type Props = {
  className?: string;
  dataSource?: Wine[];
  selectedId?: number;
  onRowSelect?: (wine: Wine) => void;
  onDelete?: (wine: Wine) => void;
};

const WineTable: React.FC<Props> = ({
  className,
  dataSource,
  selectedId,
  onRowSelect,
  onDelete,
}) => {
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
      return selectedId === record.id ? style.selected : "";
    },
    [selectedId]
  );

  return (
    <Table
      rowClassName={rowClassName}
      dataSource={dataSource}
      columns={columns}
      className={className}
      onRow={(record) => ({
        onClick: onRowClick(record),
      })}
    />
  );
};

export default WineTable;
