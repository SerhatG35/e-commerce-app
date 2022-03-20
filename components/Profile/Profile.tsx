import { Center, Divider, Grid, Skeleton, Text } from "@chakra-ui/react";
import ProductCard from "components/Product/ProductCard";
import ProfileBar from "components/Profile/ProfileBar";
import { Toaster } from "components/Toster";
import { useUserToken } from "context/userContext";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import { skeletons } from "../../constants";
import AddProduct from "../Product/AddProduct";

interface State {
    user: Global.User.UserInfo | undefined;
    products: Global.Products.Product[] | undefined;
    noUser: boolean | undefined;
}

const Profile = () => {
    const [{ user, products, noUser }, setState] = useState<State>({
        user: undefined,
        products: undefined,
        noUser: undefined,
    });
    const userToken = useUserToken();
    const router = useRouter();
    const { _id } = router.query;

    const [allProducts] = useAtom(ProductJotai);

    const getUserInfoAndProducts = async (id: string) => {
        await Promise.all([User.INFO(id), User.PRODUCTS(id)])
            .then((result) => {
                setState((state) => ({
                    ...state,
                    user: result[0],
                    products: result[1],
                    noUser: false,
                }));
            })
            .catch((error: any) => {
                setState((state) => ({
                    ...state,
                    noUser: true,
                }));
                Toaster("Oops", `${error.response.data}`, "error");
            });
    };

    useEffect(() => {
        getUserInfoAndProducts(_id as string);
    }, [allProducts, _id]);

    const usersOwnProfile = userToken?.userToken?._id === _id;

    return (
        <>
            {!noUser ? (
                <Center w="100%" h="100%" alignItems="flex-start">
                    <ProfileBar user={user} usersOwnProfile={usersOwnProfile} />
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
                            {usersOwnProfile && user ? (
                                <AddProduct />
                            ) : (
                                <Skeleton
                                    h="40px"
                                    w="100%"
                                    startColor="#262355"
                                    endColor="#7B75C7"
                                    rounded="12px"
                                />
                            )}
                        </Center>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            {products?.length !== 0 ? (
                                products ? (
                                    products?.map((userProduct) => {
                                        return (
                                            <ProductCard
                                                key={userProduct._id}
                                                product={userProduct}
                                            />
                                        );
                                    })
                                ) : (
                                    skeletons.map((key) => (
                                        <Skeleton
                                            key={key}
                                            rounded="12px"
                                            width="250px"
                                            height="250px"
                                            m="auto"
                                            startColor="#262355"
                                            endColor="#7B75C7"
                                        />
                                    ))
                                )
                            ) : (
                                <Center h="100vh" alignItems="flex-start">
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
