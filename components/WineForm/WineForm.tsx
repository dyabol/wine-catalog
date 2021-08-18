import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  FormProps,
  Input,
  InputNumber,
  Space,
} from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import PropertiesSelect from "../PropertiesSelect/PropertiesSelect";
import SugarSelect from "../SugarSelect/SugarSelect";
import VarietyField from "../VarietyField/VarietyField";
import { SaveOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

export type Wine = {
  id: number;
  address: string;
  name: string;
  note?: string;
  number_of_bottles: number;
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
  selectedWine?: Wine;
};

const WineForm: React.FC<Props> = ({
  className,
  onFinish,
  onReset,
  nextId,
  selectedWine,
}) => {
  const { t } = useTranslation();
  const formRef = useRef<FormInstance>(null);

  const focusFirstInput = useCallback(() => {
    formRef.current?.getFieldInstance("name").focus?.();
  }, []);

  const onFinishHandler = useCallback(
    (values: Wine) => {
      onFinish?.(values);
      formRef.current?.resetFields();
      focusFirstInput();
    },
    [onFinish, focusFirstInput]
  );

  useEffect(() => {
    formRef.current?.setFieldsValue({ id: nextId });
  }, [nextId]);

  useEffect(() => {
    if (selectedWine) {
      formRef.current?.setFieldsValue(selectedWine);
    } else {
      formRef.current?.resetFields();
      setTimeout(() => {
        formRef.current?.setFieldsValue({ id: nextId });
      }, 100);
    }
  }, [nextId, selectedWine]);

  useEffect(() => {
    focusFirstInput();
  }, [focusFirstInput]);

  const onFinishFailed: FormProps<Wine>["onFinishFailed"] = useCallback(
    (val) => {
      const name = val.errorFields[0].name[0];
      formRef.current?.getFieldInstance(name).focus?.();
    },
    []
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
      onFinish={onFinishHandler}
      onReset={onReset}
    >
      <Form.Item label={t("Record id")} name="id" rules={[{ required: true }]}>
        <Input readOnly={true} bordered={false} />
      </Form.Item>
      <Form.Item
        label={t("Name")}
        name="name"
        rules={[{ required: true, message: t("Name is required.") }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("Address")}
        name="address"
        rules={[{ required: true, message: t("Address is required.") }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("Variety")}
        name="variety"
        rules={[{ required: true, message: t("Variety is required.") }]}
      >
        <VarietyField />
      </Form.Item>
      <Form.Item
        label={t("Year")}
        name="year"
        rules={[{ required: true, message: t("Year is required.") }]}
      >
        <DatePicker picker="year" />
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
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label={t("Sugar content")} name="sugar_content">
        <SugarSelect />
      </Form.Item>
      <Form.Item label={t("Properties")} name="properties">
        <PropertiesSelect />
      </Form.Item>
      <Form.Item label={t("Note")} name="note">
        <Input />
      </Form.Item>
      <Form.Item>
        {selectedWine ? (
          <Space size="small">
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              {t("Save changes")}
            </Button>
            <Button type="default" htmlType="reset" icon={<CloseOutlined />}>
              {t("Discard changes")}
            </Button>
          </Space>
        ) : (
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            {t("Add wine")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default WineForm;
