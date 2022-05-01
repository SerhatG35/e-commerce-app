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
    Select,
    Text,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "components/ImageUpload";
import { useUserToken } from "context/userContext";
import { useAtom } from "jotai";
import Router from "next/router";
import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { Product } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import { Toaster } from "utils/Toster";
import { productCategories } from "../../constants";
import { addProductSchema } from "./ProductSchema";

const AddProduct = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm<Global.Products.AddProduct>({
        resolver: yupResolver(addProductSchema),
        defaultValues: {
            title: "",
            category: "",
            price: 0,
            image: "",
            description: "",
        },
    });
    const [loading, setIsLoading] = useState(false);
    const [, setProducts] = useAtom(ProductJotai);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    const userToken = useUserToken();

    const onSubmit: SubmitHandler<Global.Products.AddProduct> = async (
        data
    ) => {
        const modifiedData: Global.Products.AddProduct = {
            ...data,
            description: data.description.trim(),
        };

        try {
            setIsLoading(true);
            await Product.ADD(modifiedData);
            const { productsList } = await Product.GET_ALL();
            setProducts(productsList);
            Toaster("Success", "", "success");
            reset();
        } catch (error: any) {
            Router.push("/");
            userToken?.setUserToken(undefined);
            Toaster("", `${error.response.data}`, "error");
        }
        setIsLoading(false);
        onClose();
        reset();
    };

    const closeDrawer = () => {
        onClose();
        reset();
    };

    return (
        <>
            <Button
                colorScheme="customPurple"
                color="#fff"
                leftIcon={<AiOutlinePlus />}
                ref={btnRef}
                onClick={onOpen}
                boxShadow="md"
            >
                Add New Product
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={closeDrawer}
                finalFocusRef={btnRef}
                autoFocus={false}
                size="sm"
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
                                name="category"
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value)
                                            }
                                            name="category"
                                            my="0.5rem"
                                        >
                                            {productCategories.map(
                                                (category, index) => (
                                                    <option
                                                        key={category}
                                                        value={category}
                                                        hidden={
                                                            index === 0
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {category}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                        <Text
                                            w="100%"
                                            fontSize="sm"
                                            color="red"
                                        >
                                            {errors?.category?.message}
                                        </Text>
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="price"
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
                                                placeholder="Price"
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
                                render={({ field }) => (
                                    <>
                                        <ImageUpload
                                            field={field}
                                            setValue={setValue}
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
                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <>
                                        <Textarea
                                            resize="none"
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
