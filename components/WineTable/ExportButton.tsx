import { ExportOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import moment from "moment";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LOCAL_STORAGE_WINES } from "../../utils/constants";

type Props = {
  disabled?: boolean;
};

const ExportButton: React.FC<Props> = ({ disabled }) => {
  const { t } = useTranslation();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const onExport = useCallback(() => {
    const link = anchorRef.current;
    if (link) {
      const data =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(localStorage.getItem(LOCAL_STORAGE_WINES) ?? "");
      link.setAttribute("href", data);
      link.setAttribute(
        "download",
        `wines_${moment().format("YYYY-MM-DD_HH-mm-ss")}.json`
      );
      link.click();
    }
  }, []);

  return (
    <Menu.Item onClick={onExport} icon={<ExportOutlined />} disabled={disabled}>
      {t("Export")}
      <a ref={anchorRef} style={{ display: "none" }} />
    </Menu.Item>
  );
};

export default ExportButton;
