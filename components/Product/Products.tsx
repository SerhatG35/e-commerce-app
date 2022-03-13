import { Grid } from "@chakra-ui/layout";
import ProductCard from "components/Product/ProductCard";
import { Toaster } from "components/Toster";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Product as ProductService } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";

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
            {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </Grid>
    );
};

export default Products;
