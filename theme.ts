import { mode } from "@chakra-ui/theme-tools";

export const customConfig = {
    styles: {
        global: (props: any) => ({
            body: {
                color: mode("#1f1f1f", "#fff")(props),
                bg: mode("#fff", "#1F1F1F")(props),
            },
        }),
    },
    colors: {
        customGreen: {
            50: "#70FCA1",
            100: "#64EE90",
            200: "#57E080",
            300: "#4BD26F",
            400: "#3EC45F",
            500: "#32B54E",
            600: "#25A73E",
            700: "#19992D",
            800: "#0C8B1D",
            900: "#007D0C",
        },
        customPinkAndPurple: {
            50: "#E4A7C5",
            100: "#D79DC1",
            200: "#CA94BE",
            300: "#BC8ABA",
            400: "#AF81B7",
            500: "#A277B3",
            600: "#956EB0",
            700: "#8764AC",
            800: "#7A5BA9",
            900: "#6D51A5",
        },
        customIcecream: {
            50: "#FFF95B",
            100: "#FEE95D",
            200: "#FCD95F",
            300: "#FBC961",
            400: "#FAB963",
            500: "#F8A966",
            600: "#F79968",
            700: "#F6896A",
            800: "#F4796C",
            900: "#F3696E",
        },
        customPurple: {
            50: "#B57BEE",
            100: "#A873E1",
            200: "#9B6BD4",
            300: "#8F63C7",
            400: "#825BBA",
            500: "#7554AE",
            600: "#684CA1",
            700: "#5C4494",
            800: "#4F3C87",
            900: "#42347A",
        },
    },
};

export enum COLOR_MODE_PREFERENCE {
    CUSTOM_GREEN = "customGreen",
    CUSTOM_PINK_AND_PURPLE = "customPinkAndPurple",
    CUSTOM_ICE_CREAM = "customIcecream",
    CUSTOM_OLIVE = "customOlive",
}
