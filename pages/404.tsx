import { Center } from "@chakra-ui/react";

const Custom404Page = () => {
    return (
        <Center
            w="100%"
            h="100vh"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundImage="url(/404.svg)"
            position="relative"
        ></Center>
    );
};

export default Custom404Page;
