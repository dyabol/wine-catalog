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
  const [selectedId, setSelectedId, id] = useStore(
    (state) => [state.selectedId, state.setSelectedId, state.nextId],
    shallow
  );

  const onFinish = useCallback(
    (wine) => {
      if (selectedId === undefined) {
        addWine(wine);
        message.success(t("Record was added."));
      } else {
        updateWine(wine);
        setSelectedId(undefined);
        message.success(t("Record was updated."));
      }
    },
    [addWine, selectedId, setSelectedId, updateWine, t]
  );

  const onReset = useCallback(() => {
    setSelectedId(undefined);
  }, [setSelectedId]);

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
    />
  );
};

export default WineFormContainer;
