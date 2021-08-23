import { Table } from "antd";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
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

export type WineTableRef = {
  goToEnd: () => void;
};

const WineTable = forwardRef<WineTableRef, Props>(
  ({ className, dataSource, selectedId, onRowSelect, disabled }, ref) => {
    const pageSize = 10;
    const columns = useWineColumns();
    const [current, setCurrent] = useState(1);

    const goToEnd = useCallback(() => {
      setCurrent(Math.ceil(dataSource?.length ?? 0 / pageSize));
    }, [setCurrent, pageSize, dataSource]);

    useImperativeHandle(ref, () => ({
      goToEnd,
    }));

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
          pagination={{
            current,
            onChange: setCurrent,
          }}
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
  }
);

WineTable.displayName = "WineTable";

export default WineTable;
