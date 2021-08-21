import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Menu, message, Modal } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useStore from "../../utils/store";
const { confirm } = Modal;

type Props = {
  disabled?: boolean;
};

const ClearButton: React.FC<Props> = ({ disabled }) => {
  const { t } = useTranslation();
  const clearWines = useStore((state) => state.clearWines);

  const onClear = useCallback(() => {
    clearWines();
    message.success(t("All was cleared."));
  }, [clearWines, t]);

  const onClearHandler = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      okText: t("OK"),
      cancelText: t("Cancel"),
      content: t("clearAllConfirm"),
      onOk: onClear,
    });
  };
  return (
    <Menu.Item
      onClick={onClearHandler}
      icon={<DeleteOutlined />}
      disabled={disabled}
      danger
    >
      {t("Clear all")}
    </Menu.Item>
  );
};

export default ClearButton;
