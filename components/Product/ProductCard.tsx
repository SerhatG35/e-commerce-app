import {
    Badge,
    Box,
    IconButton,
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
import { FC } from "react";
import { BsTrash } from "react-icons/bs";
import { Product as ProductService } from "service/axios";
import { oneDayInMilliseconds } from "../../constants";

type ProductCardProps = {
    product: Global.Products.Product;
    usersOwnProfile?: boolean;
    reFetch?: () => Promise<void>;
};

const ProductCard: FC<ProductCardProps> = ({
    product,
    usersOwnProfile,
    reFetch,
}) => {
    const productBg = useColorModeValue("#262355", "#7B75C7");
    const productColor = useColorModeValue("#fff", "#1f1f1f");
    const productBoxShadow = useColorModeValue(
        "rgb(218 218 218 / 50%) 4px 6px 0px 0px",
        "rgb(255 255 255 / 5%) 4px 6px 0px 0px"
    );

    const isNewProduct =
        dayjs().diff(dayjs(product.createdAt)) > oneDayInMilliseconds
            ? false
            : true;

    const deleteProduct = async (e: any) => {
        e.preventDefault();
        if (reFetch) {
            await ProductService.DELETE(product._id);
            reFetch();
        }
    };

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
                boxShadow={productBoxShadow}
                whileHover={{
                    y: -5,
                    transition: { type: "tween", duration: 0.15 },
                }}
                position="relative"
            >
                {isNewProduct && (
                    <Badge
                        position="absolute"
                        top="2px"
                        right="2px"
                        zIndex={500}
                        variant="solid"
                        rounded="12px"
                        colorScheme="green"
                        fontSize="xx-small"
                    >
                        New
                    </Badge>
                )}
                {usersOwnProfile && (
                    <IconButton
                        onClick={deleteProduct}
                        colorScheme="red"
                        variant="ghost"
                        color="red"
                        pos="absolute"
                        bottom="0px"
                        right="0px"
                        rounded="12px"
                        zIndex={1}
                        aria-label="delete-product"
                        icon={<BsTrash />}
                        _focus={{ outline: "none" }}
                    />
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
