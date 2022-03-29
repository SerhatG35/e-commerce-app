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
                >
                    <Head>
                        <title>{productDetails.title}</title>
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
                    <Flex mt="1rem" w="100%">
                        <Box
                            w="70%"
                            h="500px"
                            rounded="6px"
                            overflow="hidden"
                            position="relative"
                            style={{ boxShadow: "0px 5px 3px #f4f4f4" }}
                        >
                            <Image src={productDetails?.image} layout="fill" />
                        </Box>
                        <Flex
                            pl="2rem"
                            flexDir="column"
                            w="30%"
                            rounded="6px"
                            textAlign="start"
                            justifyContent="space-between"
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
                                        }).format(productDetails.price)}
                                    </Text>
                                </Flex>
                            </Center>
                            <Button mt="1rem" colorScheme="blue">
                                Contact the seller
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex mt="2rem">
                        <Text color={colors} mr="0.5rem" fontWeight="bold">
                            Description:
                        </Text>
                        <Text>{productDetails.description}</Text>
                    </Flex>
                </Flex>
            )}
        </>
    );
};

export default ProductDetails;
