import { Grid } from "@chakra-ui/layout";
import { Divider, Skeleton } from "@chakra-ui/react";
import Filter from "components/Filter";
import ProductCard from "components/Product/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "service/axios";
import { skeletons } from "../../constants";

interface ProductsTypes {
    productList: Global.Products.Product[] | undefined;
}

const Products = ({ productList }: ProductsTypes) => {
    const [products, setProducts] = useState<
        Global.Products.Product[] | undefined
    >(undefined);
    const [highestPrice, setHighestPrice] = useState<number | undefined>(
        undefined
    );

    useEffect(() => {
        productList && setProducts(productList);
    }, [productList]);

    useEffect(() => {
        productList &&
            setHighestPrice(
                Math.max(...productList?.map((product) => product.price))
            );
    }, [products]);

    const FilterProducts = async (category?: string, priceRange?: number[]) => {
        const params = { category, priceRange };
        if (category === "") delete params.category;
        setProducts(await Product.GET_ALL_FILTERED(params));
    };

    return (
        <>
            {products && (
                <Filter
                    filterProducts={FilterProducts}
                    highestPrice={highestPrice}
                />
            )}
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
