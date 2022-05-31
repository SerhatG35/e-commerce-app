import {
    Button,
    Center,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Select,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserToken } from "context/userContext";
import Router from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { External, User } from "service/axios";
import { Toaster } from "utils/Toster";
import { userSchema } from "./UserSchema";

type EditProfileProps = {
    user: Global.User.UserInfo | undefined;
    reFetch: () => Promise<void>;
};

const EditProfile: FC<EditProfileProps> = ({ user, reFetch }) => {
    const [cities, setCities] = useState<
        Global.SignUp.SignUpCityTypes | undefined
    >(undefined);
    const [loading, setLoading] = useState(false);
    const btnRef = useRef(null);
    const userToken = useUserToken();

    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty },
        reset,
    } = useForm<Global.User.UserInfo>({
        resolver: yupResolver(userSchema),
        defaultValues: user,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const closeDrawer = () => {
        onClose();
        reset();
    };

    const FetchCities = async () => {
        setCities(await External.FetchCities());
    };

    useEffect(() => {
        FetchCities();
    }, []);

    useEffect(() => {
        reset(user);
    }, [user]);

    const onSubmit: SubmitHandler<Global.User.UserInfo> = async (data) => {
        try {
            setLoading(true);
            const result = await User.UPDATE(data);
            userToken?.setUserToken(result);
            Toaster(
                "Success",
                "You have successfuly updated your profile",
                "success"
            );
            reFetch();
            onClose();
        } catch (error: any) {
            Router.push("/");
            userToken?.setUserToken(undefined);
            Toaster("", `${error.response.data}`, "error");
        }
        setLoading(false);
    };

    return (
        <>
            <Button
                leftIcon={<AiOutlineEdit size={18} />}
                my="1rem"
                rounded="8px"
                size="sm"
                onClick={onOpen}
                ref={btnRef}
                boxShadow="md"
                fontSize="inherit"
            >
                Edit Profile
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
                autoFocus={false}
                size={isLargerThan768 ? "xs" : "full"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit Profile</DrawerHeader>
                    <Divider />
                    <DrawerBody>
                        <Center flexDir="column" as="form">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <>
                                        <Input my="0.5rem" {...field} />
                                        <Text
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
                                        >
                                            {errors?.name?.message}
                                        </Text>
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="surname"
                                render={({ field }) => (
                                    <>
                                        <Input my="0.5rem" {...field} />
                                        <Text
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
                                        >
                                            {errors?.surname?.message}
                                        </Text>
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <>
                                        <Input
                                            my="0.5rem"
                                            {...field}
                                            type="email"
                                        />
                                        <Text
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
                                        >
                                            {errors?.email?.message}
                                        </Text>
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="city"
                                render={({ field }) => (
                                    <>
                                        <Select my="0.5rem" {...field}>
                                            {cities &&
                                                cities.data.states.map(
                                                    (city) => (
                                                        <option
                                                            key={
                                                                city.state_code
                                                            }
                                                            value={
                                                                city.name.split(
                                                                    " "
                                                                )[0]
                                                            }
                                                        >
                                                            {
                                                                city.name.split(
                                                                    " "
                                                                )[0]
                                                            }
                                                        </option>
                                                    )
                                                )}
                                        </Select>
                                        <Text
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
                                        >
                                            {errors?.city?.message}
                                        </Text>
                                    </>
                                )}
                            />
                        </Center>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            colorScheme="red"
                            variant="outline"
                            mr={3}
                            onClick={closeDrawer}
                        >
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            loadingText="Updating Profile"
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            colorScheme="blue"
                            disabled={!isDirty}
                        >
                            Submit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default EditProfile;
