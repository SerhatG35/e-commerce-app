import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const signUpSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required("Email is a required field"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});
