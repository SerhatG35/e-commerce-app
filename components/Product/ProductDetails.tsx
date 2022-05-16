import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import Breadcrumb from "components/Breadcrumb";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Product } from "service/axios";
import { capitalize } from "utils/capitalize";

const ProductDetails = () => {
    const [productDetails, setProductDetails] = useState<
        Global.Products.Product | undefined
    >(undefined);
    const router = useRouter();
    const { _id } = router.query;

    const getProduct = async () => {
        setProductDetails(await Product.GET(_id as string));
    };

    useEffect(() => {
        getProduct();
    }, []);

    const colors = useColorModeValue("#583870", "#ECFEAA");

    return (
        <>
            {productDetails && (
                <Flex
                    userSelect="none"
                    h="100%"
                    flexDir="column"
                    maxW="1200px"
                    w="100%"
                    fontSize="1.1rem"
                    px={["1rem", "1rem", "3rem", "3rem", "unset"]}
                >
                    <Head>
                        <title>{`${productDetails.title} | ${productDetails.category}`}</title>
                        <meta
                            property="og:title"
                            content="Product"
                            key="product"
                        />
                    </Head>
                    <Breadcrumb
                        parentText={productDetails.category}
                        childText={productDetails.title}
                    />

                    <Heading alignSelf="center" fontFamily="Nunito">
                        {capitalize(productDetails.title)}
                    </Heading>
                    <Flex
                        mt="1rem"
                        w="100%"
                        flexDir={[
                            "column",
                            "column",
                            "column",
                            "column",
                            "row",
                        ]}
                    >
                        <Box
                            w={["100%", "100%", "100%", "100%", "70%"]}
                            h="500px"
                            rounded="6px"
                            overflow="hidden"
                            position="relative"
                        >
                            <Image src={productDetails?.image} layout="fill" />
                        </Box>
                        <Flex
                            pl={["unset", "unset", "unset", "unset", "2rem"]}
                            flexDir="column"
                            w={["100%", "100%", "100%", "100%", "30%"]}
                            rounded="6px"
                            textAlign="start"
                            my={["2rem", "2rem", "2rem", "2rem", "unset"]}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Center flexDir="column">
                                <Avatar
                                    size="xl"
                                    name={productDetails.userNameAndSurname}
                                    cursor="pointer"
                                    onClick={() =>
                                        router.push(
                                            `/profile/${productDetails.user}`
                                        )
                                    }
                                />
                                <Flex mt="1rem">
                                    <Text
                                        color={colors}
                                        mr="1rem"
                                        fontWeight="bold"
                                    >
                                        Seller:
                                    </Text>
                                    <Text>
                                        {productDetails.userNameAndSurname}
                                    </Text>
                                </Flex>
                            </Center>
                            <Center flexDir="column">
                                <Flex>
                                    <Text
                                        color={colors}
                                        mr="0.5rem"
                                        fontWeight="bold"
                                    >
                                        Category:
                                    </Text>
                                    <Text>{productDetails.category}</Text>
                                </Flex>
                                <Flex>
                                    <Text
                                        color={colors}
                                        mr="0.5rem"
                                        fontWeight="bold"
                                    >
                                        Price:
                                    </Text>
                                    <Text color="#85bb65">
                                        {new Intl.NumberFormat("tr-TR", {
                                            style: "currency",
                                            currency: "TRY",
                                            maximumSignificantDigits: 3,
                                        }).format(Number(productDetails.price))}
                                    </Text>
                                </Flex>
                            </Center>
                            <Button
                                mt="1rem"
                                w={["50%", "50%", "50%", "50%", "100%"]}
                                colorScheme="blue"
                            >
                                Contact the seller
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex mt="2rem" flexDir="column">
                        <Text color={colors} mr="0.5rem" fontWeight="bold">
                            Description
                        </Text>
                        <Text>{productDetails.description}</Text>
                    </Flex>
                </Flex>
            )}
        </>
    );
};

export default ProductDetails;
