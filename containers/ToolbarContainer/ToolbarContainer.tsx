import { BookOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Menu, Space } from "antd";
import React from "react";
import ClearButton from "../../components/WineTable/ClearButton";
import ExportButton from "../../components/WineTable/ExportButton";
import ImportButton from "../../components/WineTable/ImportButton";
import shallow from "zustand/shallow";
import useStore from "../../utils/store";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/dist/client/router";

const ToolbarContainer: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [scored, onScoredChange] = useStore(({ scored, toggleScored }) => [
    scored,
    toggleScored,
  ]);

  const [disabled, empty] = useStore(
    (state) => [
      state.inEditId !== undefined ||
        (state.inEditId === undefined && state.selectedId === undefined),
      state.wines.length === 0,
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

  if (!disabled) {
    return (
      <Space
        size="small"
        wrap
        style={{ width: "100%", justifyContent: "flex-end" }}
      >
        <Checkbox onChange={onScoredChange} checked={scored}>
          {t("Scored")}
        </Checkbox>
        <Dropdown overlay={menu}>
          <Button>
            {t("Actions")} <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          type="primary"
          icon={<BookOutlined />}
          onClick={() => {
            router.push("/export");
          }}
        >
          {t("Create catalog")}
        </Button>
      </Space>
    );
  }
  return (
    <Space size="small" wrap style={{ height: "32px" }}>
      <Checkbox onChange={onScoredChange} checked={scored}>
        {t("Scored")}
      </Checkbox>
    </Space>
  );
};

export default ToolbarContainer;
