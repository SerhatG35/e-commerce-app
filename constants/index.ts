import { COLOR_MODE_PREFERENCE, customConfig } from "theme";

export const productCategories = [
    "Select product category",
    "Electronic",
    "Movie,Book and Music",
    "Vehicle",
    "House and Furniture",
    "Clothes and Accessories",
    "Other",
];

export const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const oneDayInMilliseconds = 86400000;

export const ColorPalettes = [
    {
        preference: COLOR_MODE_PREFERENCE.CUSTOM_GREEN,
        hex: customConfig.colors.customGreen[500],
    },
    {
        preference: COLOR_MODE_PREFERENCE.CUSTOM_ICE_CREAM,
        hex: customConfig.colors.customIcecream[500],
    },
    {
        preference: COLOR_MODE_PREFERENCE.CUSTOM_PINK_AND_PURPLE,
        hex: customConfig.colors.customPinkAndPurple[500],
    },
];
