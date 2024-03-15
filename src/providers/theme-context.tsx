import { ThemeProvider } from "styled-components";
import { IChildren } from "../interfaces/children-interface";
import { useState } from "react";

interface ThemeValue {
  primary: string;
  secondary: string;
  accent: string;
  font: string;
  fontDimmed: string;
  error: string;
  overlay: string;
  toggleTheme: VoidFunction;
}

export default function ThemeContextProvider({ children }: IChildren) {
  const [currentTheme, setCurrentTheme] = useState("light");

  function resetDocumentTheme(theme: string) {
    document.documentElement.style.setProperty(
      "background-color",
      `var(--primary-${theme})`
    );
    document.documentElement.style.setProperty("color", `var(--font-${theme})`);
  }

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
    resetDocumentTheme(currentTheme);
  };

  const themeValue = () => ({
    primary: `var(--primary-${currentTheme})`,
    secondary: `var(--secondary-${currentTheme})`,
    accent: `var(--accent-${currentTheme})`,
    font: `var(--font-${currentTheme})`,
    fontDimmed: `var(--font-dimmed-${currentTheme})`,
    error: `var(--error-${currentTheme})`,
    overlay: `var(--overlay-${currentTheme})`,
    shadow: `var(--shadow-${currentTheme})`,
    toggleTheme,
  });

  return <ThemeProvider theme={themeValue}>{children}</ThemeProvider>;
}
