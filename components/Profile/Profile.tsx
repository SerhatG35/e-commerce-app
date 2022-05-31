import { Center, Divider, Grid, Skeleton, Text } from "@chakra-ui/react";
import ProductCard from "components/Product/ProductCard";
import ProfileBar from "components/Profile/ProfileBar";
import { useUserToken } from "context/userContext";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import { Toaster } from "utils/Toster";
import { skeletons } from "../../constants";
import AddProduct from "../Product/AddProduct";

interface State {
    user: Global.User.UserInfo | undefined;
    products: Global.Products.Product[] | undefined;
    noUser: boolean | undefined;
    isFetchingData: boolean;
}

const Profile = () => {
    const [{ user, products, noUser, isFetchingData }, setState] =
        useState<State>({
            user: undefined,
            products: undefined,
            noUser: undefined,
            isFetchingData: false,
        });
    const userToken = useUserToken();
    const router = useRouter();
    const { _id } = router.query;

    const [allProducts] = useAtom(ProductJotai);

    const getUserInfoAndProducts = async () => {
        setState((state) => ({ ...state, isFetchingData: true }));

        const userId = _id as string;

        await Promise.all([User.INFO(userId), User.PRODUCTS(userId)])
            .then((result) => {
                setState((state) => ({
                    ...state,
                    user: result[0],
                    products: result[1],
                    noUser: false,
                    isFetchingData: false,
                }));
            })
            .catch((error: any) => {
                setState((state) => ({
                    ...state,
                    noUser: true,
                    isFetchingData: false,
                }));
                Toaster("Oops", `${error.response.data}`, "error");
            });
    };

    useEffect(() => {
        getUserInfoAndProducts();
    }, [allProducts, _id]);

    const usersOwnProfile = userToken?.userToken?._id === _id;

    return (
        <>
            {!noUser ? (
                <Center w="100%" h="89vh" alignItems="flex-start">
                    <ProfileBar
                        user={user}
                        isFetchingData={isFetchingData}
                        reFetch={getUserInfoAndProducts}
                        usersOwnProfile={usersOwnProfile}
                    />
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
                            {usersOwnProfile && user && (
                                <AddProduct reFetch={getUserInfoAndProducts} />
                            )}
                        </Center>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            {isFetchingData
                                ? skeletons.map((key) => (
                                      <Skeleton
                                          key={key}
                                          rounded="12px"
                                          width="250px"
                                          height="250px"
                                          m="auto"
                                          startColor="#ebf4f5"
                                          endColor="#b5c6e0"
                                      />
                                  ))
                                : products?.map((userProduct) => (
                                      <ProductCard
                                          key={userProduct._id}
                                          product={userProduct}
                                          usersOwnProfile={usersOwnProfile}
                                          reFetch={getUserInfoAndProducts}
                                      />
                                  ))}
                        </Grid>
                        {products?.length === 0 && (
                            <Text fontSize="inherit">
                                You don't have any products.
                            </Text>
                        )}
                    </Center>
                </Center>
            ) : (
                <Text>Cannot find user</Text>
            )}
        </>
    );
};

export default Profile;
