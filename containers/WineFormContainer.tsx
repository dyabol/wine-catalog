import React, { useCallback, useState } from "react";
import WineForm from "../components/WineForm/WineForm";
import useStore from "../utils/store";

type Props = {
  className?: string;
};

const WineFormContainer: React.FC<Props> = ({ className }) => {
  const addWine = useStore((state) => state.addWine);
  const [id, setId] = useState(1);
  const onFinish = useCallback(
    (wine) => {
      addWine(wine);
      setId((id) => id + 1);
    },
    [addWine]
  );

  return <WineForm onFinish={onFinish} className={className} nextId={id} />;
};

export default WineFormContainer;
