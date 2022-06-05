import { Center } from "@chakra-ui/react";
import Table from "components/Table";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Product } from "service/axios";
import { Toaster } from "utils/Toster";

type InferedProductDetail = InferGetServerSidePropsType<
    typeof getServerSideProps
>;

type StateTypes = {
    receivedPurchaseRequests:
        | Global.Products.PurchaseRequestsTypes[]
        | undefined;
    sendedPurchaseRequests: Global.Products.PurchaseRequestsTypes[] | undefined;
    isFetchingData: boolean;
    isRejectingPurchaseRequest: boolean;
};

const PurchaseRequest = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();
    const [
        {
            receivedPurchaseRequests,
            sendedPurchaseRequests,
            isFetchingData,
            isRejectingPurchaseRequest,
        },
        setState,
    ] = useState<StateTypes>({
        receivedPurchaseRequests: undefined,
        sendedPurchaseRequests: undefined,
        isFetchingData: false,
        isRejectingPurchaseRequest: false,
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
                receivedPurchaseRequests: response.receivedPurchaseRequests,
                sendedPurchaseRequests: response.sendedPurchaseRequests,
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
        setState((state) => ({ ...state, isRejectingPurchaseRequest: true }));
        try {
            await Product.REJECT_PURCHASE_REQUEST(purchaseId);
            setState((state) => ({
                ...state,
                isRejectingPurchaseRequest: false,
            }));
            getPurchaseRequests();
        } catch (error: any) {
            setState((state) => ({
                ...state,
                isRejectingPurchaseRequest: false,
            }));
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
                <Center mt="1rem" w="100%">
                    <Table
                        data={receivedPurchaseRequests}
                        isFetchingData={isFetchingData}
                        rejectPurchaseRequest={rejectPurchaseRequest}
                        isReceivedPurchaseRequest={true}
                        isRejectingPurchaseRequest={isRejectingPurchaseRequest}
                    />
                </Center>
                <Center mt="1rem" w="100%">
                    <Table
                        data={sendedPurchaseRequests}
                        isFetchingData={isFetchingData}
                        rejectPurchaseRequest={rejectPurchaseRequest}
                        isReceivedPurchaseRequest={false}
                        isRejectingPurchaseRequest={isRejectingPurchaseRequest}
                    />
                </Center>
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
