import { Grid } from "@chakra-ui/layout";
import { Divider, Skeleton } from "@chakra-ui/react";
import Filter from "components/Filter";
import ProductCard from "components/Product/ProductCard";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Product as ProductService } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import { Toaster } from "utils/Toster";
import { skeletons } from "../../constants";

const Products = () => {
    const [products, setProducts] = useAtom(ProductJotai);
    const [highestPrice, setHighestPrice] = useState<number | undefined>(
        undefined
    );

    const fetchProductData = async () => {
        try {
            const result = await ProductService.GET_ALL();
            setProducts(result);
        } catch (error: any) {
            if (error.response?.status === 404 || error.response === undefined)
                return Toaster(
                    "",
                    "There is a problem with the server please try again",
                    "error"
                );
            Toaster("", `${error.response.data}`, "error");
        }
    };

    useEffect(() => {
        products &&
            setHighestPrice(
                Math.max(...products?.map((product) => product.price))
            );
    }, [products]);

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <>
            {products && <Filter highestPrice={highestPrice} />}
            <Divider orientation="vertical" h="89vh" />
            <Grid w="75%" px="3rem" templateColumns="repeat(3, 1fr)" gap={6}>
                {products
                    ? products?.map((product) => (
                          <ProductCard key={product._id} product={product} />
                      ))
                    : skeletons.map((key) => (
                          <Skeleton
                              key={key}
                              rounded="12px"
                              width="250px"
                              height="250px"
                              m="auto"
                              startColor="#262355"
                              endColor="#7B75C7"
                          />
                      ))}
            </Grid>
        </>
    );
};

export default Products;
