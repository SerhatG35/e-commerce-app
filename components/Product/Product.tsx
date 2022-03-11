import {
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

const Product = ({ product }: { product: Global.Products.Product }) => {
    const productBg = useColorModeValue("#262355", "#7B75C7");
    const productColor = useColorModeValue("#fff", "#1f1f1f");
    return (
        <Link href={`/product/${product._id}`}>
            <MotionCenter
                flexDir="column"
                justifyContent="flex-start"
                rounded="12px"
                textAlign="center"
                m="auto"
                userSelect="none"
                bg={productBg}
                color={productColor}
                boxShadow="xl"
                cursor="pointer"
                whileHover={{
                    y: -5,
                    transition: { type: "tween", duration: 0.15 },
                }}
            >
                <Box borderTopRadius="12px" overflow="hidden">
                    <Image
                        src={product.image}
                        width="250px"
                        height="150px"
                        objectFit="contain"
                    />
                </Box>
                <Stat>
                    <StatLabel fontSize="1.5rem">{product.title}</StatLabel>
                    <StatNumber>
                        {product.price !== "" &&
                            `${new Intl.NumberFormat("tr-TR", {
                                style: "currency",
                                currency: "TRY",
                                notation: "compact",
                            }).format(product.price)}`}
                    </StatNumber>
                    <StatHelpText>
                        {dayjs(product.createdAt).format("DD/MM/YYYY")}
                    </StatHelpText>
                </Stat>
            </MotionCenter>
        </Link>
    );
};

export default Product;
