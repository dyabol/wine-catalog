import { ImportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  disabled?: boolean;
};

const ImportButton: React.FC<Props> = ({ disabled }) => {
  const { t } = useTranslation();
  return (
    <Button onClick={undefined} icon={<ImportOutlined />} disabled={disabled}>
      {t("Import")}
    </Button>
  );
};

export default ImportButton;
