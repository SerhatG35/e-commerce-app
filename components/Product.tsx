import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";

const Product = ({ product }: { product: Global.Products.Product }) => {
    const productBg = useColorModeValue("#262355", "#7B75C7");
    const productColor = useColorModeValue("#fff", "#1f1f1f");
    return (
        <Center
            flexDir="column"
            justifyContent="flex-start"
            rounded="12px"
            textAlign="center"
            m="auto"
            w="250px"
            h="250px"
            userSelect="none"
            bg={productBg}
            color={productColor}
            boxShadow="xl"
        >
            <Box borderTopRadius="12px" overflow="hidden">
                <Image
                    src="/default-images/no-image.png"
                    width="250px"
                    height="150px"
                />
            </Box>
            <Text>{product.title}</Text>
            <Text fontStyle="italic">{product.price} $</Text>
        </Center>
    );
};

export default Product;
