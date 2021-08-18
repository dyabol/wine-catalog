import { AutoComplete } from "antd";
import { RefSelectProps } from "antd/lib/select";
import React, { forwardRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Props<T> = {
  value?: T;
  onChange?: (value?: T) => void;
};

type Variety = {
  name: string;
  type: "white" | "red";
};

const VarietyField = forwardRef<RefSelectProps, Props<string>>(
  ({ onChange, value }, ref) => {
    const {
      i18n: { language },
    } = useTranslation();

    const varieties: Variety[] = useMemo(() => {
      return require(`../../locales/${language}/variety.json`);
    }, [language]);

    const [options, setOptions] = useState<Variety[]>(varieties);

    const onSearch = (searchText: string) => {
      setOptions(
        !searchText
          ? varieties
          : varieties.filter(
              (v) =>
                v.name
                  .toLocaleLowerCase()
                  .split(" ")
                  .filter((w) => w.startsWith(searchText.toLocaleLowerCase()))
                  .length > 0
            )
      );
    };

    return (
      <AutoComplete
        ref={ref}
        onSearch={onSearch}
        options={options
          .map((v) => ({ value: v.name, label: v.name }))
          .sort((a, b) => a.label.localeCompare(b.label))}
        onChange={onChange}
        value={value}
      />
    );
  }
);

VarietyField.displayName = "VarietyField";

export default VarietyField;
