import {
    Center,
    IconButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import Head from "next/head";
import React, { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

type InferedProductDetail = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

const PurchaseRequest = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    const borderColor = useColorModeValue("#e2e8f0", "#ffffff29");

    return (
        <Center pt="11vh">
            <Head>
                <title>Purchase Requests</title>
                <meta
                    property="og:purchase"
                    content="Purchase Requests"
                    key="purchase"
                />
            </Head>
            <TableContainer
                border={`1px solid ${borderColor}`}
                p="3"
                rounded="14px"
            >
                <Table size="lg">
                    <TableCaption>Lorem ipsum dolor sit amet.</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>FROM</Th>
                            <Th>PRODUCT NAME</Th>
                            <Th>CATEGORY</Th>
                            <Th isNumeric>PRICE</Th>
                            <Th>ACTION</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Serhat Genç</Td>
                            <Td>House</Td>
                            <Td>House and Furniture</Td>
                            <Td isNumeric>25.000$</Td>
                            <Td>
                                <IconButton
                                    colorScheme="red"
                                    aria-label="reject"
                                    icon={<AiOutlineCloseCircle size={25} />}
                                />
                                <IconButton
                                    ml="0.5rem"
                                    colorScheme="green"
                                    aria-label="approve"
                                    icon={<AiOutlineCheckCircle size={25} />}
                                />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>John Doe</Td>
                            <Td>BMW</Td>
                            <Td>Vehicle</Td>
                            <Td isNumeric>2.000$</Td>
                            <Td>
                                <IconButton
                                    colorScheme="red"
                                    aria-label="reject"
                                    icon={<AiOutlineCloseCircle size={25} />}
                                />
                                <IconButton
                                    ml="0.5rem"
                                    colorScheme="green"
                                    aria-label="approve"
                                    icon={<AiOutlineCheckCircle size={25} />}
                                />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
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
