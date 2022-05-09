import React, { useCallback, useRef, useState } from "react";
import WineForm, {
  Wine,
  WineFormRef,
} from "../../components/WineForm/WineForm";
import useStore from "../../utils/store";
import shallow from "zustand/shallow";
import { message, Modal, Table, Tag } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import ReadOnlyField from "../../components/ReadOnlyField";
import { ColumnType } from "antd/lib/table";
import moment from "moment";
import styles from "./WineFormContainer.module.css";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

type Props = {
  className?: string;
};

const columns: ColumnType<Wine>[] = [
  {
    title: i18n.t("Record id"),
    dataIndex: "id",
  },
  {
    title: i18n.t("Name"),
    dataIndex: "name",
  },
  {
    title: i18n.t("Address"),
    dataIndex: "address",
  },
  {
    title: i18n.t("Variety"),
    dataIndex: "variety",
  },
  {
    title: i18n.t("Year"),
    dataIndex: "year",
    width: "100px",
    // eslint-disable-next-line react/display-name
    render: (year: moment.Moment | undefined) => (
      <ReadOnlyField value={year} dateFormat="YYYY" />
    ),
  },
  {
    title: i18n.t("Number of bottles"),
    dataIndex: "number_of_bottles",
  },
  {
    title: i18n.t("Points"),
    dataIndex: "points",
  },
  {
    title: i18n.t("Sugar content"),
    dataIndex: "sugar_content",
  },
  {
    title: i18n.t("Properties"),
    dataIndex: "properties",
    render: (properties: string[] | undefined) =>
      properties?.map((p) => <Tag key={p}>{p}</Tag>),
  },
  {
    title: i18n.t("Note"),
    dataIndex: "note",
  },
];

const WineFormContainer: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const formRef = useRef<WineFormRef>(null);
  const [duplicate, setDuplicate] = useState<Wine | null>(null);
  const [addWine, updateWine] = useStore(
    (state) => [state.addWine, state.updateWine],
    shallow
  );
  const [selectedId, setInEditId, cancelAdding] = useStore(
    (state) => [state.selectedId, state.setInEditId, state.cancelAdding],
    shallow
  );

  const scored = useStore((state) => state.scored);

  const empty = useStore((state) => state.wines.length === 0);

  const id = useStore((state) => state.nextId);
  const inEditId = useStore((state) => state.inEditId);

  const getDuplicites = useCallback(
    (wine: Wine) =>
      useStore
        .getState()
        .wines.filter(
          ({ name, year, variety, address }) =>
            name === wine.name &&
            variety === wine.variety &&
            address === wine.address &&
            year.year() === wine.year.year()
        ),
    []
  );

  const onFinish = useCallback(
    (wine: Wine) => {
      if (selectedId === undefined && inEditId === undefined) {
        if (getDuplicites(wine).length > 0) {
          setDuplicate(wine);
        } else {
          addWine(wine);
          message.success(t("Record was added."));
          formRef.current?.resetForm();
        }
      } else {
        updateWine(wine);
        message.success(t("Record was updated."));
      }
    },
    [selectedId, inEditId, getDuplicites, addWine, t, updateWine]
  );

  const onReset = useCallback(() => {
    if (selectedId === undefined) {
      cancelAdding();
    } else {
      setInEditId(undefined);
    }
  }, [selectedId, cancelAdding, setInEditId]);

  const getWine = useCallback(
    (id: number) => useStore.getState().wines.find((wine) => id === wine.id),
    []
  );

  const saveDuplicate = () => {
    if (duplicate) {
      addWine(duplicate);
      message.success(t("Record was added."));
      setDuplicate(null);
      formRef.current?.resetForm();
    }
  };

  const canceDumplicate = () => {
    setDuplicate(null);
  };

  return (
    <>
      <WineForm
        ref={formRef}
        scored={scored}
        onReset={onReset}
        onFinish={onFinish}
        className={className}
        nextId={id}
        getWine={getWine}
        selectedId={selectedId}
        readOnly={inEditId === undefined && selectedId !== undefined}
        empty={empty}
      />
      {duplicate && (
        <Modal
          title={t("Potential duplications")}
          visible={true}
          onOk={saveDuplicate}
          onCancel={canceDumplicate}
          okText={t("Add anyway")}
          okButtonProps={{ icon: <PlusOutlined /> }}
          cancelButtonProps={{ icon: <CloseOutlined /> }}
          cancelText={t("Cancel")}
          width={1000}
        >
          <div style={{ width: "100%", overflow: "auto" }}>
            <div className={styles.highlited_text}>{t("Přidávaný záznam")}</div>
            <Table
              columns={columns.filter(
                (c) =>
                  c.dataIndex !== "points" ||
                  (c.dataIndex === "points" && scored)
              )}
              rowClassName={(record) =>
                record.id == duplicate.id ? styles.highlited : ""
              }
              dataSource={[duplicate, ...getDuplicites(duplicate)]}
              size="small"
              pagination={false}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default WineFormContainer;
