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
    InputGroup,
    InputLeftElement,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster } from "components/Toster";
import { useUserToken } from "context/userContext";
import { useAtom } from "jotai";
import Router from "next/router";
import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { Product } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import { addProductSchema } from "./ProductSchema";

const AddProduct = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addProductSchema),
    });
    const [loading, setIsLoading] = useState(false);
    const [, setProducts] = useAtom(ProductJotai);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    const userToken = useUserToken();

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            setIsLoading(true);
            await Product.ADD(data);
            const result = await Product.GET_ALL();
            setProducts(result);
            Toaster("Success", "", "success");
        } catch (error: any) {
            Router.push("/");
            userToken?.setUserToken(undefined);
            Toaster("", `${error.response.data}`, "error");
        }
        setIsLoading(false);
        onClose();
    };

    return (
        <>
            <Button
                colorScheme="customPurple"
                color="#fff"
                leftIcon={<AiOutlinePlus />}
                ref={btnRef}
                onClick={onOpen}
            >
                Add New Product
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                autoFocus={false}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton color="red" />
                    <DrawerHeader>Add New Product</DrawerHeader>
                    <Divider />
                    <DrawerBody>
                        <Center flexDir="column" as="form">
                            <Controller
                                control={control}
                                name="title"
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <Input
                                            placeholder="Title"
                                            my="0.5rem"
                                            {...field}
                                        />
                                        <Text
                                            w="100%"
                                            fontSize="sm"
                                            color="red"
                                        >
                                            {errors?.title?.message}
                                        </Text>
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="description"
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <Input
                                            placeholder="Description"
                                            my="0.5rem"
                                            {...field}
                                        />
                                        <Text
                                            w="100%"
                                            fontSize="sm"
                                            color="red"
                                        >
                                            {errors?.description?.message}
                                        </Text>
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="price"
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <InputGroup my="0.5rem">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                fontSize="1.2em"
                                                children="₺"
                                            />
                                            <Input
                                                {...field}
                                                placeholder="Enter the price"
                                                type="number"
                                            />
                                        </InputGroup>
                                        <Text
                                            w="100%"
                                            fontSize="sm"
                                            color="red"
                                        >
                                            {errors?.price?.message}
                                        </Text>
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="image"
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <Input
                                            placeholder="Image(WIP) pass random string"
                                            my="0.5rem"
                                            {...field}
                                        />
                                        <Text
                                            w="100%"
                                            fontSize="sm"
                                            color="red"
                                        >
                                            {errors?.image?.message}
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
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            loadingText="Adding Product"
                            type="submit"
                            colorScheme="blue"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Submit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default AddProduct;
