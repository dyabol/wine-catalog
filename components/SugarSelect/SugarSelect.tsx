import React, { useMemo } from "react";
import { Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

type Props<T> = {
  value?: T;
  onChange?: SelectProps<T>["onChange"];
};

const SugarSelect: React.FC<Props<string>> = ({ value, onChange }) => {
  const {
    i18n: { language },
  } = useTranslation();

  const sugarContentOptions: string[] = useMemo(() => {
    return require(`../../locales/${language}/sugar.json`);
  }, [language]);

  const children: JSX.Element[] = sugarContentOptions.map((label, i) => (
    <Option key={i} value={label}>
      {label}
    </Option>
  ));

  return (
    <Select allowClear={true} value={value} onChange={onChange}>
      {children}
    </Select>
  );
};

export default SugarSelect;
