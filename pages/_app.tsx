import { Center } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import CustomModal from "components/Modal/CustomModal";
import Navbar from "components/Navbar";
import ModalContext, { ModalState } from "context/modalContext";
import UserContext from "context/userContext";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import theme from "theme";

function _app({ Component, pageProps }: AppProps) {
    const [modal, setModal] = useState<ModalState | undefined>(undefined);
    const [userToken, setUserToken] = useState<
        Global.User.UserInfo | undefined
    >(undefined);

    const memorizedModalValue = useMemo(() => ({ modal, setModal }), [modal]);
    const memorizedUserValue = useMemo(
        () => ({ userToken, setUserToken }),
        [userToken]
    );
    return (
        <UserContext.Provider value={memorizedUserValue}>
            <ModalContext.Provider value={memorizedModalValue}>
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
                        <CustomModal />
                        <Component {...pageProps} />
                    </Center>
                </ChakraProvider>
            </ModalContext.Provider>
        </UserContext.Provider>
    );
}

export default _app;
