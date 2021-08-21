import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Space } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import shallow from "zustand/shallow";
import useStore from "../../utils/store";
import ResponsiveButton from "../ResponsiveButton/ResponsiveButton";

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

  if (selectedId !== undefined && inEditId === undefined) {
    return (
      <Space>
        <ResponsiveButton
          icon={<DeleteOutlined />}
          danger
          onClick={onDelete}
          onlySmall={true}
        >
          {t("Delete")}
        </ResponsiveButton>
        <ResponsiveButton icon={<EditOutlined />} onClick={onUpdate}>
          {t("Edit")}
        </ResponsiveButton>
      </Space>
    );
  }
  return null;
};

export default FormToolbar;
