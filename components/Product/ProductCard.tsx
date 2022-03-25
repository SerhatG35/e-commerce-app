import {
    Badge,
    Box,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from "@chakra-ui/react";
import { MotionCenter } from "components/MotionComponents";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { oneDayInMilliseconds } from "../../constants";

const ProductCard = ({ product }: { product: Global.Products.Product }) => {
    const productBg = useColorModeValue("#262355", "#7B75C7");
    const productColor = useColorModeValue("#fff", "#1f1f1f");

    const isNewProduct =
        dayjs().diff(dayjs(product.createdAt)) > oneDayInMilliseconds
            ? false
            : true;

    return (
        <Link href={`/product/${product._id}`}>
            <MotionCenter
                flexDir="column"
                textAlign="center"
                rounded="12px"
                m="auto"
                userSelect="none"
                bg={productBg}
                color={productColor}
                cursor="pointer"
                whileHover={{
                    y: -5,
                    transition: { type: "tween", duration: 0.15 },
                }}
                position="relative"
            >
                {isNewProduct && (
                    <Badge
                        position="absolute"
                        top="0px"
                        right="0px"
                        zIndex={500}
                        variant="solid"
                        rounded="12px"
                        colorScheme="green"
                        fontSize="xx-small"
                    >
                        New
                    </Badge>
                )}
                <Box h="150px" borderTopRadius="12px" overflow="hidden">
                    <Image src={product.image} width="250px" height="150px" />
                </Box>
                <Stat w="100%">
                    <StatLabel fontSize="1.5rem">{product.title}</StatLabel>
                    <StatNumber>
                        {new Intl.NumberFormat("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                            notation: "compact",
                        }).format(product.price)}
                    </StatNumber>
                    <StatHelpText>
                        {dayjs(product.createdAt).format("DD/MM/YYYY")}
                    </StatHelpText>
                </Stat>
            </MotionCenter>
        </Link>
    );
};

export default ProductCard;
