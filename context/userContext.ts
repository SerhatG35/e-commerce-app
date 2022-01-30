import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type UserContextTypes = {
    userToken: Global.User.UserInfo | undefined;
    setUserToken: Dispatch<SetStateAction<Global.User.UserInfo | undefined>>;
};

const UserContext = createContext<UserContextTypes | undefined>(undefined);

export const useUserToken = () => useContext(UserContext);

export default UserContext;
