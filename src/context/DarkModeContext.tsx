import { createContext, useState, type ReactNode } from "react";

export const DarkModeContext = createContext({
  isDark: false,
  darkModeOn: () => {},
  darkModeOff: () => {}
})

export const DarkModeContextProvider = ({children}: {children: ReactNode}) => {
  const [isDark, setIsDark] = useState(localStorage.getItem("isDarkTheme") === "true");
  const darkModeOn = () => {
    setIsDark(true);
    localStorage.setItem("isDarkTheme", "true");
  }

  const darkModeOff = () => {
    setIsDark(false);
    localStorage.setItem("isDarkTheme", "false")
  }

  return (
    <DarkModeContext.Provider value={{isDark, darkModeOn, darkModeOff}}>
      {children}
    </DarkModeContext.Provider>
  )
}