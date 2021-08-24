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
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const themes = {
  light: "/style/antd.css",
  dark: "/style/antd.dark.css",
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const loadWines = useStore((state) => state.loadWines);
  const [theme] = useTheme();
  useEffect(() => {
    loadWines();
  }, [loadWines]);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <ThemeSwitcherProvider defaultTheme={theme} themeMap={themes}>
      <ConfigProvider locale={csCZ}>
        <Component {...pageProps} />
      </ConfigProvider>
    </ThemeSwitcherProvider>
  );
}

export default MyApp;
