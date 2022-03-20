import {
    Avatar,
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";
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

    const [breakpoint] = useMediaQuery("(min-width: 1095px)");

    const productInfoBg = useColorModeValue("#583870", "#C5DCA0");
    const productInfoColor = useColorModeValue("#fff", "#1f1f1f");

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
                    <Flex
                        justifyContent="space-between"
                        flexDir={breakpoint ? "row" : "column"}
                        w="75%"
                        alignItems={breakpoint ? "" : "center"}
                    >
                        <Box height="400px" rounded="6px" overflow="hidden">
                            <Image
                                src={productDetails?.image}
                                width="600px"
                                height="400px"
                            />
                        </Box>
                        <Center
                            mt={breakpoint ? "" : "1rem"}
                            flexDir="column"
                            ml="2rem"
                        >
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
                            <Divider />
                            <Text>{productDetails.userNameAndSurname}</Text>
                        </Center>
                    </Flex>
                    <Flex
                        p="1rem"
                        mt="1rem"
                        flexDir="column"
                        w="75%"
                        rounded="6px"
                        textAlign="start"
                        bg={productInfoBg}
                        color={productInfoColor}
                        fontSize="1.1rem"
                    >
                        <Heading fontFamily="Nunito">
                            {capitalize(productDetails.title)}
                        </Heading>
                        <Flex>
                            <Text color="plum" mr="0.5rem" fontWeight="bold">
                                Category:
                            </Text>
                            <Text>{productDetails.category}</Text>
                        </Flex>
                        <Flex>
                            <Text color="plum" mr="0.5rem" fontWeight="bold">
                                Price:
                            </Text>
                            <Text color="#85bb65">
                                {productDetails.price !== "" &&
                                    new Intl.NumberFormat("tr-TR", {
                                        style: "currency",
                                        currency: "TRY",
                                    }).format(productDetails.price)}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text color="plum" mr="0.5rem" fontWeight="bold">
                                Description:
                            </Text>
                            <Text>{productDetails.description}</Text>
                        </Flex>
                        <Button mt="1rem" colorScheme="blue">
                            Contact Seller
                        </Button>
                    </Flex>
                </Flex>
            )}
        </>
    );
};

export default ProductDetails;
