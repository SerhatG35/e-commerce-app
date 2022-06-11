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
import React, { FC, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { Product } from "service/axios";
import { Toaster } from "utils/Toster";

type DeleteProductPopoverProps = {
    reFetch: (() => Promise<void>) | undefined;
    product: Global.Products.Product;
};

const DeleteProductPopover: FC<DeleteProductPopoverProps> = ({
    product,
    reFetch,
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteProduct = async () => {
        setIsDeleting(true);
        try {
            await Product.DELETE(product._id);
            setIsDeleting(false);
            Toaster(
                "Success",
                "You have successfully deleted the product.",
                "success"
            );
            reFetch?.();
        } catch (error: any) {
            Toaster("Error", `${error?.response?.data}`, "error");
        }
    };

    return (
        <Popover isLazy placement="bottom">
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        <IconButton
                            variant="ghost"
                            pos="absolute"
                            bottom="0px"
                            right="0px"
                            rounded="12px"
                            zIndex={1}
                            aria-label="delete-product"
                            icon={<BsTrash />}
                            colorScheme="red"
                            _focus={{ outline: "none" }}
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
                            Are you sure you want to delete this product?
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
                                onClick={deleteProduct}
                                isLoading={isDeleting}
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

export default DeleteProductPopover;
