import { ReactNode, createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../models/UserModel";
// import { useLocalStorage } from "../helpers/storage";



interface AuthContext {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (flag: boolean) => void;
}

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;