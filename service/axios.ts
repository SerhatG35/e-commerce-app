import axios from "axios";
import process from "process";

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
    LOGOUT: async () => {
        const { data } = await API.delete("/api/sessions");
        return data;
    },
};

export const User = {
    UPDATE: async (params: Global.User.UserInfo) => {
        const { data } = await API.put(`/api/user/${params._id}`, {
            ...params,
        });
        return data;
    },
    PRODUCTS: async (userId: string) => {
        const { data } = await API.get(`/api/${userId}/products`);
        return data;
    },
};

export const Product = {
    ADD: async (params: Global.Products.AddProduct) => {
        const { data } = await API.post("/api/products", { ...params });
        return data;
    },
    GET: async (productId: string) => {
        const { data } = await API.get(`/api/products/${productId}`);
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
        try {
            const { data } = await axios.post<Global.SignUp.SignUpCityTypes>(
                "https://countriesnow.space/api/v0.1/countries/states",
                { country: "turkey" }
            );
            return data;
        } catch (error) {
            console.error(error);
        }
    },
};
