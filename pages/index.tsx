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

type StateTypes = {
    highestPriceAvailable?: number;
    isFetchingData: boolean;
};

const Home = ({ token }: InferedHome) => {
    const [{ isFetchingData, highestPriceAvailable }, setState] =
        useState<StateTypes>({
            highestPriceAvailable: undefined,
            isFetchingData: false,
        });

    const userToken = useUserToken();
    const [products, setProducts] = useAtom(ProductJotai);
    const router = useRouter();

    const data = router.query;

    const redirectedCategory =
        Object.keys(data).length > 0 ? (data.category as string) : undefined;

    const fetchProducts = async (
        category?: string,
        priceRange?: number[],
        shouldCategoryIncluded: boolean = true
    ) => {
        setState((state) => ({ ...state, isFetchingData: true }));
        try {
            const { highestPrice, productsList } = await ProductService.GET_ALL(
                {
                    ...(shouldCategoryIncluded && {
                        category: category ?? redirectedCategory,
                    }),
                    priceRange,
                }
            );
            setProducts(productsList);
            setState((state) => ({
                ...state,
                highestPriceAvailable: highestPrice,
                isFetchingData: false,
            }));
        } catch (error: any) {
            Toaster("Error", `${error?.response?.data}`, "error");
            setState((state) => ({
                ...state,
                isFetchingData: false,
            }));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        token.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    const reFetchProducts = (
        category?: string,
        priceRange?: number[],
        shouldCategoryIncluded?: boolean
    ) => {
        const modifiedData = {
            category,
            priceRange,
        };
        category === "" && delete modifiedData.category;
        priceRange?.length === 0 && delete modifiedData.priceRange;

        fetchProducts(
            modifiedData.category,
            modifiedData.priceRange,
            shouldCategoryIncluded
        );
    };

    return (
        <Box w="100%" pt="9vh">
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
                    alignItems={[
                        "center",
                        "center",
                        "center",
                        "center",
                        "flex-start",
                    ]}
                    w="100%"
                    h="100%"
                    position="relative"
                    flexDir={["column", "column", "column", "column", "row"]}
                >
                    <Products
                        allProducts={products}
                        allProductHighestPrice={highestPriceAvailable}
                        redirectedCategory={redirectedCategory}
                        isFetchingProducts={isFetchingData}
                        reFetchProducts={reFetchProducts}
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
