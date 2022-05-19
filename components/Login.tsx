import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Auth } from "service/axios";
import { Toaster } from "utils/Toster";
import { loginSchema } from "./FormSchema";

type LoginProps = {
    closeModal: () => void;
};

const Login: FC<LoginProps> = ({ closeModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const userToken = useUserToken();
    const { colorMode } = useColorMode();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Global.Login.LoginInputs>({
        resolver: yupResolver(loginSchema),
    });

    const inputModeColors = {
        color: colorMode === "dark" ? "#1f1f1f" : "#fff",
        borderHoverColor: colorMode === "dark" ? "#8F8F8F" : undefined,
    };

    const onSubmit: SubmitHandler<Global.Login.LoginInputs> = async (data) => {
        try {
            const retrievedToken = await Auth.LOGIN(data);
            userToken?.setUserToken(jwtDecode(retrievedToken.accessToken));
            Toaster("Login successful", "", "success");
            closeModal();
        } catch (error: any) {
            Toaster(
                "",
                `${
                    error.response?.data
                        ? error.response?.data
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
                        <Input
                            {...field}
                            placeholder="Email"
                            my="2"
                            _placeholder={{ color: inputModeColors.color }}
                            borderColor={inputModeColors.color}
                            _hover={{
                                borderColor: inputModeColors.borderHoverColor,
                            }}
                        />
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
                                _placeholder={{ color: inputModeColors.color }}
                                borderColor={inputModeColors.color}
                                _hover={{
                                    borderColor:
                                        inputModeColors.borderHoverColor,
                                }}
                            />
                            <InputRightElement h="100%" width="3rem">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    size="sm"
                                    bg="transparent"
                                    _hover={{
                                        background: "transparent",
                                        transform: "scale(1.2)",
                                    }}
                                    _active={{ background: "transparent" }}
                                    _focus={{ outline: "none" }}
                                    icon={
                                        showPassword ? (
                                            <BsEyeSlashFill size={20} />
                                        ) : (
                                            <BsEyeFill size={20} />
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
                loadingText="Signing"
                my="2"
                type="submit"
                w="100%"
                bg={colorMode === "light" ? "#fff" : "#1f1f1f"}
                color={colorMode === "light" ? "#1f1f1f" : "#fff"}
                _hover={{
                    background: colorMode === "light" ? "#DBDBDB" : "#3F3F3F",
                }}
            >
                Login
            </Button>
        </Center>
    );
};

export default Login;
