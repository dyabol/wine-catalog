import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { Switch } from "antd";
import React, { useCallback } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

const ThemeSwitcher: React.FC = () => {
  const {
    switcher,
    themes: { light, dark },
    currentTheme,
    status,
  } = useThemeSwitcher();

  const changeHandler = useCallback(() => {
    switcher({ theme: currentTheme === "dark" ? light : dark });
  }, [currentTheme, switcher, dark, light]);

  return (
    <Switch
      loading={status === "loading"}
      checked={currentTheme === "dark"}
      checkedChildren={"☀️"}
      unCheckedChildren={"🌙"}
      onChange={changeHandler}
    />
  );
};

export default ThemeSwitcher;
