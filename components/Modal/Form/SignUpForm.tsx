import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { capitalize } from "utils/capitalize";
import { signUpSchema } from "./schema";

interface IFormInputs {
    [key: string]: string;
}

const signUpContent = [
    "name",
    "surname",
    "email",
    "password",
    "confirmPassword",
];

const SignUpForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(signUpSchema),
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
    };

    return (
        <Center
            flexDir="column"
            as="form"
            h="100%"
            justifyContent="space-evenly"
            onSubmit={handleSubmit(onSubmit)}
        >
            {signUpContent.map((content) => (
                <FormControl isInvalid={!!errors[content]?.message}>
                    <Controller
                        name={content}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder={
                                    content !== "confirmPassword"
                                        ? capitalize(content)
                                        : "Confirm Password"
                                }
                                type={
                                    content === "password" ||
                                    content === "confirmPassword"
                                        ? "password"
                                        : "text"
                                }
                            />
                        )}
                    />
                    <FormErrorMessage>
                        {errors[content]?.message}
                    </FormErrorMessage>
                </FormControl>
            ))}
            <Button type="submit" w="100%" colorScheme="lime">
                Sign Up
            </Button>
        </Center>
    );
};

export default SignUpForm;
