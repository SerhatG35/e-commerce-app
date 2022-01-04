import { Api } from "global";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type UserContextTypes = {
    userToken: Api.Login.LoginResponseData | undefined;
    setUserToken: Dispatch<
        SetStateAction<Api.Login.LoginResponseData | undefined>
    >;
};

const UserContext = createContext<UserContextTypes | undefined>(undefined);

export const useUserToken = () => useContext(UserContext);

export default UserContext;
