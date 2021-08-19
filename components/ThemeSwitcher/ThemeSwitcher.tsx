import { Switch } from "antd";
import React, { useCallback } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import useTheme from "../../utils/useTheme";

const ThemeSwitcher: React.FC = () => {
  const {
    switcher,
    themes: { light, dark },
    currentTheme,
    status,
  } = useThemeSwitcher();
  const [_, setTheme] = useTheme();

  const changeHandler = useCallback(() => {
    const theme = currentTheme === "dark" ? light : dark;
    if (theme === "light" || theme === "dark") {
      switcher({ theme });
      setTheme(theme);
    }
  }, [currentTheme, light, dark, switcher, setTheme]);

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
