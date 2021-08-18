import React, { forwardRef, useMemo } from "react";
import { Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { RefSelectProps } from "antd/lib/select";
const { Option } = Select;

type Props<T> = {
  value?: T;
  onChange?: SelectProps<T>["onChange"];
};

const PropertiesSelect = forwardRef<RefSelectProps, Props<string[]>>(
  ({ value, onChange }, ref) => {
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
      <Select ref={ref} mode="tags" value={value} onChange={onChange}>
        {children}
      </Select>
    );
  }
);

PropertiesSelect.displayName = "PropertiesSelect";

export default PropertiesSelect;
