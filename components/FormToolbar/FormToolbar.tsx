import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { message, Modal, Space } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import shallow from "zustand/shallow";
import useStore from "../../utils/store";
import ResponsiveButton from "../ResponsiveButton/ResponsiveButton";
import AddButton from "../WineTable/AddButton";

const { confirm } = Modal;

const FormToolbar: React.FC = () => {
  const { t } = useTranslation();
  const [selectedId, inEditId, deleteWine, setInEditId] = useStore(
    (state) => [
      state.selectedId,
      state.inEditId,
      state.deleteWine,
      state.setInEditId,
    ],
    shallow
  );

  const onUpdate = useCallback(() => {
    setInEditId(selectedId);
  }, [selectedId, setInEditId]);

  const onDelete = useCallback(() => {
    if (selectedId !== undefined) {
      deleteWine(selectedId);
      message.success(t("Record was deleted."));
    }
  }, [deleteWine, t, selectedId]);

  const onClearHandler = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      okText: t("OK"),
      cancelText: t("Cancel"),
      content: t("Are you sure you want to permanently delete this record?"),
      onOk: onDelete,
    });
  };

  if (selectedId !== undefined && inEditId === undefined) {
    return (
      <Space>
        <AddButton />
        <ResponsiveButton
          icon={<EditOutlined />}
          onClick={onUpdate}
          onlySmall={true}
        >
          {t("Edit")}
        </ResponsiveButton>
        <ResponsiveButton
          icon={<DeleteOutlined />}
          danger
          onClick={onClearHandler}
          onlySmall={true}
        >
          {t("Delete")}
        </ResponsiveButton>
      </Space>
    );
  }
  return null;
};

export default FormToolbar;
