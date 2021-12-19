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

export type SignUpCityTypes = {
    data: {
        states: { name: string; state_code: string }[];
    };
};

export interface ISubmitSignUpData {
    city: string;
    confirmPassword: string;
    email: string;
    name: string;
    passsword: string;
    surname: string;
}

export interface ISignUpInputs {
    [key: string]: string;
}
export interface ILoginInputs {
    email: string;
    password: string;
}
