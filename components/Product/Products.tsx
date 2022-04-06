import { Grid } from "@chakra-ui/layout";
import { Divider, Skeleton, Spinner } from "@chakra-ui/react";
import Filter from "components/Filter";
import ProductCard from "components/Product/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "service/axios";
import { skeletons } from "../../constants";

interface ProductsTypes {
    allProducts: Global.Products.Product[] | undefined;
    allProductHighestPrice: number | undefined;
    redirectedCategory: string | undefined;
}

type StateTypes = {
    productsList: Global.Products.Product[] | undefined;
    isLoading: boolean;
};

const Products = ({
    allProducts,
    allProductHighestPrice,
    redirectedCategory,
}: ProductsTypes) => {
    const [{ productsList, isLoading }, setState] = useState<StateTypes>({
        productsList: undefined,
        isLoading: false,
    });

    useEffect(() => {
        allProducts &&
            !redirectedCategory &&
            setState((state) => ({
                ...state,
                productsList: allProducts,
            }));
    }, [allProducts]);

    const FilterProducts = async (category?: string, priceRange?: number[]) => {
        const params = {
            category,
            priceRange,
        };
        category === "" && delete params.category;
        priceRange?.length === 0 && delete params.priceRange;

        setState((state) => ({ ...state, isLoading: true }));
        const result = await Product.GET_ALL_FILTERED(params);
        setState((state) => ({ ...state, ...result, isLoading: false }));
    };

    return (
        <>
            <Filter
                redirectedCategory={redirectedCategory}
                filterProducts={FilterProducts}
                highestPrice={allProductHighestPrice}
            />
            <Divider orientation="vertical" h="89vh" />
            <Grid w="75%" px="3rem" templateColumns="repeat(3, 1fr)" gap={6}>
                {productsList ? (
                    isLoading ? (
                        <Spinner
                            size="xl"
                            colorScheme="customPurple"
                            top="40%"
                            left="60%"
                            position="absolute"
                        />
                    ) : (
                        productsList?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    )
                ) : (
                    skeletons.map((key) => (
                        <Skeleton
                            key={key}
                            rounded="12px"
                            width="250px"
                            height="250px"
                            m="auto"
                            startColor="#262355"
                            endColor="#7B75C7"
                        />
                    ))
                )}
            </Grid>
        </>
    );
};

export default Products;
