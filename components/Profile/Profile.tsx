import { Center, Divider, Grid, Text } from "@chakra-ui/react";
import Product from "components/Product/Product";
import ProfileBar from "components/Profile/ProfileBar";
import { Toaster } from "components/Toster";
import { useUserToken } from "context/userContext";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { User } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import AddProduct from "../Product/AddProduct";

const Profile = () => {
    const [allProducts] = useAtom(ProductJotai);
    const [products, setProducts] = useState<
        Global.Products.Product[] | undefined
    >(undefined);
    const userToken = useUserToken();

    const getUserProducts = async (id: string) => {
        try {
            const result = await User.PRODUCTS(id);
            setProducts(result);
        } catch (error: any) {
            if (error.response.status === 404 || error.response === undefined)
                return Toaster(
                    "",
                    "There is a problem with the server please try again",
                    "error"
                );
            Toaster("", `${error.response.data}`, "error");
        }
    };

    useEffect(() => {
        if (userToken?.userToken?._id)
            getUserProducts(userToken?.userToken?._id);
    }, [userToken?.userToken?._id, allProducts]);

    return (
        <Center w="100%" h="100%">
            <ProfileBar user={userToken?.userToken} />
            <Divider orientation="vertical" boxShadow="xl" />
            <Center
                w="80%"
                h="100%"
                pl="3rem"
                pr="1rem"
                flexDir="column"
                justifyContent="flex-start"
            >
                <Center w="100%" mb="1rem" justifyContent="flex-end">
                    <AddProduct />
                </Center>
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

export default Profile;
