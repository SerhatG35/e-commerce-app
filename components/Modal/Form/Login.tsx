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
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Toaster } from "components/Toster";
import { useModal } from "context/modalContext";
import { useUserToken } from "context/userContext";
import { Api } from "global";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Auth } from "service/axios";
import { closeModal } from "../CustomModal";
import { loginSchema } from "./FormSchema";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const modal = useModal();
    const userToken = useUserToken();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Api.Login.LoginInputs>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<Api.Login.LoginInputs> = async (data) => {
        try {
            const retrievedToken = await Auth.LOGIN(data);
            userToken?.setUserToken(retrievedToken);
            closeModal(modal);
            Toaster("Login successful", "", "success");
        } catch (error: any) {
            Toaster("", `${error.response?.message}`, "error");
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
            <Button my="2" type="submit" w="100%" colorScheme="lime">
                Login
            </Button>
        </Center>
    );
};

export default Login;
