import { createStandaloneToast } from "@chakra-ui/react";
import theme from "theme";

const Toast = createStandaloneToast({ theme });

export const Toaster = (
    title: string,
    description: string,
    status: "error" | "success" | "warning"
) => {
    Toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
        variant: "subtle",
        position: "top",
    });
};
