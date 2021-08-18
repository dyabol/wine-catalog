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
  const [selectedId, setSelectedId] = useStore(
    (state) => [state.selectedId, state.setSelectedId],
    shallow
  );

  const biggest = useMemo(() => {
    const b = Math.max(...wines.map((w) => w.id));
    return b !== -Infinity ? b + 1 : 1;
  }, [wines]);

  const [id, setId] = useState(biggest);

  const onFinish = useCallback(
    (wine) => {
      if (selectedId === undefined) {
        addWine(wine);
        setId((id) => id + 1);
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
