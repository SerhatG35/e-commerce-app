import type { AppProps } from "next/app";
import ModalContext, { ModalState } from "context/modalContext";
import { useMemo, useState } from "react";
import { Center } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import theme from "theme";
import CustomModal from "components/Modal/CustomModal";

function MyApp({ Component, pageProps }: AppProps) {
    const [modal, setModal] = useState<ModalState | undefined>(undefined);

    const value = useMemo(() => ({ modal, setModal }), [modal]);
    return (
        <ModalContext.Provider value={value}>
            <ChakraProvider theme={theme}>
                <Center fontFamily="Nunito">
                    <Navbar />
                    <CustomModal />
                    <Component {...pageProps} />
                </Center>
            </ChakraProvider>
        </ModalContext.Provider>
    );
}

export default MyApp;
