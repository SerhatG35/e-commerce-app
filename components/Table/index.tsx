import {
    Center,
    Skeleton,
    Table as ChakraTable,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import ApprovePurchaseRequest from "./ApprovePurchaseRequest";
import DeletePurchaseRequest from "./DeletePurchaseRequest";
import FilterTable from "./FilterTable";
import RejectPurchaseRequest from "./RejectPurchaseRequest";
import StatusBadge from "./StatusBadge";

type TableProps = {
    isFetchingData: boolean;
    data: Global.Products.PurchaseRequestsTypes[] | undefined;
    rejectPurchaseRequest: (purchaseId: string) => Promise<void>;
    isReceivedPurchaseRequest: boolean;
    isRejectingPurchaseRequest: boolean;
    approvePurchaseRequest?: (
        purchaseId: string,
        approvedUserId?: string
    ) => Promise<void>;
    isApproving?: boolean;
    isDeleting?: boolean;
    deletePurchaseRequest?: (purchaseId: string) => Promise<void>;
};

const Table: FC<TableProps> = ({
    isFetchingData,
    data,
    rejectPurchaseRequest,
    isReceivedPurchaseRequest,
    isRejectingPurchaseRequest,
    approvePurchaseRequest,
    isApproving,
    isDeleting,
    deletePurchaseRequest,
}) => {
    const havePurchaseRequest = data && data.length !== 0;

    return !isFetchingData ? (
        <TableContainer
            border="1px solid #a1a1a162"
            w="100%"
            boxShadow="lg"
            p="3"
            rounded="6px"
            mb="2rem"
        >
            <ChakraTable variant="striped" colorScheme="blue" size="lg">
                {havePurchaseRequest && (
                    <TableCaption
                        fontStyle="italic"
                        textAlign="left"
                        placement="top"
                        borderBottom="1px solid"
                    >
                        <FilterTable />
                    </TableCaption>
                )}
                {havePurchaseRequest && (
                    <Thead>
                        <Tr>
                            <Th>STATUS</Th>
                            <Th>FROM</Th>
                            {!isReceivedPurchaseRequest && <Th>TO</Th>}
                            <Th>PRODUCT NAME</Th>
                            <Th>CATEGORY</Th>
                            <Th>MESSAGE</Th>
                            <Th isNumeric>PRICE</Th>
                            <Th>ACTION</Th>
                        </Tr>
                    </Thead>
                )}
                <Tbody>
                    {havePurchaseRequest ? (
                        data.map((request) => (
                            <Tr key={request._id}>
                                <Td>
                                    <StatusBadge request={request} />
                                </Td>
                                <Td>
                                    <Center
                                        _hover={{
                                            background: "#77777764",
                                            borderRadius: "6px",
                                        }}
                                        px="2"
                                        py="1"
                                        justifyContent="flex-start"
                                    >
                                        <Link
                                            href={`/profile/${request.buyerId}`}
                                        >
                                            {request.buyerName}
                                        </Link>
                                    </Center>
                                </Td>
                                {!isReceivedPurchaseRequest && (
                                    <Td>
                                        <Center
                                            _hover={{
                                                background: "#77777764",
                                                borderRadius: "6px",
                                            }}
                                            px="2"
                                            py="1"
                                            justifyContent="flex-start"
                                        >
                                            <Link
                                                href={`/profile/${request.sellerId}`}
                                            >
                                                {request.sellerName}
                                            </Link>
                                        </Center>
                                    </Td>
                                )}
                                <Td>
                                    <Center
                                        _hover={{
                                            background: "#77777764",
                                            borderRadius: "6px",
                                        }}
                                        px="2"
                                        py="1"
                                        justifyContent="flex-start"
                                    >
                                        <Link
                                            href={`/product/${request.productId}`}
                                        >
                                            {request.productName}
                                        </Link>
                                    </Center>
                                </Td>
                                <Td>{request.productCategory}</Td>
                                <Td maxW="200px" isTruncated>
                                    {request.message ? (
                                        <Tooltip
                                            label={request.message}
                                            hasArrow
                                            placement="left"
                                        >
                                            {request.message}
                                        </Tooltip>
                                    ) : (
                                        "-"
                                    )}
                                </Td>
                                <Td isNumeric>
                                    {new Intl.NumberFormat("tr-TR", {
                                        style: "currency",
                                        currency: "TRY",
                                        maximumSignificantDigits: 4,
                                    }).format(Number(request.price))}
                                </Td>
                                <Td>
                                    {isReceivedPurchaseRequest &&
                                    request.status === "Pending" ? (
                                        <RejectPurchaseRequest
                                            purchaseId={request._id}
                                            isRejecting={
                                                isRejectingPurchaseRequest
                                            }
                                            rejectPurchaseRequest={
                                                rejectPurchaseRequest
                                            }
                                        />
                                    ) : (
                                        deletePurchaseRequest &&
                                        request.status === "Pending" && (
                                            <DeletePurchaseRequest
                                                isDeleting={isDeleting}
                                                deletePurchaseRequest={
                                                    deletePurchaseRequest
                                                }
                                                purchaseId={request._id}
                                            />
                                        )
                                    )}
                                    {isReceivedPurchaseRequest &&
                                        approvePurchaseRequest &&
                                        request.status === "Pending" && (
                                            <ApprovePurchaseRequest
                                                approvePurchaseRequest={
                                                    approvePurchaseRequest
                                                }
                                                isApproving={isApproving}
                                                purchaseRequestInfo={request}
                                            />
                                        )}
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr w="100%">
                            <Td>
                                {isReceivedPurchaseRequest
                                    ? "No received purchase request was found"
                                    : "No sended purchase request was found"}
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </ChakraTable>
        </TableContainer>
    ) : (
        <Skeleton height="350px" w="100%" />
    );
};

export default Table;
