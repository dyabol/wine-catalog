import { createContext, useEffect, useState, useContext } from "react";

type WindowSizes = "s" | "m" | "l" | "xl";

const ResponsiveContext = createContext<WindowSizes | undefined>(undefined);

const getSize = (): WindowSizes => {
  const width = document.documentElement.clientWidth;
  if (width >= 1440) {
    return "xl";
  }
  if (width >= 1024) {
    return "l";
  }
  if (width >= 600) {
    return "m";
  }
  return "s";
};

export const ResponsiveProvider: React.FC = ({ children }) => {
  const [size, setSize] = useState<WindowSizes>("xl");

  useEffect(() => {
    const resize = () => {
      setSize(getSize());
      console.log(getSize());
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={size}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = (): WindowSizes => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error("ResponsiveProvider is not used.");
  }
  return context;
};
