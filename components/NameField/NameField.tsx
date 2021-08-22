import { AutoComplete } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import shallow from "zustand/shallow";
import useStore from "../../utils/store";

type Props<T> = {
  value?: T;
  onChange?: (value?: T) => void;
};

const NameField: React.FC<Props<string>> = ({ value, onChange }) => {
  const names = useStore((state) => {
    const result: string[] = [];
    state.wines.forEach((w) => {
      if (result.indexOf(w.name) === -1) {
        result.push(w.name);
      }
    });
    return result;
  }, shallow);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    setOptions(names.map((n) => ({ value: n })));
  }, [names]);

  const onSearch = useCallback(
    (value: string) => {
      setOptions(
        names.filter((n) => n.startsWith(value)).map((n) => ({ value: n }))
      );
    },
    [setOptions, names]
  );

  return (
    <AutoComplete
      autoFocus={true}
      options={options}
      onSearch={onSearch}
      value={value}
      onChange={onChange}
    />
  );
};

export default NameField;
