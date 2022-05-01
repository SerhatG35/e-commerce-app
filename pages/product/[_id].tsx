import { Center } from "@chakra-ui/react";
import ProductDetails from "components/Product/ProductDetails";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import { useEffect } from "react";

type InferedProductDetail = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const ProductDetailPage = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    return (
        <Center pt="11vh" w="100%" pb="3rem">
            <ProductDetails />
        </Center>
    );
};

export default ProductDetailPage;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const token = cookies(context);

    return { props: { token } };
};
