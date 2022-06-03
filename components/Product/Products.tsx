import { Grid } from "@chakra-ui/layout";
import { Divider, Skeleton, useBreakpointValue } from "@chakra-ui/react";
import Filter from "components/Filter/Filter";
import ProductCard from "components/Product/ProductCard";
import { FC } from "react";
import { skeletons } from "../../constants";

interface ProductsProps {
    allProducts: Global.Products.Product[] | undefined;
    allProductHighestPrice: number | undefined;
    redirectedCategory: string | undefined;
    isFetchingProducts: boolean;
    reFetchProducts: (
        category?: string,
        priceRange?: number[],
        shouldCategoryIncluded?: boolean
    ) => void;
}

const Products: FC<ProductsProps> = ({
    allProducts,
    allProductHighestPrice,
    redirectedCategory,
    isFetchingProducts,
    reFetchProducts,
}) => {
    const gridTemplateColumnBreakpoint = useBreakpointValue({
        base: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
        sm: "repeat(2,1fr)",
    });

    return (
        <>
            <Filter
                redirectedCategory={redirectedCategory}
                filterProducts={reFetchProducts}
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
                {!isFetchingProducts
                    ? allProducts?.map((product) => (
                          <ProductCard key={product._id} product={product} />
                      ))
                    : skeletons.map((key) => (
                          <Skeleton
                              key={key}
                              rounded="12px"
                              width="250px"
                              height="250px"
                              m="auto"
                              startColor="#ebf4f5"
                              endColor="#b5c6e0"
                          />
                      ))}
            </Grid>
        </>
    );
};

export default Products;
