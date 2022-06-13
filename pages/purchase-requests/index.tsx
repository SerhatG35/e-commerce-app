import {
    Center,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import Table from "components/Table";
import FilterTable from "components/Table/FilterTable";
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
    isFetchingReceivedData: boolean;
    isFetchingSendedData: boolean;
    isRejectingPurchaseRequest: boolean;
    isApproving: boolean;
    isDeleting: boolean;
};

const PurchaseRequest = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();
    const [tabIndex, setTabIndex] = useState(0);
    const [
        {
            receivedPurchaseRequests,
            sendedPurchaseRequests,
            isFetchingReceivedData,
            isFetchingSendedData,
            isRejectingPurchaseRequest,
            isApproving,
            isDeleting,
        },
        setState,
    ] = useState<StateTypes>({
        receivedPurchaseRequests: undefined,
        sendedPurchaseRequests: undefined,
        isFetchingReceivedData: false,
        isFetchingSendedData: false,
        isRejectingPurchaseRequest: false,
        isApproving: false,
        isDeleting: false,
    });

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    const getReceivedPurchaseRequests = async (filter?: string[]) => {
        setState((state) => ({ ...state, isFetchingReceivedData: true }));
        try {
            const response = await PRequest.GET_RECEIVED_PURCHASE_REQUESTS(
                userToken?.userToken?._id,
                filter
            );
            setState((state) => ({
                ...state,
                receivedPurchaseRequests: response,
                isFetchingReceivedData: false,
            }));
        } catch (error: any) {
            setState((state) => ({
                ...state,
                isFetchingReceivedData: false,
            }));
            Toaster(
                "",
                `${error?.response?.data ?? "An error occurred"}`,
                "error"
            );
            if (error.response.status === 403)
                userToken?.setUserToken(undefined);
        }
    };

    const getSendedPurchaseRequests = async (filter?: string[]) => {
        setState((state) => ({ ...state, isFetchingSendedData: true }));
        try {
            const response = await PRequest.GET_SENDED_PURCHASE_REQUESTS(
                userToken?.userToken?._id,
                filter
            );
            setState((state) => ({
                ...state,
                sendedPurchaseRequests: response,
                isFetchingSendedData: false,
            }));
        } catch (error: any) {
            setState((state) => ({
                ...state,
                isFetchingSendedData: false,
            }));
            Toaster(
                "",
                `${error?.response?.data ?? "An error occurred"}`,
                "error"
            );
            if (error.response.status === 403)
                userToken?.setUserToken(undefined);
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
            getReceivedPurchaseRequests();
            getSendedPurchaseRequests();
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
            if (error.response.status === 403)
                userToken?.setUserToken(undefined);
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
            getReceivedPurchaseRequests();
            getSendedPurchaseRequests();
        } catch (error: any) {
            setState((state) => ({ ...state, isApproving: false }));
            Toaster(
                "",
                `${error?.response?.data ?? "An error occurred"}`,
                "error"
            );
            if (error.response.status === 403)
                userToken?.setUserToken(undefined);
        }
    };

    const deletePurchaseRequest = async (purchaseId: string) => {
        setState((state) => ({ ...state, isDeleting: true }));
        try {
            await PRequest.DELETE_PURCHASE_REQUEST(purchaseId);
            setState((state) => ({ ...state, isDeleting: false }));
            getReceivedPurchaseRequests();
            getSendedPurchaseRequests();
        } catch (error: any) {
            setState((state) => ({ ...state, isDeleting: false }));
            Toaster(
                "",
                `${error?.response?.data ?? "An error occurred"}`,
                "error"
            );
            if (error.response.status === 403)
                userToken?.setUserToken(undefined);
        }
    };

    useEffect(() => {
        userToken?.userToken?._id !== undefined &&
            getReceivedPurchaseRequests();
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
                <Tabs index={tabIndex} isFitted isLazy w="100%">
                    <TabList mx="1rem">
                        <Tab
                            onClick={() => {
                                if (tabIndex !== 0)
                                    getReceivedPurchaseRequests();
                                setTabIndex(0);
                            }}
                            _focus={{ outline: "none" }}
                        >
                            Received Purchase Requests
                        </Tab>
                        <Tab
                            onClick={() => {
                                if (tabIndex !== 1) getSendedPurchaseRequests();
                                setTabIndex(1);
                            }}
                            _focus={{ outline: "none" }}
                        >
                            Sended Purchase Requests
                        </Tab>
                    </TabList>

                    <Center
                        px="1rem"
                        justifyContent="flex-end"
                        w="100%"
                        mt="1.5rem"
                    >
                        <FilterTable
                            tabIndex={tabIndex}
                            getReceivedPurchaseRequests={
                                getReceivedPurchaseRequests
                            }
                            getSendedPurchaseRequests={
                                getSendedPurchaseRequests
                            }
                        />
                    </Center>

                    <TabPanels>
                        <TabPanel>
                            <Table
                                data={receivedPurchaseRequests}
                                isFetchingData={isFetchingReceivedData}
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
                                isFetchingData={isFetchingSendedData}
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
