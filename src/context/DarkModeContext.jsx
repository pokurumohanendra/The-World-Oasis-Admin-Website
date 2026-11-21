import { useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { DarkModeContext } from "./useDarkMode";

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme: dark)").matches, "isDarkMode");
  useEffect(() => { document.documentElement.classList.toggle("dark-mode", isDarkMode); }, [isDarkMode]);
  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode: () => setIsDarkMode((value) => !value) }}>{children}</DarkModeContext.Provider>;
}
