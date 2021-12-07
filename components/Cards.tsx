import { Grid } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "components/Card";
import { IProducts } from "global";

const Cards = () => {
    const [products, setProducts] = useState<IProducts[] | undefined>(
        undefined
    );

    const fetchData = async () => {
        const { data } = await axios.get<IProducts[]>(
            "https://fakestoreapi.com/products"
        );
        setProducts(data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Grid
            w="80%"
            h="100%"
            px="1rem"
            templateColumns="repeat(3, 1fr)"
            gap={4}
            overflowY="auto"
        >
            {products?.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </Grid>
    );
};

export default Cards;
