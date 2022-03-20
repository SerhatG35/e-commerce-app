import { Center } from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import React, { useEffect } from "react";

type InferedProductDetail = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const PurchaseRequest = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    return <Center pt="11vh">hello world</Center>;
};

export default PurchaseRequest;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const token = cookies(context);

    return { props: { token } };
};
