import { AutoComplete } from "antd";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Props<T> = {
  value?: T;
  onChange?: (value?: T) => void;
};

type Variety = {
  name: string;
  type: "white" | "red";
};

const VarietyField: React.FC<Props<string>> = ({ onChange, value }) => {
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
                .indexOf(searchText.toLocaleLowerCase()) !== -1
          )
    );
  };

  return (
    <AutoComplete
      onSearch={onSearch}
      options={options.map((v) => ({ value: v.name, label: v.name }))}
      onChange={onChange}
      value={value}
    />
  );
};

export default VarietyField;
