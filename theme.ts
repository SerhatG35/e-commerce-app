import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

const styles = {
    global: (props: any) => ({
        body: {
            color: mode("#1f1f1f", "#f5f5f5")(props),
            bg: mode("#f5f5f5", "#1f1f1f")(props),
        },
        Button: {
            bg: mode("#f5f5f5", "#1f1f1f")(props),
        },
    }),
};

const theme = extendTheme({
    config,
    styles,
    colors: {
        lime: {
            50: "#f2ffde",
            100: "#defcb2",
            200: "#caf884",
            300: "#b5f554",
            400: "#a1f226",
            500: "#88d90d",
            600: "#69a905",
            700: "#4a7801",
            800: "#2b4800",
            900: "#0b1900",
        },
        gradient: {
            50: "#E63946",
            100: "#EA4B3C",
            200: "#EE5D32",
            300: "#F36F28",
            400: "#F7811D",
            500: "#FB9313",
            600: "#FFA509",
        },
    },
});

export default theme;
