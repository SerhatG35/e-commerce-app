import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type UserContextTypes = {
    userToken: Global.Login.AccessToken | undefined;
    setUserToken: Dispatch<
        SetStateAction<Global.Login.AccessToken | undefined>
    >;
};

const UserContext = createContext<UserContextTypes | undefined>(undefined);

export const useUserToken = () => useContext(UserContext);

export default UserContext;
