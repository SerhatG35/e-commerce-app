import { Center } from "@chakra-ui/layout";
import {
    ChakraProvider,
    extendTheme,
    withDefaultColorScheme,
} from "@chakra-ui/react";
import Navbar from "components/Navbar";
import UserContext from "context/userContext";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { COLOR_MODE_PREFERENCE, customConfig } from "theme";
import { useReadLocalStorage } from "usehooks-ts";

type ColorModePreferenceType = {
    colorPalette: COLOR_MODE_PREFERENCE;
    useSystemColorMode: boolean;
};

function _app({ Component, pageProps }: AppProps) {
    const [userToken, setUserToken] = useState<
        Global.User.UserInfo | undefined
    >(undefined);
    const colorModePreference = useReadLocalStorage<ColorModePreferenceType>(
        "ColorModePreference"
    );

    const memorizedUserValue = useMemo(
        () => ({ userToken, setUserToken }),
        [userToken]
    );

    const theme = extendTheme(
        {
            ...customConfig,
            config: {
                useSystemColorMode:
                    colorModePreference?.useSystemColorMode ?? false,
            },
        },
        withDefaultColorScheme({
            colorScheme: String(
                colorModePreference?.colorPalette ??
                    COLOR_MODE_PREFERENCE.CUSTOM_GREEN
            ),
        })
    );

    return (
        <UserContext.Provider value={memorizedUserValue}>
            <ChakraProvider theme={theme} resetCSS>
                <Center
                    fontSize={[
                        "0.75rem",
                        "0.75rem",
                        "0.85rem",
                        "0.85rem",
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
