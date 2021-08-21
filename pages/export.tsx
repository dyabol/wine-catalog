import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, List } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import shallow from "zustand/shallow";
import Page from "../components/Page/Page";
import { Wine } from "../components/WineForm/WineForm";
import useStore from "../utils/store";
import { useDrag, useDrop } from "react-dnd";

const VARIETY = "VARIETY";

const Export: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const wines = useStore((state) => state.wines, shallow);
  // const [_, drop] = useDrop(() => ({
  //   accept: VARIETY,
  // }));
  // const [__, drag] = useDrag(() => ({
  //   type: VARIETY,
  // }));

  const getVarieties = useCallback((wines: Wine[]): string[] => {
    const varieties: string[] = [];
    wines.forEach(({ variety }) => {
      if (varieties.indexOf(variety) === -1) {
        varieties.push(variety);
      }
    });
    return varieties.sort((a, b) => a.localeCompare(b));
  }, []);

  return (
    <Page title={t("Export to Excel")}>
      <Card
        title={t("Variety ordering")}
        extra={
          <Button icon={<LeftOutlined />} onClick={() => router.push("/")}>
            {t("Back")}
          </Button>
        }
      >
        {/* <div ref={drop}>
          {getVarieties(wines).map((title, index) => (
            <div key={index} ref={drag}>
              {title}
            </div>
          ))}
        </div> */}
        <List<string>
          bordered
          dataSource={getVarieties(wines)}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </Page>
  );
};

export default Export;
