import {
    Button,
    Center,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Toaster } from "components/Toster";
import { useAtom } from "jotai";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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

    const onSubmit: SubmitHandler<Global.Products.AddProduct> = async (
        data
    ) => {
        try {
            setIsLoading(true);
            await Product.ADD(data);
            const result = await Product.GET_ALL();
            setProducts(result);
            Toaster("Success", "", "success");
        } catch (error: any) {
            Toaster("", `${error.response.data}`, "error");
        }
        setIsLoading(false);
    };

    return (
        <Center
            w="300px"
            h="300px"
            border="1px solid black"
            flexDir="column"
            px="1rem"
            onSubmit={handleSubmit(onSubmit)}
            as="form"
            textAlign="start"
        >
            <Controller
                control={control}
                name="title"
                defaultValue=""
                render={({ field }) => (
                    <>
                        <Input placeholder="Başlık" my="0.5rem" {...field} />
                        <Text w="100%" fontSize="sm" color="red">
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
                        <Input placeholder="Açıklama" my="0.5rem" {...field} />
                        <Text w="100%" fontSize="sm" color="red">
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
                                placeholder="Fiyatı girin"
                                type="number"
                                borderColor="#1f1f1f"
                            />
                        </InputGroup>
                        <Text w="100%" fontSize="sm" color="red">
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
                        <Text w="100%" fontSize="sm" color="red">
                            {errors?.image?.message}
                        </Text>
                    </>
                )}
            />
            <Button
                isLoading={loading}
                loadingText="Adding Product"
                type="submit"
            >
                Submit
            </Button>
        </Center>
    );
};

export default AddProduct;
