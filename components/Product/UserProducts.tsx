import { Center, Divider, Grid, Text } from "@chakra-ui/react";
import Product from "components/Product/Product";
import Profile from "components/Profile";
import { Toaster } from "components/Toster";
import { useUserToken } from "context/userContext";
import { useEffect, useState } from "react";
import { Product as ProductService } from "service/axios";
import AddProduct from "./AddProduct";

const UserProducts = () => {
    const [products, setProducts] = useState<
        Global.Products.Product[] | undefined
    >(undefined);
    const userToken = useUserToken();

    const getUserProducts = async (id: string) => {
        try {
            const result = await ProductService.GET(id);
            setProducts(result);
        } catch (error: any) {
            Toaster("", `${error.response.data}`, "error");
        }
    };

    useEffect(() => {
        if (userToken?.userToken?._id)
            getUserProducts(userToken?.userToken?._id);
    }, [userToken?.userToken?._id]);

    return (
        <Center w="100%" h="100%">
            <Profile user={userToken?.userToken} />
            <Divider orientation="vertical" boxShadow="xl" />
            <Center
                w="80%"
                h="100%"
                px="3rem"
                flexDir="column"
                justifyContent="flex-start"
            >
                <AddProduct />
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {products?.length !== 0 ? (
                        products?.map((userProduct) => {
                            return (
                                <Product
                                    key={userProduct._id}
                                    product={userProduct}
                                />
                            );
                        })
                    ) : (
                        <Center alignItems="flex-start">
                            <Text fontSize="xl">
                                You don't have any products.
                            </Text>
                        </Center>
                    )}
                </Grid>
            </Center>
        </Center>
    );
};

export default UserProducts;
