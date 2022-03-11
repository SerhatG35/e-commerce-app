import * as yup from "yup";

export const addProductSchema = yup.object().shape({
    title: yup.string().required("Title is required."),
    description: yup
        .string()
        .min(10, "Description must be at least 10 characters long.")
        .max(100, "Description must be max 100 characters long.")
        .required("Description is required."),
    price: yup
        .number()
        .typeError("Price must be a number.")
        .required("Price is required."),
    image: yup.string().required("Image is required."),
});
