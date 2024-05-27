import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserModel } from "../types/UserModel";

export const useAuth = () => {
  const { user, setUser, isAuthenticated,  setIsAuthenticated } = useContext(AuthContext);

  const login = (user: UserModel) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated, login, logout };
};