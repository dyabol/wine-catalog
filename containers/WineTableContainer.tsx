import React, { useCallback } from "react";
import { Wine } from "../components/WineForm/WineForm";
import WineTable from "../components/WineTable/WineTable";
import useStore from "../utils/store";
import shallow from "zustand/shallow";

type Props = {
  className?: string;
};

const WineTableContainer: React.FC<Props> = ({ className }) => {
  const [wines, deleteWine] = useStore(
    (state) => [state.wines, state.deleteWine],
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
  const onDelete = useCallback(
    (wine: Wine) => {
      deleteWine(wine);
    },
    [deleteWine]
  );
  return (
    <WineTable
      className={className}
      dataSource={wines}
      onRowSelect={onRowSelect}
      onDelete={onDelete}
      selectedId={selectedId}
    />
  );
};

export default WineTableContainer;
