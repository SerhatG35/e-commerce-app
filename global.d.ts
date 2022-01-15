declare module Api {
    declare module Login {
        export interface LoginResponse {
            accessToken: string;
            refreshToken: string;
        }
        export interface AccessToken {
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
        export interface LoginInputs {
            email: string;
            password: string;
        }
    }
    declare module SignUp {
        export type SignUpCityTypes = {
            data: {
                states: { name: string; state_code: string }[];
            };
        };

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
}

export interface IProducts {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
