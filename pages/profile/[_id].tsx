import { Box, Center } from "@chakra-ui/react";
import UserProducts from "components/Product/UserProducts";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import Head from "next/head";
import { useEffect } from "react";

type InferedProfile = InferGetServerSidePropsType<typeof getServerSideProps>;

const Profile = ({ token }: InferedProfile) => {
    const userToken = useUserToken();

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    return (
        <Box pt="11vh" w="100%">
            <Head>
                <title>Profile</title>
                <meta property="og:title" content="Profile" key="title" />
            </Head>
            <Center
                m="auto"
                maxW="1200px"
                h="89vh"
                flexDir="column"
                justifyContent="flex-start"
            >
                <UserProducts />
            </Center>
        </Box>
    );
};

export default Profile;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const token = cookies(context);

    if (!token.accessToken)
        return { props: {}, redirect: { permanent: false, destination: "/" } };

    return { props: { token } };
};
