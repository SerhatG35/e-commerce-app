import { Box, Center } from "@chakra-ui/layout";
import Products from "components/Product/Products";
import { useUserToken } from "context/userContext";
import { useAtom } from "jotai";
import jwtDecode from "jwt-decode";
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import cookies from "next-cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product as ProductService } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import { Toaster } from "utils/Toster";

type InferedHome = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ token }: InferedHome) => {
    const userToken = useUserToken();
    const [products, setProducts] = useAtom(ProductJotai);
    const [highestPrice, setHighestPrice] = useState<number | undefined>(
        undefined
    );
    const router = useRouter();
    const data = router.query;

    const redirectedCategory =
        Object.keys(data).length > 0 ? (data.category as string) : undefined;

    const fetchProductData = async () => {
        try {
            const { highestPrice, productsList } =
                await ProductService.GET_ALL();
            setProducts(productsList);
            setHighestPrice(highestPrice);
        } catch (error: any) {
            Toaster("", `${error.response.data}`, "error");
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        token.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    return (
        <Box w="100%" pt="11vh">
            <Head>
                <title>E-Shop</title>
                <meta property="og:title" content="E-Shop" key="title" />
            </Head>
            <Center
                h="100%"
                maxW="1200px"
                margin="auto"
                alignItems="flex-start"
                justifyContent="space-between"
                position="relative"
            >
                <Center
                    alignItems="flex-start"
                    w="100%"
                    h="100%"
                    position="relative"
                >
                    <Products
                        allProducts={products}
                        allProductHighestPrice={highestPrice}
                        redirectedCategory={redirectedCategory}
                    />
                </Center>
            </Center>
        </Box>
    );
};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    return { props: { token: cookies(context) } };
};

export default Home;
