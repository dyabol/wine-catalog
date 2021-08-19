import { PageHeader } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      title={t("Catalog of wines")}
      extra={[<ThemeSwitcher key={0} />]}
    />
  );
};

export default Header;
