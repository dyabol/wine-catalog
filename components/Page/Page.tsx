import { Layout } from "antd";
import Head from "next/head";
import React from "react";
import Header from "../Header/Header";
import styles from "./Page.module.css";

const { Header: AntHeader, Footer, Content } = Layout;

type Props = {
  title: string;
};

const Page: React.FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
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
      <Content className={styles.content}>{children}</Content>
    </Layout>
    <Footer className={styles.footer}>
      Made with ❤️ by <a href="https://www.hromek.cz">hromek.cz</a>
    </Footer>
  </>
);

export default Page;
