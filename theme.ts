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
            50: "#F3696E",
            100: "#F47062",
            200: "#F47756",
            300: "#F57E4A",
            400: "#F5853E",
            500: "#F68D32",
            600: "#F69426",
            700: "#F79B1A",
            800: "#F7A20E",
            900: "#F8A902",
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
        customOlive: {
            50: "#AEB778",
            100: "#A9B46C",
            200: "#A4B160",
            300: "#9FAE55",
            400: "#9AAB49",
            500: "#94A73D",
            600: "#8FA431",
            700: "#8AA126",
            800: "#859E1A",
            900: "#809B0E",
        },
    },
};

export enum COLOR_MODE_PREFERENCE {
    CUSTOM_GREEN = "customGreen",
    CUSTOM_PINK_AND_PURPLE = "customPinkAndPurple",
    CUSTOM_ICE_CREAM = "customIcecream",
}
