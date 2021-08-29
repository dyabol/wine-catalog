import { Button, Result } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Page from "../components/Page/Page";

const Custom404: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Page title={t("Page not found")}>
      <Result
        status="404"
        title="404"
        subTitle={t("Sorry, the page you visited does not exist.")}
        extra={
          <Button type="primary" onClick={() => router.push("/")}>
            {t("Back Home")}
          </Button>
        }
      />
    </Page>
  );
};

export default Custom404;
