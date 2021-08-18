import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import WineFormContainer from "../containers/WineFormContainer";
import WineTableContainer from "../containers/WineTableContainer";
import styles from "../styles/Home.module.css";
import "../utils/i18n";

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <Head>
        <title>Katalog</title>
        <meta name="description" content="Katalog" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{t("Catalog of wines")}</h1>
        <div className={styles.content}>
          <WineFormContainer className={styles.wineForm} />
          <WineTableContainer className={styles.wineTable} />
        </div>
      </main>
    </div>
  );
};

export default Home;
