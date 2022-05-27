import { createStandaloneToast } from "@chakra-ui/react";

const Toast = createStandaloneToast();

export const Toaster = (
    title: string,
    description: string,
    status: "error" | "success" | "warning" | "info",
    position: "top" | "bottom" = "top"
) => {
    Toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
        position: position,
    });
};
