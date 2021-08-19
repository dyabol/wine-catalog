import React, { useCallback, useEffect } from "react";
import { Wine } from "../components/WineForm/WineForm";
import WineTable from "../components/WineTable/WineTable";
import useStore from "../utils/store";
import shallow from "zustand/shallow";

type Props = {
  className?: string;
};

const WineTableContainer: React.FC<Props> = ({ className }) => {
  const [wines, deleteWine, loadWines] = useStore(
    (state) => [state.wines, state.deleteWine, state.loadWines],
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
  return (
    <WineTable
      className={className}
      dataSource={wines.sort((a, b) => a.id - b.id)}
      onRowSelect={onRowSelect}
      onDelete={onDelete}
      selectedId={selectedId}
    />
  );
};

export default WineTableContainer;
