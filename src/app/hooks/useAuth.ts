import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserModel } from "../types/UserModel";

export const useAuth = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return { user, isAuthenticated };
};