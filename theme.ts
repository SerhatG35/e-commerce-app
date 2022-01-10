import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customConfig = {
    styles: {
        global: (props: any) => ({
            body: {
                color: mode("#1f1f1f", "#fff")(props),
                bgGradient: mode(
                    "#fff",
                    "linear(to-r, #262355,#30275A,#3A2B60,#443065,#4E346B,#583870)"
                )(props),
            },
        }),
    },
    colors: {
        customPurple: {
            50: "#583870",
            100: "#4E346B",
            200: "#443065",
            300: "#3A2B60",
            400: "#30275A",
            500: "#262355",
        },
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: true,
    } as ThemeConfig,
    components: {
        Button: {
            baseStyle: {
                color: "#fff",
            },
        },
    },
};

const theme = extendTheme({ ...customConfig });

export default theme;
