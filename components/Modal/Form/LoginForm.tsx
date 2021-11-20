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
import { loginSchema } from "./schema";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

interface IFormInputs {
    email: string;
    password: number;
}

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(loginSchema),
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
            <FormControl isInvalid={!!errors?.email?.message}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder="Email" />
                    )}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.password?.message}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <InputGroup>
                            <Input
                                {...field}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
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
            <Button type="submit" w="100%" colorScheme="lime">
                Login
            </Button>
        </Center>
    );
};

export default LoginForm;
