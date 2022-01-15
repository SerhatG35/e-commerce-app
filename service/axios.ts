import axios from "axios";
import { Api } from "global";
import { GetServerSidePropsContext, PreviewData } from "next";
import process from "process";
import { ParsedUrlQuery } from "querystring";

const PROD_API = "https://e-commerce-app-be.herokuapp.com";
const LOCAL_API = "http://localhost:3001";

const API = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? LOCAL_API : PROD_API,
    withCredentials: true,
});

export const Auth = {
    LOGIN: async (params: Api.Login.LoginInputs) => {
        const { data } = await API.post<Api.Login.LoginResponse>(
            "/api/sessions",
            { ...params }
        );

        return data;
    },
    REGISTER: async (params: Api.SignUp.SubmitSignUpData) => {
        const { data } = await API.post("/api/users", {
            ...params,
        });
        return data;
    },
    DASHBOARD: async (
        params: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    ) => {
        const { data } = await API.get("/api/me", { ...params });
        return data;
    },
    LOGOUT: async () => {
        await API.delete("/api/sessions", {});
    },
};

export const External = {
    FetchCities: async () => {
        const { data } = await axios.post<Api.SignUp.SignUpCityTypes>(
            "https://countriesnow.space/api/v0.1/countries/states",
            { country: "turkey" }
        );
        return data;
    },
};
