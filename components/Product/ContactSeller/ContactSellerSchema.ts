import * as yup from "yup";

export const ContactSellerSchema = (price: number) =>
    yup.object().shape({
        price: yup
            .number()
            .min(
                price,
                `Price must be minimum base price of the product which is ${price}`
            )
            .typeError("Price must be a number.")
            .required("Price is required.")
            .max(
                price + price * 0.1,
                "Price cannot exceed 10% of the original price."
            ),
        message: yup
            .string()
            .optional()
            .default(undefined)
            .transform((value) => (value === "" ? undefined : value))
            .min(10, "Message must be at least 10 characters long.")
            .max(500, "Message must be max 500 characters long."),
    });
