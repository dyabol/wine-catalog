import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, List } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import shallow from "zustand/shallow";
import Page from "../components/Page/Page";
import { Wine } from "../components/WineForm/WineForm";
import useStore from "../utils/store";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

type ItemProps = {
  children: string;
};

type ListProps = {
  dataSource?: string[];
};

const SortableItem = SortableElement(({ children }: ItemProps) => (
  <List.Item>{children}</List.Item>
));

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

  const [variaties, setVariaties] = useState(getVarieties(wines));

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      setVariaties(arrayMoveImmutable(variaties, oldIndex, newIndex));
    },
    [variaties]
  );

  return (
    <Page title={t("Create catalog")}>
      <Card
        title={t("Variety ordering")}
        extra={
          <Button icon={<LeftOutlined />} onClick={() => router.push("/")}>
            {t("Back")}
          </Button>
        }
      >
        <SortableList onSortEnd={onSortEnd} dataSource={variaties} />
      </Card>
    </Page>
  );
};

export default Export;
