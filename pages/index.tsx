import { Box, Center } from "@chakra-ui/layout";
import Products from "components/Product/Products";
import { useUserToken } from "context/userContext";
import { useAtom } from 'jotai';
import jwtDecode from "jwt-decode";
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import cookies from "next-cookies";
import Head from "next/head";
import { useEffect } from "react";
import { products as ProductJotai } from "store/jotaiStore";
import { Product as ProductService } from "service/axios";
import { Toaster } from 'utils/Toster';

type InferedHome = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ token }: InferedHome) => {
    const userToken = useUserToken();
    const [products, setProducts] = useAtom(ProductJotai);

    const fetchProductData = async () => {
        try {
            const result = await ProductService.GET_ALL();
            setProducts(result);
        } catch (error: any) {
            if (error.response?.status === 404 || error.response === undefined)
                return Toaster(
                    "",
                    "There is a problem with the server please try again",
                    "error"
                );
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
                <Center alignItems="flex-start" w="100%" h="100%">
                    <Products productList={products}/>
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
