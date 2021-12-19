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
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { loginSchema } from "./FormSchema";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { ILoginInputs } from "global";
import { Auth } from "service/axios";
import { closeModal } from "../CustomModal";
import { useModal } from "context/modalContext";
import { Toaster } from "components/Toster";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const modal = useModal();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ILoginInputs>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
        try {
            await Auth.LOGIN(data);
            closeModal(modal);
            Toaster("Login successful", "", "success");
        } catch (error: any) {
            Toaster("", `${error.response.message}`, "error");
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

export default LoginForm;
