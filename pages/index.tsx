import { Box, Center } from "@chakra-ui/layout";
import Products from "components/Product/Products";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import cookies from "next-cookies";
import Head from "next/head";
import { useEffect } from "react";

type InferedHome = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ token }: InferedHome) => {
    const userToken = useUserToken();

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
                    <Products />
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
