import {
    Box,
    Center,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
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
            <Stat>
                <StatLabel>{product.title}</StatLabel>
                <StatNumber>{`${new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    notation: "compact",
                }).format(product.price)}`}</StatNumber>
                <StatHelpText>
                    {dayjs(product.createdAt).format("DD/MM/YYYY")}
                </StatHelpText>
            </Stat>
        </Center>
    );
};

export default Product;
