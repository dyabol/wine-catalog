import { Switch, Tooltip } from "antd";
import React, { useCallback } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useTranslation } from "react-i18next";
import useTheme from "../../utils/useTheme";

const ThemeSwitcher: React.FC = () => {
  const { t } = useTranslation();
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
    <Tooltip title={t("Change theme")}>
      <Switch
        loading={status === "loading"}
        checked={currentTheme === "dark"}
        checkedChildren={"☀️"}
        unCheckedChildren={"🌙"}
        onChange={changeHandler}
      />
    </Tooltip>
  );
};

export default ThemeSwitcher;
