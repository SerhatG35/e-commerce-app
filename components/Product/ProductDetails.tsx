import { Center, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import Breadcrumb from "components/Breadcrumb";
import CustomModal from "components/Modal";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Product } from "service/axios";
import { capitalize } from "utils/capitalize";
import { Toaster } from "utils/Toster";
import ContactSellerForm from "./ContactSeller/ContactSellerForm";
import SellerCard from "./SellerCard";

type StateTypes = {
    productDetails: Global.Products.Product | undefined;
    isContactSellerFormOpen: boolean;
    isFetchingData: boolean;
};

const ProductDetails: FC = () => {
    const [
        { isContactSellerFormOpen, isFetchingData, productDetails },
        setState,
    ] = useState<StateTypes>({
        productDetails: undefined,
        isContactSellerFormOpen: false,
        isFetchingData: false,
    });

    const router = useRouter();
    const { _id } = router.query;

    const getProduct = async () => {
        setState((state) => ({ ...state, isFetchingData: true }));
        try {
            const response = await Product.GET(_id as string);
            setState((state) => ({
                ...state,
                isFetchingData: false,
                productDetails: response,
            }));
        } catch (error: any) {
            setState((state) => ({ ...state, isFetchingData: false }));
            Toaster("", `${error?.response?.data}`, "error");
            if (error.response.status === 403)
                userToken?.setUserToken(undefined);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const toggleContactSellerFormModal = (requireRefect: boolean = false) => {
        setState((state) => ({
            ...state,
            isContactSellerFormOpen: !isContactSellerFormOpen,
        }));
        requireRefect && getProduct();
    };

    return (
        <>
            {isFetchingData ? (
                <Skeleton maxW="1200px" w="100%" h="83vh" />
            ) : productDetails ? (
                <Flex
                    userSelect="none"
                    h="100%"
                    flexDir="column"
                    maxW="1200px"
                    w="100%"
                    fontSize="1.1rem"
                    px={["3rem", "3rem", "3rem", "3rem", "unset"]}
                    opacity={productDetails.isItSold ? 0.6 : 1}
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

                    <Heading mt="1rem" alignSelf="center" fontFamily="Nunito">
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
                        <Image
                            src={productDetails?.image}
                            width="1000px"
                            height="500px"
                            className="product-image"
                        />
                        <SellerCard
                            toggleContactSellerFormModal={
                                toggleContactSellerFormModal
                            }
                            productDetails={productDetails}
                        />
                    </Flex>
                    <Flex mt="2rem" flexDir="column">
                        <Text mr="0.5rem" fontWeight="bold">
                            Description
                        </Text>
                        <Text>{productDetails.description}</Text>
                    </Flex>
                    {isContactSellerFormOpen && (
                        <CustomModal
                            content={
                                <ContactSellerForm
                                    closeModal={toggleContactSellerFormModal}
                                    productInfo={productDetails}
                                />
                            }
                            header="Contact the Seller"
                            onClickClose={toggleContactSellerFormModal}
                        />
                    )}
                </Flex>
            ) : (
                <Center>No Product Detail</Center>
            )}
        </>
    );
};

export default ProductDetails;
