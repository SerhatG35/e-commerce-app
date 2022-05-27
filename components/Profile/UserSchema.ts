import * as yup from "yup";

export const userSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required.")
        .min(3)
        .max(20)
        .label("Name"),
    surname: yup
        .string()
        .required("Surname is required.")
        .min(3)
        .max(20)
        .label("Surname"),
    email: yup
        .string()
        .email("Please enter a valid email.")
        .required("Email is a required field."),
    city: yup.string().ensure().required("Please select a city."),
});
