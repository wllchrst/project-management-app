import { createContext, useContext, useState } from "react";
import { IUserContext } from "../interfaces/user-context-interface";
import { IUser } from "../interfaces/user-interface";

const userContext = createContext({} as IUserContext);

type ContentLayout = {
  children: JSX.Element;
};

export function UserProvider({ children }: ContentLayout) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({} as IUser);

  // Authenticate logic here VVV
  function isAuth() {
    return auth;
  }

  // You can pass all user data in here V (Global Data)
  const data = { setAuth, user, isAuth, setUser };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
