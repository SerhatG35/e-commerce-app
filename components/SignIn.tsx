import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Auth } from "service/axios";
import { Toaster } from "utils/Toster";
import { SignInSchema } from "./FormSchema";

type SignInProps = {
    closeModal: () => void;
};

const SignIn: FC<SignInProps> = ({ closeModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const userToken = useUserToken();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Global.SignIn.SignInInputs>({
        resolver: yupResolver(SignInSchema),
    });

    const onSubmit: SubmitHandler<Global.SignIn.SignInInputs> = async (
        data
    ) => {
        try {
            const retrievedToken = await Auth.LOGIN(data);
            userToken?.setUserToken(jwtDecode(retrievedToken.accessToken));
            Toaster("Sign in successful", "", "success");
            closeModal();
        } catch (error: any) {
            Toaster(
                "",
                `${
                    error?.response?.data
                        ? error?.response?.data
                        : "An error occurred"
                }`,
                "error"
            );
        }
    };

    return (
        <Center
            flexDir="column"
            as="form"
            h="100%"
            justifyContent="space-evenly"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl isInvalid={!!errors?.email?.message}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input {...field} placeholder="Email" my="2" />
                    )}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.password?.message}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <InputGroup>
                            <Input
                                {...field}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                my="2"
                            />
                            <InputRightElement h="100%" width="3rem">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    size="xs"
                                    colorScheme="gray"
                                    _hover={{
                                        transform: "scale(1.1)",
                                    }}
                                    _focus={{ outline: "none" }}
                                    icon={
                                        showPassword ? (
                                            <BsEyeSlashFill size={15} />
                                        ) : (
                                            <BsEyeFill size={15} />
                                        )
                                    }
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                />
                            </InputRightElement>
                        </InputGroup>
                    )}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
                isLoading={isSubmitting}
                loadingText="Signing in"
                my="2"
                type="submit"
                w="100%"
                colorScheme="green"
            >
                Sign In
            </Button>
        </Center>
    );
};

export default SignIn;
