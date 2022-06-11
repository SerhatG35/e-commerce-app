import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    Input,
    Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Auth, External } from "service/axios";
import { capitalize } from "utils/capitalize";
import { Toaster } from "utils/Toster";
import { signUpSchema } from "./FormSchema";

const signUpContent = [
    "name",
    "surname",
    "email",
    "city",
    "password",
    "passwordConfirmation",
];

type SignUpProps = {
    closeModal: () => void;
};

const SignUp: FC<SignUpProps> = ({ closeModal }) => {
    const [cities, setCities] = useState<
        Global.SignUp.SignUpCityTypes | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Global.SignUp.SignUpInputs>({
        resolver: yupResolver(signUpSchema),
    });
    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            await Auth.REGISTER(data);
            Toaster("Account created", "", "success");
            closeModal();
        } catch (error: any) {
            Toaster("", `${error?.response?.data}`, "error");
        }
    };

    const FetchCities = async () => {
        setIsLoading(true);
        try {
            const response = await External.FetchCities();
            setCities(response);
        } catch (error: any) {
            Toaster("", "Error occurred while fetching cities.", "error");
        }
        setIsLoading(false);
    };

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
                                        !isLoading
                                            ? "Select city"
                                            : "Loading..."
                                    }
                                    onFocus={FetchCities}
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
                colorScheme="green"
                my="2"
                type="submit"
                w="100%"
                isLoading={isSubmitting}
                loadingText="Signing up"
            >
                Sign Up
            </Button>
        </Center>
    );
};

export default SignUp;
