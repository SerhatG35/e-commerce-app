declare module Global {
    declare module Login {
        export interface LoginResponse {
            accessToken: string;
            refreshToken: string;
        }
        export interface LoginInputs {
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
            price: number;
            image: string;
        }

        export interface Product extends AddProduct {
            _id: string;
            user: string;
            productId: string;
            createdAt: Date;
            userNameAndSurname: string;
        }
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
