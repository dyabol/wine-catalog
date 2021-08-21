import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import React from "react";
import ClearButton from "../WineTable/ClearButton";
import ExportButton from "../WineTable/ExportButton";
import ImportButton from "../WineTable/ImportButton";
import shallow from "zustand/shallow";
import useStore from "../../utils/store";
import AddButton from "../WineTable/AddButton";
import { useTranslation } from "react-i18next";

const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const [disabled, empty, selected] = useStore(
    (state) => [
      state.inEditId !== undefined,
      state.wines.length === 0,
      state.selectedId !== undefined,
    ],
    shallow
  );

  const menu = (
    <Menu>
      <ExportButton key="1" disabled={disabled || empty} />
      <ImportButton key="2" disabled={disabled} />
      <ClearButton key="3" disabled={disabled || empty} />
    </Menu>
  );

  return (
    <Space size="small" wrap>
      {selected && !disabled && <AddButton />}
      <Dropdown overlay={menu}>
        <Button>
          {t("Actions")} <DownOutlined />
        </Button>
      </Dropdown>
    </Space>
  );
};

export default Toolbar;
