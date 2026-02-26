import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {}
})

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") === "123");
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/admin");
    sessionStorage.setItem("token", "123");
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
    sessionStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}