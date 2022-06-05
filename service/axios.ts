import axios from "axios";
import process from "process";

const PROD_API = "https://backend.e-commerce-app.me";
const LOCAL_API = "http://localhost:3001";

const API = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? LOCAL_API : PROD_API,
    withCredentials: true,
});

export const Auth = {
    LOGIN: async (params: Global.SignIn.SignInInputs) => {
        const { data } = await API.post<Global.SignIn.SignInResponse>(
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
        const { data } = await API.get<Global.Products.Product[]>(
            `/api/${userId}/products`
        );
        return data;
    },
    INFO: async (userId: string) => {
        const { data } = await API.get<Global.User.UserInfo>(
            `/api/user/${userId}`
        );
        return data;
    },
};

export const Product = {
    ADD: async (params: Global.Products.AddProduct) => {
        const { data } = await API.post("/api/products", { ...params });
        return data;
    },
    GET: async (productId: string) => {
        const { data } = await API.get<Global.Products.Product>(
            `/api/products/${productId}`
        );
        return data;
    },
    GET_ALL: async (params: { category?: string; priceRange?: number[] }) => {
        const { data } = await API.get<Global.Products.AllProductResponse>(
            "/api/all-products",
            { params }
        );
        return data;
    },
    DELETE: async (productId: string) => {
        const { data } = await API.delete<Global.Products.AllProductResponse>(
            `/api/products/${productId}`
        );
        return data;
    },
    PURCHASE_REQUEST: async (
        payload: Global.Products.PurchaseRequestPayload
    ) => {
        const { data } = await API.post(
            `/api/purchase-request/${payload.productId}`,
            {
                ...payload,
            }
        );
        return data;
    },
    GET_PURCHASE_REQUEST: async (userId: string | undefined) => {
        const { data } =
            await API.get<Global.Products.PurchaseRequestsResponse>(
                `/api/get-purchase-requests/${userId}`
            );
        return data;
    },
    REJECT_PURCHASE_REQUEST: async (purchaseRequestId: string) => {
        const { data } = await API.delete(
            `/api/reject-purchase-request/${purchaseRequestId}`
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
