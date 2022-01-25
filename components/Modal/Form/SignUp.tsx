import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    Input,
    Select,
    useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Toaster } from "components/Toster";
import { useModal } from "context/modalContext";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Auth, External } from "service/axios";
import { capitalize } from "utils/capitalize";
import { closeModal } from "../CustomModal";
import { signUpSchema } from "./FormSchema";

const signUpContent = [
    "name",
    "surname",
    "email",
    "city",
    "password",
    "passwordConfirmation",
];

const SignUp = () => {
    const [cities, setCities] = useState<
        Global.SignUp.SignUpCityTypes | undefined
    >(undefined);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Global.SignUp.SignUpInputs>({
        resolver: yupResolver(signUpSchema),
    });
    const modal = useModal();
    const { colorMode } = useColorMode();

    const inputModeColors = {
        color: colorMode === "dark" ? "#1f1f1f" : "#fff",
        borderHoverColor: colorMode === "dark" ? "#8F8F8F" : undefined,
    };

    const onSubmit: SubmitHandler<Global.SignUp.SubmitSignUpData> = async (
        data
    ) => {
        try {
            await Auth.REGISTER(data);
            Toaster("Account created", "", "success");
            closeModal(modal);
        } catch (error: any) {
            Toaster("", `${error.response.data}`, "error");
        }
    };

    const FetchCities = async () => {
        setCities(await External.FetchCities());
    };

    useEffect(() => {
        FetchCities();
    }, []);

    return (
        <Center
            flexDir="column"
            as="form"
            h="100%"
            justifyContent="space-around"
            onSubmit={handleSubmit(onSubmit)}
        >
            {signUpContent.map((content) => (
                <FormControl
                    key={content}
                    isInvalid={!!errors[content]?.message}
                    my="2"
                >
                    <Controller
                        name={content}
                        control={control}
                        defaultValue=""
                        render={({ field }) =>
                            content !== "city" ? (
                                <Input
                                    {...field}
                                    placeholder={
                                        content !== "passwordConfirmation"
                                            ? capitalize(content)
                                            : "Password Confirmation"
                                    }
                                    type={
                                        content === "password" ||
                                        content === "passwordConfirmation"
                                            ? "password"
                                            : "text"
                                    }
                                    _placeholder={{
                                        color: inputModeColors.color,
                                    }}
                                    borderColor={inputModeColors.color}
                                    _hover={{
                                        borderColor:
                                            inputModeColors.borderHoverColor,
                                    }}
                                />
                            ) : (
                                <Select
                                    {...field}
                                    placeholder={
                                        cities ? "Select city" : "Loading..."
                                    }
                                    borderColor={inputModeColors.color}
                                >
                                    {cities &&
                                        cities.data.states.map((city) => (
                                            <option
                                                key={city.state_code}
                                                value={city.name.split(" ")[0]}
                                            >
                                                {city.name.split(" ")[0]}
                                            </option>
                                        ))}
                                </Select>
                            )
                        }
                    />
                    <FormErrorMessage>
                        {errors[content]?.message}
                    </FormErrorMessage>
                </FormControl>
            ))}
            <Button
                bg={colorMode === "light" ? "#fff" : "#1f1f1f"}
                color={colorMode === "light" ? "#1f1f1f" : "#fff"}
                _hover={{
                    background: colorMode === "light" ? "#DBDBDB" : "#3F3F3F",
                }}
                my="2"
                type="submit"
                w="100%"
            >
                Sign Up
            </Button>
        </Center>
    );
};

export default SignUp;
