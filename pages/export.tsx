import { FileExcelOutlined, LeftOutlined } from "@ant-design/icons";
import { Badge, Button, Card, List, Space } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import shallow from "zustand/shallow";
import Page from "../components/Page/Page";
import { Wine } from "../components/WineForm/WineForm";
import useStore from "../utils/store";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { exportToExcel } from "../utils/export";
import { LOCAL_STORAGE_VARIETY_ORDER } from "../utils/constants";

type Variety = {
  name: string;
  type: "white" | "red";
};

type ItemProps = {
  children: string;
};

type ListProps = {
  dataSource?: string[];
};

const SortableItem = SortableElement(({ children }: ItemProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const varieties: Variety[] = useMemo(() => {
    return require(`../locales/${language}/variety.json`);
  }, [language]);
  const variety = varieties.find((v) => v.name === children);
  if (variety) {
    return (
      <Badge.Ribbon
        text={variety.type === "red" ? t("Red") : t("White")}
        color={variety.type === "red" ? "red" : "lime"}
      >
        <List.Item>{children}</List.Item>
      </Badge.Ribbon>
    );
  }
  return <List.Item>{children}</List.Item>;
});

const SortableList = SortableContainer(({ dataSource }: ListProps) => (
  <List bordered>
    {dataSource?.map((title, index) => (
      <SortableItem key={`item-${title.replace(/\W/g, "_")}`} index={index}>
        {title}
      </SortableItem>
    ))}
  </List>
));

const Export: NextPage = () => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();
  const router = useRouter();
  const wines = useStore((state) => state.wines, shallow);

  const getVarieties = useCallback((wines: Wine[]): string[] => {
    const varieties: string[] = [];
    wines.forEach(({ variety }) => {
      if (varieties.indexOf(variety) === -1) {
        varieties.push(variety);
      }
    });
    return varieties.sort((a, b) => a.localeCompare(b));
  }, []);

  const initialVarieties = useMemo(() => {
    try {
      const va = getVarieties(wines);
      const localData = localStorage.getItem(LOCAL_STORAGE_VARIETY_ORDER);
      if (localData) {
        const parsed: string[] = JSON.parse(localData);
        va.forEach((v) => {
          if (parsed.indexOf(v) === -1) {
            parsed.push(v);
          }
        });
        return parsed.filter((p) => va.indexOf(p) > -1);
      }
      return va;
    } catch (error) {
      return getVarieties(wines);
    }
  }, [getVarieties, wines]);

  const [variaties, setVariaties] = useState(initialVarieties);

  useEffect(() => {
    setVariaties(initialVarieties);
  }, [initialVarieties, setVariaties]);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      console.log("ORDER");
      const ordered = arrayMoveImmutable(variaties, oldIndex, newIndex);
      setVariaties(ordered);
      localStorage.setItem(
        LOCAL_STORAGE_VARIETY_ORDER,
        JSON.stringify(ordered)
      );
    },
    [variaties]
  );

  const onExport = useCallback(() => {
    exportToExcel(variaties, wines);
  }, [variaties, wines]);

  return (
    <Page title={t("Create catalog")}>
      <Card
        title={t("Variety ordering")}
        extra={
          <Space>
            <Button
              icon={<FileExcelOutlined />}
              onClick={onExport}
              type="primary"
            >
              {xs ? t("Export") : t("Export to Excel")}
            </Button>
            <Button icon={<LeftOutlined />} onClick={() => router.push("/")}>
              {t("Back")}
            </Button>
          </Space>
        }
      >
        <SortableList onSortEnd={onSortEnd} dataSource={variaties} />
      </Card>
    </Page>
  );
};

export default Export;
