import React, { useCallback, useEffect } from "react";
import { Wine } from "../components/WineForm/WineForm";
import WineTable from "../components/WineTable/WineTable";
import useStore from "../utils/store";
import shallow from "zustand/shallow";

type Props = {
  className?: string;
};

const WineTableContainer: React.FC<Props> = ({ className }) => {
  const [wines, loadWines, inEditId] = useStore(
    (state) => [state.wines, state.loadWines, state.inEditId],
    shallow
  );
  const [selectedId, setSelectedId] = useStore(
    (state) => [state.selectedId, state.setSelectedId],
    shallow
  );

  useEffect(() => {
    loadWines();
  }, [loadWines]);

  const onRowSelect = useCallback(
    (wine: Wine) => {
      setSelectedId(wine.id);
    },
    [setSelectedId]
  );

  return (
    <WineTable
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
