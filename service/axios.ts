import axios from "axios";
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
    LOGIN: async (params: Global.Login.LoginInputs) => {
        const { data } = await API.post<Global.Login.LoginResponse>(
            "/api/sessions",
            { ...params }
        );

        return data;
    },
    REGISTER: async (params: Global.SignUp.SubmitSignUpData) => {
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
        const { data } = await API.delete("/api/sessions");
        return data;
    },
};

export const Product = {
    ADD: async (params: Global.Products.AddProduct) => {
        const { data } = await API.post("/api/products", { ...params });
        return data;
    },
    GET_ALL: async () => {
        const { data } = await API.get<Global.Products.Product[]>(
            "/api/all-products"
        );
        return data;
    },
};

export const External = {
    FetchCities: async () => {
        const { data } = await axios.post<Global.SignUp.SignUpCityTypes>(
            "https://countriesnow.space/api/v0.1/countries/states",
            { country: "turkey" }
        );
        return data;
    },
};
