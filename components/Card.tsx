import { Box, Center, Text, Image } from "@chakra-ui/react";
import { IProducts } from "global";

const Card = ({ product }: { product: IProducts }) => {
    return (
        <Center
            bg="#fff"
            color="#1f1f1f"
            flexDir="column"
            justifyContent="space-between"
            rounded="12px"
            textAlign="center"
        >
            <Box>
                <Image h="100px" src={product.image} />
            </Box>
            <Text>{product.title}</Text>
            <Text fontStyle="italic">{product.price} $</Text>
        </Center>
    );
};

export default Card;
