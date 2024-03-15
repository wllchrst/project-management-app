import { IUser } from "./user-interface";

export interface IUserContext {
  user: IUser;
  isAuth: () => boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}
