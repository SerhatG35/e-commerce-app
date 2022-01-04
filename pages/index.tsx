import { Box, Center } from "@chakra-ui/layout";
import Cards from "components/Cards";
import Filter from "components/Filter";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import cookies from "next-cookies";
import { useEffect } from "react";

interface HomeProps {
    token: Record<string, string | undefined>;
}

const Home: NextPage<HomeProps> = ({ token }) => {
    const userToken = useUserToken();

    useEffect(() => {
        token.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    return (
        <Box w="100%" pt="10vh">
            <Center
                pt="1rem"
                maxW="1200px"
                h="90vh"
                margin="auto"
                alignItems="flex-start"
                justifyContent="space-between"
            >
                <Filter />
                <Cards />
            </Center>
        </Box>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return { props: { token: cookies(context) } };
};

export default Home;
