import { Api } from "global";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type UserContextTypes = {
    userToken: Api.Login.AccessToken | undefined;
    setUserToken: Dispatch<SetStateAction<Api.Login.AccessToken | undefined>>;
};

const UserContext = createContext<UserContextTypes | undefined>(undefined);

export const useUserToken = () => useContext(UserContext);

export default UserContext;
