import {
    IconButton,
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
import { AiOutlineCheckCircle } from "react-icons/ai";
import RejectPurchaseRequest from "./RejectPurchaseRequest";

type TableProps = {
    isFetchingData: boolean;
    data: Global.Products.PurchaseRequestsTypes[] | undefined;
    rejectPurchaseRequest: (purchaseId: string) => Promise<void>;
    isReceivedPurchaseRequest: boolean;
    isRejectingPurchaseRequest: boolean;
};

const Table: FC<TableProps> = ({
    isFetchingData,
    data,
    rejectPurchaseRequest,
    isReceivedPurchaseRequest,
    isRejectingPurchaseRequest,
}) => {
    const havePurchaseRequest = data && data.length !== 0;

    return !isFetchingData ? (
        <TableContainer w="100%" boxShadow="xl" p="3" rounded="6px">
            <ChakraTable colorScheme="blue" size="lg">
                <TableCaption
                    fontStyle="italic"
                    textAlign="left"
                    placement="top"
                    textDecoration="underline"
                >
                    {isReceivedPurchaseRequest
                        ? "Received purchase requests"
                        : "Sended purchase requests"}
                </TableCaption>
                {havePurchaseRequest && (
                    <Thead>
                        <Tr>
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
                                    <Link href={`/profile/${request.buyerId}`}>
                                        {request.buyerName}
                                    </Link>
                                </Td>
                                {!isReceivedPurchaseRequest && (
                                    <Td>
                                        <Link
                                            href={`/profile/${request.sellerId}`}
                                        >
                                            {request.sellerName}
                                        </Link>
                                    </Td>
                                )}
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
                                    {new Intl.NumberFormat("tr-TR", {
                                        style: "currency",
                                        currency: "TRY",
                                        maximumSignificantDigits: 4,
                                    }).format(Number(request.price))}
                                </Td>
                                <Td>
                                    <RejectPurchaseRequest
                                        purchaseId={request._id}
                                        isRejecting={isRejectingPurchaseRequest}
                                        rejectPurchaseRequest={
                                            rejectPurchaseRequest
                                        }
                                    />
                                    {isReceivedPurchaseRequest && (
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
