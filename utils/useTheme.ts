import { useEffect, useState } from "react";

type Themes = "dark" | "light";

const useTheme = (): [Themes, (theme: Themes) => void] => {
  const [themeState, setThemeState] = useState<Themes>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
    } else {
      const osTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      setThemeState(osTheme);
    }
  }, []);

  const setTheme = (theme: Themes) => {
    setThemeState(theme);
    localStorage.setItem("theme", theme);
  };

  return [themeState, setTheme];
};

export default useTheme;
