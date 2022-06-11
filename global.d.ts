declare module Global {
    declare module SignIn {
        export interface SignInResponse {
            accessToken: string;
            refreshToken: string;
        }
        export interface SignInInputs {
            email: string;
            password: string;
        }
    }
    declare module SignUp {
        export interface SignUpCityTypes {
            data: {
                states: { name: string; state_code: string }[];
            };
        }

        export interface SubmitSignUpData {
            city: string;
            confirmPassword: string;
            email: string;
            name: string;
            passsword: string;
            surname: string;
        }

        export interface SignUpInputs {
            [key: string]: string;
        }
    }
    declare module Products {
        export interface AddProduct {
            title: string;
            category: string;
            description: string;
            price: number | string;
            image: string;
        }

        export interface Product extends AddProduct {
            _id: string;
            user: string;
            productId: string;
            createdAt: Date;
            userNameAndSurname: string;
            isItSold: boolean;
        }

        export interface AllProductResponse {
            productsList: Product[] | undefined;
            highestPrice: number;
        }

        export interface PurchaseRequestPayload {
            productId: string;
            productName: string;
            productCategory: string;
            buyerName: string;
            buyerId?: string;
            sellerName: string;
            sellerId: string;
            price: number;
            message: string | undefined;
            status?: string;
        }

        export interface PurchaseRequestsTypes
            extends Global.Products.PurchaseRequestPayload {
            createdAt: Date | string;
            updatedAt: Date | string;
            _id: string;
        }

        export type PurchaseRequestsResponse = {
            receivedPurchaseRequests: PurchaseRequestsTypes[];
            sendedPurchaseRequests: PurchaseRequestsTypes[];
        };
    }
    declare module User {
        export interface UserInfo {
            _id: string;
            name: string;
            surname: string;
            email: string;
            city: string;
            session: string;
            createdAt: Date | string;
            updatedAt: Date | string;
            exp: number;
            iat: number;
            __v: number;
        }
    }
}
