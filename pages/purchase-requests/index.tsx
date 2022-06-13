import {
    Center,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import Table from "components/Table";
import { useUserToken } from "context/userContext";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { PurchaseRequest as PRequest } from "service/axios";
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
    isApproving: boolean;
    isDeleting: boolean;
};

const PurchaseRequest = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();
    const [
        {
            receivedPurchaseRequests,
            sendedPurchaseRequests,
            isFetchingData,
            isRejectingPurchaseRequest,
            isApproving,
            isDeleting,
        },
        setState,
    ] = useState<StateTypes>({
        receivedPurchaseRequests: undefined,
        sendedPurchaseRequests: undefined,
        isFetchingData: false,
        isRejectingPurchaseRequest: false,
        isApproving: false,
        isDeleting: false,
    });

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    const getPurchaseRequests = async () => {
        setState((state) => ({ ...state, isFetchingData: true }));
        try {
            const response = await PRequest.GET_PURCHASE_REQUEST(
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
                `${error?.response?.data ?? "An error occurred"}`,
                "error"
            );
        }
    };

    const rejectPurchaseRequest = async (purchaseId: string) => {
        setState((state) => ({ ...state, isRejectingPurchaseRequest: true }));
        try {
            await PRequest.REJECT_PURCHASE_REQUEST(purchaseId);
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
                `${error?.response?.data ?? "An error occurred"}`,
                "error"
            );
        }
    };

    const approvePurchaseRequest = async (
        purchaseId: string,
        approvedUserId?: string
    ) => {
        setState((state) => ({ ...state, isApproving: true }));
        try {
            await PRequest.APPROVE_PURCHASE_REQUEST(purchaseId, approvedUserId);
            setState((state) => ({ ...state, isApproving: false }));
            getPurchaseRequests();
        } catch (error: any) {
            setState((state) => ({ ...state, isApproving: false }));
            Toaster(
                "",
                `${error?.response?.data ?? "An error occurred"}`,
                "error"
            );
        }
    };

    const deletePurchaseRequest = async (purchaseId: string) => {
        setState((state) => ({ ...state, isDeleting: true }));
        try {
            await PRequest.DELETE_PURCHASE_REQUEST(purchaseId);
            setState((state) => ({ ...state, isDeleting: false }));
            getPurchaseRequests();
        } catch (error: any) {
            setState((state) => ({ ...state, isDeleting: false }));
            Toaster(
                "",
                `${error?.response?.data ?? "An error occurred"}`,
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
                <Tabs isFitted isLazy w="100%">
                    <TabList>
                        <Tab _focus={{ outline: "none" }}>
                            Received Purchase Requests
                        </Tab>
                        <Tab _focus={{ outline: "none" }}>
                            Sended Purchase Requests
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Table
                                data={receivedPurchaseRequests}
                                isFetchingData={isFetchingData}
                                rejectPurchaseRequest={rejectPurchaseRequest}
                                isReceivedPurchaseRequest={true}
                                isRejectingPurchaseRequest={
                                    isRejectingPurchaseRequest
                                }
                                approvePurchaseRequest={approvePurchaseRequest}
                                isApproving={isApproving}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Table
                                data={sendedPurchaseRequests}
                                isFetchingData={isFetchingData}
                                rejectPurchaseRequest={rejectPurchaseRequest}
                                isReceivedPurchaseRequest={false}
                                isRejectingPurchaseRequest={
                                    isRejectingPurchaseRequest
                                }
                                deletePurchaseRequest={deletePurchaseRequest}
                                isDeleting={isDeleting}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
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
