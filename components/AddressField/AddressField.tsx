import { AutoComplete } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import shallow from "zustand/shallow";
import useStore from "../../utils/store";

type Props<T> = {
  value?: T;
  onChange?: (value?: T) => void;
};

const AddressField: React.FC<Props<string>> = ({ value, onChange }) => {
  const addresses = useStore((state) => {
    const result: string[] = [];
    state.wines.forEach((w) => {
      if (result.indexOf(w.address) === -1) {
        result.push(w.address);
      }
    });
    return result;
  }, shallow);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    setOptions(addresses.map((n) => ({ value: n })));
  }, [addresses]);

  const onSearch = useCallback(
    (value: string) => {
      setOptions(
        addresses.filter((n) => n.startsWith(value)).map((n) => ({ value: n }))
      );
    },
    [setOptions, addresses]
  );

  return (
    <AutoComplete
      options={options}
      onSearch={onSearch}
      value={value}
      onChange={onChange}
    />
  );
};

export default AddressField;
