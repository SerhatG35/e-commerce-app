import { Center } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import UserContext from "context/userContext";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import theme from "theme";

function _app({ Component, pageProps }: AppProps) {
    const [userToken, setUserToken] = useState<
        Global.User.UserInfo | undefined
    >(undefined);

    const memorizedUserValue = useMemo(
        () => ({ userToken, setUserToken }),
        [userToken]
    );
    return (
        <UserContext.Provider value={memorizedUserValue}>
            <ChakraProvider theme={theme} resetCSS>
                <Center
                    fontSize={[
                        "0.6rem",
                        "0.6rem",
                        "0.75rem",
                        "0.75rem",
                        "1rem",
                    ]}
                    fontFamily="Nunito"
                >
                    <Navbar />
                    <Component {...pageProps} />
                </Center>
            </ChakraProvider>
        </UserContext.Provider>
    );
}

export default _app;
