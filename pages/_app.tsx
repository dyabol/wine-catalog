import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import csCZ from "antd/lib/locale/cs_CZ";
import { ConfigProvider } from "antd";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import useTheme from "../utils/useTheme";

const themes = {
  light: "/style/antd.css",
  dark: "/style/antd.dark.css",
};

function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useTheme();
  return (
    <ThemeSwitcherProvider defaultTheme={theme} themeMap={themes}>
      <ConfigProvider locale={csCZ}>
        <Component {...pageProps} />
      </ConfigProvider>
    </ThemeSwitcherProvider>
  );
}

export default MyApp;
