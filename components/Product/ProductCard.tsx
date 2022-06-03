import {
    Badge,
    Box,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import { MotionBadge } from "components/MotionComponents";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { oneDayInMilliseconds } from "../../constants";
import DeleteProductPopover from "./DeleteProductPopever";

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
    const isNewProduct =
        dayjs().diff(dayjs(product.createdAt)) > oneDayInMilliseconds
            ? false
            : true;

    return (
        <MotionBadge
            flexDir="column"
            textAlign="center"
            rounded="12px"
            m="auto"
            userSelect="none"
            textTransform="none"
            whileHover={{
                y: -5,
                transition: { type: "tween", duration: 0.15 },
            }}
            position="relative"
            px="0"
        >
            {isNewProduct && (
                <Badge
                    position="absolute"
                    top="3px"
                    right="3px"
                    zIndex={500}
                    variant="solid"
                    rounded="12px"
                >
                    New
                </Badge>
            )}
            {usersOwnProfile && reFetch && (
                <DeleteProductPopover product={product} reFetch={reFetch} />
            )}
            <Link href={`/product/${product._id}`}>
                <Box
                    cursor="pointer"
                    h="150px"
                    borderTopRadius="12px"
                    overflow="hidden"
                >
                    <Image src={product.image} width="250px" height="150px" />
                </Box>
            </Link>
            <Stat
                fontSize={["0.75rem", "0.75rem", "0.85rem", "0.85rem", "1rem"]}
                w="100%"
            >
                <StatLabel fontSize="inherit">{product.title}</StatLabel>
                <StatNumber fontSize="1.5em">
                    {new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                        notation: "compact",
                    }).format(Number(product.price))}
                </StatNumber>
                <StatHelpText fontSize="inherit">
                    {dayjs(product.createdAt).format("DD/MM/YYYY")}
                </StatHelpText>
            </Stat>
        </MotionBadge>
    );
};

export default ProductCard;
