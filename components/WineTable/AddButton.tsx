import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useStore from "../../utils/store";
import ResponsiveButton from "../ResponsiveButton/ResponsiveButton";

const AddButton: React.FC = () => {
  const { t } = useTranslation();
  const setSelectedId = useStore((store) => store.setSelectedId);

  const addRecord = useCallback(() => {
    setSelectedId(undefined);
  }, [setSelectedId]);
  return (
    <ResponsiveButton
      onClick={addRecord}
      icon={<PlusOutlined />}
      type="primary"
      ghost
    >
      {t("Add")}
    </ResponsiveButton>
  );
};

export default AddButton;
