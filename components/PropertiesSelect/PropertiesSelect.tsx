import React, { useMemo } from "react";
import { Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

type Props<T> = {
  value?: T;
  onChange?: SelectProps<T>["onChange"];
};

const PropertiesSelect: React.FC<Props<string[]>> = ({ value, onChange }) => {
  const {
    i18n: { language },
  } = useTranslation();

  const propertiesOptions: string[] = useMemo(() => {
    return require(`../../locales/${language}/properties.json`);
  }, [language]);

  const children: JSX.Element[] = propertiesOptions.map((label, i) => (
    <Option key={i} value={label}>
      {label}
    </Option>
  ));

  return (
    <Select mode="tags" value={value} onChange={onChange}>
      {children}
    </Select>
  );
};

export default PropertiesSelect;
