import Cookies from "js-cookie";
import process from "process";

export const setCookieAuthToken = (token: {
    accessToken: string;
    refreshToken: string;
}) => {
    Cookies.set("accessToken", token.accessToken, {
        expires: 1 / 24, // 1 hour
        domain:
            process.env.NODE_ENV === "development"
                ? "localhost"
                : "e-commerce-app-pink.vercel.app",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true,
    });
    Cookies.set("refreshToken", token.refreshToken, {
        expires: 365, // 1 year
        domain:
            process.env.NODE_ENV === "development"
                ? "localhost"
                : "e-commerce-app-pink.vercel.app",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true,
    });
};

export const removeCookieAuthToken = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};
