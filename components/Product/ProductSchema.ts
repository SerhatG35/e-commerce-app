import * as yup from "yup";

export const addProductSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required.")
        .max(30, "Title can't be over 30 characters.")
        .min(3, "Title must be at least 3 characters."),
    category: yup.string().required("Category is required."),
    description: yup
        .string()
        .min(10, "Description must be at least 10 characters long.")
        .max(500, "Description must be max 500 characters long.")
        .required("Description is required."),
    price: yup
        .number()
        .min(1)
        .typeError("Price must be a number.")
        .required("Price is required.")
        .max(1000000, "1.000.000₺ is the maximum price that can be entered."),
    image: yup.string().required("Image is required."),
});
