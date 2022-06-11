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
    InputLeftAddon,
    NumberInput,
    NumberInputField,
    Select,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "components/ImageUpload";
import { useUserToken } from "context/userContext";
import Router from "next/router";
import { FC, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { Product } from "service/axios";
import { Toaster } from "utils/Toster";
import { productCategories } from "../../constants";
import { addProductSchema } from "./ProductSchema";

type AddProductProps = {
    reFetch: () => Promise<void>;
};

const AddProduct: FC<AddProductProps> = ({ reFetch }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset,
        getValues,
    } = useForm<Global.Products.AddProduct>({
        resolver: yupResolver(addProductSchema),
        defaultValues: {
            title: "",
            category: "",
            price: "",
            image: "",
            description: "",
        },
    });
    const [loading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    const userToken = useUserToken();

    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const categoryPlaceholderColor = useColorModeValue(
        "blackAlpha.400",
        "whiteAlpha.400"
    );

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
            reFetch();
            Toaster("", "New product added", "success");
            reset();
        } catch (error: any) {
            Router.push("/");
            userToken?.setUserToken(undefined);
            Toaster("", `${error?.response?.data}`, "error");
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
                leftIcon={<AiOutlinePlus />}
                ref={btnRef}
                onClick={onOpen}
                boxShadow="md"
                fontSize="inherit"
            >
                Add New Product
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={closeDrawer}
                finalFocusRef={btnRef}
                autoFocus={false}
                size={isLargerThan768 ? "sm" : "full"}
                colorScheme="pink"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
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
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
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
                                            name="category"
                                            my="0.5rem"
                                            color={
                                                getValues("category")
                                                    ? "inherit"
                                                    : categoryPlaceholderColor
                                            }
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
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
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
                                            <InputLeftAddon
                                                children="₺"
                                                fontSize="1.2rem"
                                                pointerEvents="none"
                                            />
                                            <NumberInput
                                                {...field}
                                                min={0}
                                                w="100%"
                                            >
                                                <NumberInputField
                                                    _focus={{ outline: "none" }}
                                                    borderLeftRadius="0px"
                                                    placeholder="Price"
                                                />
                                            </NumberInput>
                                        </InputGroup>
                                        <Text
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
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
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
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
                                            color="red"
                                            w="100%"
                                            fontSize="sm"
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
                            loadingText="Adding New Product"
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            colorScheme="blue"
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
