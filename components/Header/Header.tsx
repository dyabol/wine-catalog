import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Row wrap={false}>
      <Col flex="none">
        <h1 style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          {t("Catalog of wines")} 🍷
        </h1>
      </Col>
      <Col flex="auto" style={{ textAlign: "right" }}>
        <ThemeSwitcher />
      </Col>
    </Row>
  );
};

export default Header;
