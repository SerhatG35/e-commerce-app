import * as yup from "yup";

export const addProductSchema = (isCategoryVehicle: boolean = false) =>
    yup.object().shape({
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
            .max(
                isCategoryVehicle ? 5000000 : 1000000,
                (parameter) =>
                    `${new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                        maximumSignificantDigits: 4,
                    }).format(
                        parameter.max
                    )} is the maximum price that can be entered.`
            ),
        image: yup.string().required("Image is required."),
    });
