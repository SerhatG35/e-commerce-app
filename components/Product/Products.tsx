import { Grid } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import ProductCard from "components/Product/ProductCard";
import { Toaster } from "components/Toster";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Product as ProductService } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";
import { skeletons } from "../../constants";

const Products = () => {
    const [products, setProducts] = useAtom(ProductJotai);

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
        fetchProductData();
    }, []);

    return (
        <Grid w="100%" px="3rem" templateColumns="repeat(3, 1fr)" gap={6}>
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
    );
};

export default Products;
