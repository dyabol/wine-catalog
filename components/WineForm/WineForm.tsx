import {
  Card,
  DatePicker,
  Form,
  FormInstance,
  FormProps,
  Input,
  InputNumber,
  Space,
} from "antd";
import moment from "moment";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import PropertiesSelect from "../PropertiesSelect/PropertiesSelect";
import SugarSelect from "../SugarSelect/SugarSelect";
import VarietyField from "../VarietyField/VarietyField";
import {
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import ReadOnlyField from "../ReadOnlyField";
import FormToolbar from "../FormToolbar/FormToolbar";
import ResponsiveButton from "../ResponsiveButton/ResponsiveButton";
import NameField from "../NameField/NameField";
import AddressField from "../AddressField/AddressField";
import styles from "./WineForm.module.css";

export type Wine = {
  id: number;
  address: string;
  name: string;
  note?: string;
  number_of_bottles: number;
  points: number;
  properties?: string[];
  sugar_content?: string;
  variety: string;
  year: moment.Moment;
};

type Props = {
  className?: string;
  onFinish?: (values: Wine) => void;
  onReset?: () => void;
  nextId: number;
  selectedId?: number;
  getWine?: (id: number) => Wine | undefined;
  readOnly?: boolean;
  empty?: boolean;
  scored?: boolean;
};

export type WineFormRef = {
  resetForm: () => void;
};

const WineForm = forwardRef<WineFormRef, Props>(
  (
    {
      className,
      onFinish,
      onReset,
      nextId,
      selectedId,
      getWine,
      readOnly,
      empty,
      scored,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const formRef = useRef<FormInstance>(null);

    const focusFirstInput = useCallback(() => {
      formRef.current?.getFieldInstance("name")?.focus?.();
    }, []);

    const resetForm = useCallback(() => {
      if (selectedId === undefined) {
        formRef.current?.resetFields();
        focusFirstInput();
      }
    }, [selectedId, focusFirstInput]);

    useImperativeHandle(
      ref,
      () => ({
        resetForm,
      }),
      [resetForm]
    );

    useEffect(() => {
      formRef.current?.resetFields();
      setTimeout(() => {
        if (selectedId !== undefined) {
          formRef.current?.setFieldsValue(getWine?.(selectedId));
        } else {
          formRef.current?.setFieldsValue({ id: nextId });
        }
      }, 50);
    }, [getWine, nextId, selectedId]);

    useEffect(() => {
      focusFirstInput();
    }, [focusFirstInput]);

    const onFinishFailed: FormProps<Wine>["onFinishFailed"] = useCallback(
      (val) => {
        console.error(val);
        const name = val.errorFields[0].name[0];
        formRef.current?.getFieldInstance(name)?.focus?.();
      },
      []
    );

    const toolbar = (
      <Space size="small" style={{ justifyContent: "flex-end", width: "100%" }}>
        {selectedId !== undefined ? (
          <>
            <ResponsiveButton
              responsive={false}
              type="default"
              htmlType="button"
              icon={<CloseOutlined />}
              onClick={onReset}
            >
              {t("Discard")}
            </ResponsiveButton>
            <ResponsiveButton
              responsive={false}
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              {t("Save")}
            </ResponsiveButton>
          </>
        ) : (
          <>
            {!empty && (
              <ResponsiveButton
                responsive={false}
                type="default"
                htmlType="button"
                icon={<CloseOutlined />}
                onClick={onReset}
              >
                {t("Cancel")}
              </ResponsiveButton>
            )}
            <ResponsiveButton
              responsive={false}
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
            >
              {t("Add")}
            </ResponsiveButton>
          </>
        )}
      </Space>
    );

    return (
      <Form
        ref={formRef}
        className={className}
        name="basic"
        layout="vertical"
        initialValues={{
          year: moment().add(-1, "years"),
          number_of_bottles: 1,
        }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
        <Card
          title={`Vzorek #${selectedId ?? nextId}`}
          extra={
            <>
              <FormToolbar />
              {/* {toolbar} */}
            </>
          }
        >
          <Form.Item
            hidden
            label={t("Record id")}
            name="id"
            rules={[{ required: true }]}
          >
            <ReadOnlyField />
          </Form.Item>
          <Form.Item
            label={t("Name")}
            name="name"
            tooltip={{
              title: t("The name of the winery or the name of the winemaker."),
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: t("Name is required.") }]}
          >
            {readOnly ? <ReadOnlyField /> : <NameField />}
          </Form.Item>
          <Form.Item
            label={t("Address")}
            name="address"
            rules={[{ required: true, message: t("Address is required.") }]}
          >
            {readOnly ? <ReadOnlyField /> : <AddressField />}
          </Form.Item>
          <Form.Item
            label={t("Variety")}
            name="variety"
            rules={[{ required: true, message: t("Variety is required.") }]}
          >
            {readOnly ? <ReadOnlyField /> : <VarietyField />}
          </Form.Item>
          <Form.Item
            label={t("Year")}
            name="year"
            rules={[{ required: true, message: t("Year is required.") }]}
          >
            {readOnly ? (
              <ReadOnlyField dateFormat="YYYY" />
            ) : (
              <DatePicker
                picker="year"
                disabledDate={(d) => d.isAfter()}
                allowClear={false}
              />
            )}
          </Form.Item>
          <Form.Item
            label={t("Number of bottles")}
            name="number_of_bottles"
            rules={[
              { required: true, message: t("Number of bottles is required.") },
              {
                type: "number",
                min: 1,
                message: t("The minimum number of bottles is 1."),
              },
            ]}
          >
            {readOnly ? <ReadOnlyField /> : <InputNumber min={1} />}
          </Form.Item>
          {scored && (
            <Form.Item
              label={t("Points")}
              name="points"
              rules={[
                { required: true, message: t("Number of points is required.") },
                {
                  type: "number",
                  min: 1,
                  message: t("The minimum number of points is 0."),
                },
              ]}
            >
              {readOnly ? <ReadOnlyField /> : <InputNumber min={1} />}
            </Form.Item>
          )}
          <Form.Item label={t("Sugar content")} name="sugar_content">
            {readOnly ? <ReadOnlyField /> : <SugarSelect />}
          </Form.Item>
          <Form.Item label={t("Properties")} name="properties">
            {readOnly ? <ReadOnlyField /> : <PropertiesSelect />}
          </Form.Item>
          <Form.Item label={t("Note")} name="note">
            {readOnly ? <ReadOnlyField /> : <Input />}
          </Form.Item>
          {!readOnly && <div className={styles.footer}>{toolbar}</div>}
        </Card>
      </Form>
    );
  }
);

WineForm.displayName = "WineForm";

export default WineForm;
