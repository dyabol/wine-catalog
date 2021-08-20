import { ImportOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { parseWines } from "../../utils/json";
import useStore from "../../utils/store";

type Props = {
  disabled?: boolean;
};

const ImportButton: React.FC<Props> = ({ disabled }) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const setWines = useStore((state) => state.setWines);

  const upload = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const fileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function ({ target }) {
          const result = target?.result;
          if (typeof result === "string") {
            try {
              setWines(parseWines(result));
              message.success(t("File was imported."));
            } catch (err) {
              message.error(t("Error loading file."));
              console.error(err);
            }
          }
        };
        reader.onerror = function () {
          message.error(t("Error loading file."));
        };
      }
    },
    [t, setWines]
  );

  return (
    <Button onClick={upload} icon={<ImportOutlined />} disabled={disabled}>
      {t("Import")}
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={fileChange}
        accept="application/JSON"
      />
    </Button>
  );
};

export default ImportButton;
