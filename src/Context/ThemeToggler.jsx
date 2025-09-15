import { createContext, useState, useEffect } from "react";

export const themeToggler = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  const handleToggleTheme = () => {
    setTheme((prevTheme) => {
      const next = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeToggler.Provider value={{ theme, handleToggleTheme }}>
      {children}
    </themeToggler.Provider>
  );
};
