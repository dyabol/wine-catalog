import React, { useCallback, useMemo, useState } from "react";
import WineForm from "../components/WineForm/WineForm";
import useStore from "../utils/store";
import shallow from "zustand/shallow";

type Props = {
  className?: string;
};

const WineFormContainer: React.FC<Props> = ({ className }) => {
  const [wines, addWine, updateWine] = useStore(
    (state) => [state.wines, state.addWine, state.updateWine],
    shallow
  );
  const [selectedId, setSelectedId, id] = useStore(
    (state) => [state.selectedId, state.setSelectedId, state.nextId],
    shallow
  );

  const onFinish = useCallback(
    (wine) => {
      if (selectedId === undefined) {
        addWine(wine);
      } else {
        updateWine(wine);
        setSelectedId(undefined);
      }
    },
    [addWine, selectedId, setSelectedId, updateWine]
  );

  const onReset = useCallback(() => {
    setSelectedId(undefined);
  }, [setSelectedId]);

  const selectedWine = wines.find((wine) => selectedId === wine.id);

  return (
    <WineForm
      onReset={onReset}
      onFinish={onFinish}
      className={className}
      nextId={id}
      selectedWine={selectedWine}
    />
  );
};

export default WineFormContainer;
