import {
    Center,
    IconButton,
    Skeleton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Product } from "service/axios";
import { Toaster } from "utils/Toster";

type InferedProductDetail = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

type StateTypes = {
    purchaseRequests: Global.Products.PurchaseRequestsResponse[] | undefined;
    isFetchingData: boolean;
};

const PurchaseRequest = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();
    const [{ purchaseRequests, isFetchingData }, setState] =
        useState<StateTypes>({
            purchaseRequests: undefined,
            isFetchingData: false,
        });

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    const getPurchaseRequests = async () => {
        setState((state) => ({ ...state, isFetchingData: true }));
        try {
            const response = await Product.GET_PURCHASE_REQUEST(
                userToken?.userToken?._id
            );
            setState((state) => ({
                ...state,
                purchaseRequests: response,
                isFetchingData: false,
            }));
        } catch (error: any) {
            setState((state) => ({
                ...state,
                isFetchingData: false,
            }));
            Toaster(
                "",
                `${error.response?.data ?? "An error occurred"}`,
                "error"
            );
        }
    };

    const rejectPurchaseRequest = async (purchaseId: string) => {
        try {
            await Product.REJECT_PURCHASE_REQUEST(purchaseId);
            getPurchaseRequests();
        } catch (error: any) {
            Toaster(
                "",
                `${error.response?.data ?? "An error occurred"}`,
                "error"
            );
        }
    };

    useEffect(() => {
        userToken?.userToken?._id !== undefined && getPurchaseRequests();
    }, [userToken?.userToken?._id]);

    return (
        <Center w="100%" pt="11vh">
            <Head>
                <title>Purchase Requests</title>
                <meta
                    property="og:purchase"
                    content="Purchase Requests"
                    key="purchase"
                />
            </Head>
            <Center
                userSelect="none"
                h="100%"
                flexDir="column"
                maxW="1200px"
                w="100%"
            >
                {!isFetchingData ? (
                    <TableContainer w="100%" boxShadow="xl" p="3" rounded="6px">
                        <Table colorScheme="blue" size="lg">
                            <TableCaption
                                fontStyle="italic"
                                textAlign="left"
                                placement="top"
                                textDecoration="underline"
                            >
                                Received purchase requests
                            </TableCaption>
                            {purchaseRequests && (
                                <Thead>
                                    <Tr>
                                        <Th>FROM</Th>
                                        <Th>PRODUCT NAME</Th>
                                        <Th>CATEGORY</Th>
                                        <Th>MESSAGE</Th>
                                        <Th isNumeric>PRICE</Th>
                                        <Th>ACTION</Th>
                                    </Tr>
                                </Thead>
                            )}
                            <Tbody>
                                {purchaseRequests ? (
                                    purchaseRequests.map((request) => (
                                        <Tr key={request._id}>
                                            <Td>
                                                <Link
                                                    href={`/profile/${request.buyerId}`}
                                                >
                                                    {request.buyerName}
                                                </Link>
                                            </Td>
                                            <Td>
                                                <Link
                                                    href={`/product/${request.productId}`}
                                                >
                                                    {request.productName}
                                                </Link>
                                            </Td>
                                            <Td>{request.productCategory}</Td>
                                            <Td maxW="200px" isTruncated>
                                                {(
                                                    <Tooltip
                                                        label={request.message}
                                                        hasArrow
                                                        placement="left"
                                                    >
                                                        {request.message}
                                                    </Tooltip>
                                                ) ?? "-"}
                                            </Td>
                                            <Td isNumeric>
                                                {new Intl.NumberFormat(
                                                    "tr-TR",
                                                    {
                                                        style: "currency",
                                                        currency: "TRY",
                                                        maximumSignificantDigits: 4,
                                                    }
                                                ).format(Number(request.price))}
                                            </Td>
                                            <Td>
                                                <IconButton
                                                    aria-label="reject"
                                                    onClick={() =>
                                                        rejectPurchaseRequest(
                                                            request._id
                                                        )
                                                    }
                                                    colorScheme="red"
                                                    icon={
                                                        <AiOutlineCloseCircle
                                                            size={25}
                                                        />
                                                    }
                                                />
                                                <IconButton
                                                    ml="0.5rem"
                                                    aria-label="approve"
                                                    colorScheme="green"
                                                    icon={
                                                        <AiOutlineCheckCircle
                                                            size={25}
                                                        />
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr w="100%">
                                        <Td>No purchase request was found</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Skeleton height="350px" w="100%" />
                )}
            </Center>
        </Center>
    );
};

export default PurchaseRequest;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const token = cookies(context);

    if (!token.accessToken) {
        return { props: {}, redirect: { permanent: false, destination: "/" } };
    }

    return { props: { token } };
};
