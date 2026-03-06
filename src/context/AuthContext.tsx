import type { User } from "@/models/User";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const initial_user = {
  id: 0,
  username: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
  role: "customer"
}

export const AuthContext = createContext({
  isLoggedIn: false,
  handleLogin: (_username: string, _password: string) => {},
  handleLogout: () => {},
  user: initial_user,
  loading: false,
})

const USERS_API_URL = import.meta.env.VITE_DB_URL_2 + "/Users"

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") !== null);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initial_user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async() => {
      const userFromToken = sessionStorage.getItem("token");
      if (userFromToken === null) {
        setLoading(false);
        return;
      }
      const foundUser = await findUser(userFromToken);
      if (foundUser === undefined) {
        setLoading(false);
        return;
      }
      setUser(foundUser);
      setLoading(false); 
    }
    getUser();
    }, []);

  const handleLogin = async(username: string, password: string) => {
    const foundUser = await findUser(username);
    if (foundUser === undefined) {
      alert("Incorrect username!");
      return;
    }
    if (foundUser.password !== password) {
      alert("Incorrect password!");
      return
    }
    setUser(foundUser);
    setIsLoggedIn(true);
    navigate("/admin");
    sessionStorage.setItem("token", username);
  }

  const findUser = async(username: string) => {
    const res = await fetch(USERS_API_URL);
    const json: User[] = await res.json();
    const foundUser = json.find(user => user.username === username);
    return foundUser;
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
    sessionStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{loading, user, isLoggedIn, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}