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
import { useState } from "react";

const ProductCard = ({ product }: { product: Global.Products.Product }) => {
    const [hoveringProduct, setHoveringProduct] = useState(false);
    const productBg = useColorModeValue("#262355", "#7B75C7");
    const productColor = useColorModeValue("#fff", "#1f1f1f");
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
                onMouseEnter={() => setHoveringProduct(true)}
                onMouseLeave={() => setHoveringProduct(false)}
            >
                <Box
                    h="150px"
                    borderTopRadius="12px"
                    overflow="hidden"
                    animation={"ease"}
                >
                    <Image
                        src={product.image}
                        width="250px"
                        height="150px"
                        objectFit={hoveringProduct ? "contain" : "cover"}
                    />
                </Box>
                <Stat
                    // boxShadow="xl"
                    // borderBottomRadius="12px"
                    w="100%"
                    // bg={productBg}
                >
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

export default ProductCard;
