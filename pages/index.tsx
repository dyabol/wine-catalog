import { Col, Row, Layout } from "antd";
import Card from "antd/lib/card";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Header from "../components/Header/Header";
import WineFormContainer from "../containers/WineFormContainer";
import WineTableContainer from "../containers/WineTableContainer";
import styles from "../styles/Home.module.css";
import "../utils/i18n";

const { Header: AntHeader, Footer, Sider, Content } = Layout;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Katalog</title>
        <meta name="description" content="Katalog" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AntHeader>
          <Header />
        </AntHeader>
        <Content className={styles.content}>
          <Row gutter={[16, 16]}>
            <Col flex={2} className={styles.formCell}>
              <Card className={styles.wineForm}>
                <WineFormContainer />
              </Card>
            </Col>
            <Col flex={4}>
              <Card className={styles.wineTable}>
                <WineTableContainer />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        Made with ❤️ by <a href="https://www.hromek.cz">hromek.cz</a>
      </Footer>
    </>
  );
};

export default Home;
