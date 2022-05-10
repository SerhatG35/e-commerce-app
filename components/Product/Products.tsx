import { Grid } from "@chakra-ui/layout";
import {
    Divider,
    Skeleton,
    Spinner,
    useBreakpointValue,
} from "@chakra-ui/react";
import Filter from "components/Filter/Filter";
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

    const gridTemplateColumnBreakpoint = useBreakpointValue({
        base: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
        sm: "repeat(2,1fr)",
    });

    return (
        <>
            <Filter
                redirectedCategory={redirectedCategory}
                filterProducts={FilterProducts}
                highestPrice={allProductHighestPrice}
            />
            <Divider
                position="sticky"
                top="11vh"
                orientation="vertical"
                h={["unset", "unset", "unset", "unset", "89vh"]}
            />
            <Grid
                w={["100%", "100%", "100%", "100%", "75%"]}
                px="3rem"
                templateColumns={gridTemplateColumnBreakpoint}
                gap={6}
            >
                {productsList ? (
                    isLoading ? (
                        <Spinner
                            size="xl"
                            colorScheme="customPurple"
                            top={["150%", "150%", "150%", "150%", "40%"]}
                            left={["45%", "45%", "50%", "50%", "60%"]}
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
