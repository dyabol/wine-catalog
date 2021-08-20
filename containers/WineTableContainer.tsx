import React, { useCallback, useEffect } from "react";
import { Wine } from "../components/WineForm/WineForm";
import WineTable from "../components/WineTable/WineTable";
import useStore from "../utils/store";
import shallow from "zustand/shallow";

type Props = {
  className?: string;
};

const WineTableContainer: React.FC<Props> = ({ className }) => {
  const [wines, deleteWine, loadWines, clearWines] = useStore(
    (state) => [
      state.wines,
      state.deleteWine,
      state.loadWines,
      state.clearWines,
    ],
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
  const onDelete = useCallback(
    (wine: Wine) => {
      deleteWine(wine);
    },
    [deleteWine]
  );

  const onClear = useCallback(clearWines, [clearWines]);
  return (
    <WineTable
      className={className}
      dataSource={wines.sort((a, b) => a.id - b.id)}
      onRowSelect={onRowSelect}
      onDelete={onDelete}
      onClear={onClear}
      selectedId={selectedId}
    />
  );
};

export default WineTableContainer;
