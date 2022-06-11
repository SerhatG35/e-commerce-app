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
import { AiOutlineCloseCircle } from "react-icons/ai";

type RejectPurchaseRequestProps = {
    isRejecting: boolean;
    rejectPurchaseRequest: (purchaseId: string) => Promise<void>;
    purchaseId: string;
};

const RejectPurchaseRequest: FC<RejectPurchaseRequestProps> = ({
    isRejecting,
    rejectPurchaseRequest,
    purchaseId,
}) => {
    return (
        <Popover isLazy placement="bottom">
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        <IconButton
                            aria-label="reject"
                            colorScheme="red"
                            icon={<AiOutlineCloseCircle size={25} />}
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
                            Are you sure you want to delete this purchase
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
                                colorScheme="red"
                                onClick={() =>
                                    rejectPurchaseRequest(purchaseId)
                                }
                                isLoading={isRejecting}
                                loadingText="Deleting"
                                fontSize="inherit"
                            >
                                Delete
                            </Button>
                        </PopoverFooter>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};

export default RejectPurchaseRequest;
