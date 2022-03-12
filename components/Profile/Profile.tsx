import { Center, Divider, Grid, Text } from "@chakra-ui/react";
import Product from "components/Product/Product";
import ProfileBar from "components/Profile/ProfileBar";
import { Toaster } from "components/Toster";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import AddProduct from "../Product/AddProduct";

const Profile = () => {
    const [products, setProducts] = useState<
        Global.Products.Product[] | undefined
    >(undefined);
    const [user, setUser] = useState<Global.User.UserInfo | undefined>(
        undefined
    );

    const [allProducts] = useAtom(ProductJotai);

    const router = useRouter();
    const { _id } = router.query;

    const getUserInfoAndProducts = async (id: string) => {
        await Promise.all([User.INFO(id), User.PRODUCTS(id)])
            .then((result) => {
                setUser(result[0]);
                setProducts(result[1]);
            })
            .catch((error: any) =>
                Toaster("Oops", `${error.response.data}`, "error")
            );
    };

    useEffect(() => {
        getUserInfoAndProducts(_id as string);
    }, [allProducts]);

    return (
        <>
            {products && user ? (
                <Center w="100%" h="100%">
                    <ProfileBar user={user} />
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
            ) : (
                <div>Cannot find user</div>
            )}
        </>
    );
};

export default Profile;
