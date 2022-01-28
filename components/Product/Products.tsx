import { Grid } from "@chakra-ui/layout";
import Product from "components/Product/Product";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Product as ProductService } from "service/axios";
import { products as ProductJotai } from "store/jotaiStore";

const Products = () => {
    const [products, setProducts] = useAtom(ProductJotai);

    const fetchProductData = async () => {
        const result = await ProductService.GET_ALL();
        setProducts(result);
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <Grid w="100%" px="3rem" templateColumns="repeat(3, 1fr)" gap={6}>
            {products?.map((product) => (
                <Product key={product._id} product={product} />
            ))}
        </Grid>
    );
};

export default Products;
