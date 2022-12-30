import { ReactNode, useEffect } from "react";
import { createContext, useState } from "react";

let authProps: any = {};

const AuthContext = createContext(authProps);

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children, ...props }: Props) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    auth
      ? localStorage.setItem("token", "sampleToken")
      : localStorage.removeItem("token");
  }, [auth]);

  useEffect(() => {
    localStorage.getItem("token") && setAuth(true);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
