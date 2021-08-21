import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import csCZ from "antd/lib/locale/cs_CZ";
import { ConfigProvider } from "antd";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import useTheme from "../utils/useTheme";
import "../utils/i18n";
import useStore from "../utils/store";

const themes = {
  light: "/style/antd.css",
  dark: "/style/antd.dark.css",
};

function MyApp({ Component, pageProps }: AppProps) {
  const loadWines = useStore((state) => state.loadWines);
  const [theme] = useTheme();
  useEffect(() => {
    loadWines();
  }, [loadWines]);
  return (
    <ThemeSwitcherProvider defaultTheme={theme} themeMap={themes}>
      <ConfigProvider locale={csCZ}>
        <Component {...pageProps} />
      </ConfigProvider>
    </ThemeSwitcherProvider>
  );
}

export default MyApp;
