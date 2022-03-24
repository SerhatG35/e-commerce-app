import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Text,
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

    return (
        <>
            {productDetails && (
                <Flex
                    alignItems="center"
                    userSelect="none"
                    h="100%"
                    flexDir="column"
                    maxW="1200px"
                    w="100%"
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
                        parentPath={`/profile/${productDetails.user}`}
                        parentText={productDetails.userNameAndSurname}
                        childText={productDetails.title}
                    />

                    <Flex mt="1rem" w="100%">
                        <Box
                            w="70%"
                            h="500px"
                            rounded="6px"
                            overflow="hidden"
                            position="relative"
                            boxShadow="xl"
                        >
                            <Image src={productDetails?.image} layout="fill" />
                        </Box>
                        <Flex
                            pl="2rem"
                            flexDir="column"
                            w="30%"
                            rounded="6px"
                            textAlign="start"
                            fontSize="1.1rem"
                            justifyContent="space-between"
                        >
                            <Heading alignSelf="center" fontFamily="Nunito">
                                {capitalize(productDetails.title)}
                            </Heading>
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
                                <Text mt="1rem" fontWeight="bold">
                                    Seller:
                                </Text>
                                <Text>{productDetails.userNameAndSurname}</Text>
                            </Center>
                            <Flex flexDir="column">
                                <Flex>
                                    <Text
                                        color="plum"
                                        mr="0.5rem"
                                        fontWeight="bold"
                                    >
                                        Category:
                                    </Text>
                                    <Text>{productDetails.category}</Text>
                                </Flex>
                                <Flex>
                                    <Text
                                        color="plum"
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
                                <Flex>
                                    <Text
                                        color="plum"
                                        mr="0.5rem"
                                        fontWeight="bold"
                                    >
                                        Description:
                                    </Text>
                                    <Text>{productDetails.description}</Text>
                                </Flex>
                            </Flex>
                            <Button mt="1rem" colorScheme="blue">
                                Contact the seller
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </>
    );
};

export default ProductDetails;
