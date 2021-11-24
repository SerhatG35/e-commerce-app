import type { NextPage } from "next";
import { Center, Box, Grid } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "components/Card";
import { IProducts } from "global";

const Home: NextPage = () => {
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
        <Box w="100%" pt="5rem">
            <Center p="1rem 2rem" maxW="1200px" margin="auto">
                <Grid  w="60%" templateColumns="repeat(3, 1fr)" gap={4}>
                    {products &&
                        products?.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                </Grid>
            </Center>
        </Box>
    );
};

export default Home;
