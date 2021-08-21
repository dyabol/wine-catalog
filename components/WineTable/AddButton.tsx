import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useStore from "../../utils/store";

const AddButton: React.FC = () => {
  const { t } = useTranslation();
  const setSelectedId = useStore((store) => store.setSelectedId);

  const addRecord = useCallback(() => {
    setSelectedId(undefined);
  }, [setSelectedId]);
  return (
    <Button onClick={addRecord} icon={<PlusOutlined />} type="primary" ghost>
      {t("Add wine")}
    </Button>
  );
};

export default AddButton;
