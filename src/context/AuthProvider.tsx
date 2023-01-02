import { ReactNode, useEffect } from "react";
import { createContext, useState } from "react";
import axios from "../api/axios";

let authProps: any = {};

const AuthContext = createContext(authProps);

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children, ...props }: Props) => {
  const [auth, setAuth] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loadingCredentials, setLoadingCredentials] = useState(true);

  useEffect(() => {
    setLoadingCredentials(true);
    if (JSON.stringify(localStorage.getItem("accessToken")) === null)
      setAuth("");
    else setAuth(JSON.stringify(localStorage.getItem("accessToken")));

    const config = {
      headers: { Authorization: `Bearer ${auth.slice(1, auth.length - 1)}` },
    };

    axios
      .get("/user/verify", config)
      .then((res) => {
        if (res.data.response) setAdmin(true);
      })
      .catch((err) => console.log(err));
    setLoadingCredentials(false);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, admin, setAdmin, loadingCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
