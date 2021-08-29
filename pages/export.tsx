import { FileExcelOutlined, LeftOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Empty, Input, List, Row, Space } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import shallow from "zustand/shallow";
import Page from "../components/Page/Page";
import { Wine } from "../components/WineForm/WineForm";
import useStore from "../utils/store";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { exportToExcel } from "../utils/export";
import { LOCAL_STORAGE_VARIETY_ORDER, PROPS_ALIASES } from "../utils/constants";

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
  const aliasesRef = useRef<Record<string, Input | null>>({});
  const [defaultValues, setDefaultValues] = useState<Record<string, string>>();

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

  useEffect(() => {
    const localData = localStorage.getItem(PROPS_ALIASES);
    if (localData) {
      try {
        setDefaultValues(JSON.parse(localData));
      } catch (error) {
        setDefaultValues({});
      }
    } else {
      setDefaultValues({});
    }
  }, []);

  const [variaties, setVariaties] = useState(initialVarieties);

  useEffect(() => {
    setVariaties(initialVarieties);
  }, [initialVarieties, setVariaties]);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const ordered = arrayMoveImmutable(variaties, oldIndex, newIndex);
      setVariaties(ordered);
      localStorage.setItem(
        LOCAL_STORAGE_VARIETY_ORDER,
        JSON.stringify(ordered)
      );
    },
    [variaties]
  );

  const getAliases = () => {
    const result: Record<string, string> = {};
    Object.keys(aliasesRef.current).map((key) => {
      const value = aliasesRef.current[key]?.input.value;
      if (value) {
        result[key] = value;
      }
    });
    return result;
  };

  const saveAliases = () => {
    localStorage.setItem(PROPS_ALIASES, JSON.stringify(getAliases()));
  };

  const onExport = useCallback(() => {
    const aliases = getAliases();
    exportToExcel(variaties, wines, aliases);
  }, [variaties, wines]);

  const getProperties = (wines: Wine[]): string[] => {
    const props: string[] = [];
    wines.forEach((w) => {
      w.properties?.forEach((p) => {
        if (props.indexOf(p) === -1) {
          props.push(p);
        }
      });
    });
    return props;
  };

  const wineProps = getProperties(wines);
  return (
    <Page title={t("Create catalog")}>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: "right" }}>
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
        </Col>
        <Col sm={12} xs={24}>
          <Card title={t("Variety ordering")}>
            {variaties.length > 0 ? (
              <SortableList onSortEnd={onSortEnd} dataSource={variaties} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Card>
        </Col>
        <Col sm={12} xs={24}>
          <Card title={t("Properties aliases")}>
            {defaultValues &&
              (wineProps.length > 0 ? (
                <Space direction="vertical" style={{ width: "100%" }}>
                  {wineProps.map((p, i) => (
                    <Input
                      defaultValue={defaultValues[p]}
                      name={p}
                      addonBefore={p}
                      key={i}
                      placeholder={p}
                      ref={(ref) => (aliasesRef.current[p] = ref)}
                      onChange={saveAliases}
                    />
                  ))}
                </Space>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ))}
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Export;
