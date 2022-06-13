import {
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

type ApprovePurchaseRequestProps = {
    isApproving?: boolean;
    approvePurchaseRequest: (
        purchaseId: string,
        approvedUserId?: string
    ) => Promise<void>;
    purchaseRequestInfo: Global.Products.PurchaseRequestsTypes;
};

const ApprovePurchaseRequest: FC<ApprovePurchaseRequestProps> = ({
    isApproving,
    approvePurchaseRequest,
    purchaseRequestInfo,
}) => {
    return (
        <Popover isLazy placement="bottom">
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        <IconButton
                            ml="0.5rem"
                            aria-label="approve"
                            colorScheme="green"
                            icon={<AiOutlineCheckCircle size={25} />}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        fontSize={[
                            "0.75rem",
                            "0.75rem",
                            "0.85rem",
                            "0.85rem",
                            "1rem",
                        ]}
                        _focus={{ outline: "none" }}
                    >
                        <PopoverHeader
                            pt={4}
                            fontWeight="semibold"
                            textAlign="start"
                            border="0"
                            whiteSpace="normal"
                        >
                            Are you sure you want to approve this purchase
                            request?
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverFooter
                            border="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            pb={4}
                        >
                            <Button
                                colorScheme="blue"
                                onClick={onClose}
                                fontSize="inherit"
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={() =>
                                    approvePurchaseRequest(
                                        purchaseRequestInfo._id,
                                        purchaseRequestInfo.buyerId
                                    )
                                }
                                isLoading={isApproving}
                                loadingText="Approving"
                                fontSize="inherit"
                            >
                                Approve
                            </Button>
                        </PopoverFooter>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};

export default ApprovePurchaseRequest;
