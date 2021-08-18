import React, { forwardRef, useMemo } from "react";
import { Select, SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { RefSelectProps } from "antd/lib/select";
const { Option } = Select;

type Props<T> = {
  value?: T;
  onChange?: SelectProps<T>["onChange"];
};

const SugarSelect = forwardRef<RefSelectProps, Props<string>>(
  ({ value, onChange }, ref) => {
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
      <Select ref={ref} allowClear={true} value={value} onChange={onChange}>
        {children}
      </Select>
    );
  }
);

SugarSelect.displayName = "SugarSelect";

export default SugarSelect;
