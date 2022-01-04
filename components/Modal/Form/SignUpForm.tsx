import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    Input,
    Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Toaster } from "components/Toster";
import { useModal } from "context/modalContext";
import { Api } from "global";
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

const SignUpForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Api.SignUp.SignUpInputs>({
        resolver: yupResolver(signUpSchema),
    });
    const [cities, setCities] = useState<
        Api.SignUp.SignUpCityTypes | undefined
    >(undefined);
    const modal = useModal();

    const onSubmit: SubmitHandler<Api.SignUp.SubmitSignUpData> = async (
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
                                />
                            ) : (
                                <Select
                                    {...field}
                                    placeholder={
                                        cities ? "Select city" : "Loading..."
                                    }
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
            <Button my="2" type="submit" w="100%" colorScheme="lime">
                Sign Up
            </Button>
        </Center>
    );
};

export default SignUpForm;
