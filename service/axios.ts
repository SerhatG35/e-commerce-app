import process from "process";
import axios from "axios";
import { ILoginInputs, ISubmitSignUpData, SignUpCityTypes } from "global";

const PROD_API = "";
const LOCAL_API = "http://localhost:3001";

const API = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? LOCAL_API : PROD_API,
});

export const Auth = {
    LOGIN: async (params: ILoginInputs) => {
        const { data } = await API.post(
            "/api/sessions",
            { ...params },
            { withCredentials: true }
        );

        return data;
    },
    REGISTER: async (params: ISubmitSignUpData) => {
        const { data } = await API.post("/api/users", {
            ...params,
        });
        return data;
    },
    
};

export const External = {
    FetchCities: async () => {
        const { data } = await axios.post<SignUpCityTypes>(
            "https://countriesnow.space/api/v0.1/countries/states",
            { country: "turkey" }
        );
        return data;
    },
};
