import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import csCZ from "antd/lib/locale/cs_CZ";
import { ConfigProvider } from "antd";
import { ResponsiveProvider } from "../utils/responsiveService";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={csCZ}>
      <ResponsiveProvider>
        <Component {...pageProps} />
      </ResponsiveProvider>
    </ConfigProvider>
  );
}
export default MyApp;
