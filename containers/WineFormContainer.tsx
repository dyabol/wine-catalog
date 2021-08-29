import React, { useCallback } from "react";
import WineForm from "../components/WineForm/WineForm";
import useStore from "../utils/store";
import shallow from "zustand/shallow";
import { message } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

const WineFormContainer: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [addWine, updateWine] = useStore(
    (state) => [state.addWine, state.updateWine],
    shallow
  );
  const [selectedId, setInEditId, cancelAdding] = useStore(
    (state) => [state.selectedId, state.setInEditId, state.cancelAdding],
    shallow
  );

  const empty = useStore((state) => state.wines.length === 0);

  const id = useStore((state) => state.nextId);
  const inEditId = useStore((state) => state.inEditId);

  const onFinish = useCallback(
    (wine) => {
      if (selectedId === undefined && inEditId === undefined) {
        addWine(wine);
        message.success(t("Record was added."));
      } else {
        updateWine(wine);
        message.success(t("Record was updated."));
      }
    },
    [addWine, selectedId, updateWine, t, inEditId]
  );

  const onReset = useCallback(() => {
    if (selectedId === undefined) {
      cancelAdding();
    } else {
      setInEditId(undefined);
    }
  }, [selectedId, cancelAdding, setInEditId]);

  const getWine = useCallback(
    (id: number) => useStore.getState().wines.find((wine) => id === wine.id),
    []
  );

  return (
    <WineForm
      onReset={onReset}
      onFinish={onFinish}
      className={className}
      nextId={id}
      getWine={getWine}
      selectedId={selectedId}
      readOnly={inEditId === undefined && selectedId !== undefined}
      empty={empty}
    />
  );
};

export default WineFormContainer;
