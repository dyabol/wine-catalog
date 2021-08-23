import React, { useCallback, useEffect, useRef } from "react";
import { Wine } from "../components/WineForm/WineForm";
import WineTable, { WineTableRef } from "../components/WineTable/WineTable";
import useStore from "../utils/store";
import shallow from "zustand/shallow";

type Props = {
  className?: string;
};

const WineTableContainer: React.FC<Props> = ({ className }) => {
  const ref = useRef<WineTableRef>(null);
  const [wines, inEditId] = useStore(
    (state) => [state.wines, state.inEditId],
    shallow
  );
  const [selectedId, setSelectedId] = useStore(
    (state) => [state.selectedId, state.setSelectedId],
    shallow
  );

  const onRowSelect = useCallback(
    (wine: Wine) => {
      setSelectedId(wine.id);
    },
    [setSelectedId]
  );

  useEffect(() => {
    let rendered = false;
    const usnsub = useStore.subscribe<number>(
      (length, prevLength) => {
        if (rendered && length > prevLength) {
          ref.current?.goToEnd();
        }
        rendered = true;
      },
      (state) => state.wines.length
    );
    return usnsub;
  }, []);

  return (
    <WineTable
      ref={ref}
      disabled={
        inEditId !== undefined ||
        (inEditId === undefined && selectedId === undefined)
      }
      className={className}
      dataSource={wines.sort((a, b) => a.id - b.id)}
      onRowSelect={onRowSelect}
      selectedId={selectedId}
    />
  );
};

export default WineTableContainer;
