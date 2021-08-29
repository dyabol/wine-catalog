import { Col, PageHeader, Row } from "antd";
import Card from "antd/lib/card";
import type { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import Page from "../components/Page/Page";
import Toolbar from "../components/Toolbar/Toolbar";
import WineFormContainer from "../containers/WineFormContainer";
import WineTableContainer from "../containers/WineTableContainer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("Catalog of wines")}>
      <PageHeader title={t("Wine management")} extra={<Toolbar />} />
      <Row gutter={[16, 16]}>
        <Col flex={3} className={styles.formWrapper}>
          <WineFormContainer />
        </Col>
        <Col flex={4}>
          <Card className={styles.wineTable}>
            <WineTableContainer />
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Home;
