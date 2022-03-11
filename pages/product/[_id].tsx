import { Center } from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect} from "react";
import { registerPlugin } from "react-filepond";
import { Product } from "service/axios";

type InferedProductDetail = InferGetServerSidePropsType<
    typeof getServerSideProps
>;
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const ProductDetail = ({ token }: InferedProductDetail) => {
    const userToken = useUserToken();
    const router = useRouter();
    const { _id } = router.query;

    const getProduct = async () => {
        const result = await Product.GET(_id as string);
        console.log(result);
    };

    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        token?.accessToken &&
            userToken?.setUserToken(jwtDecode(token.accessToken));
    }, []);

    return (
        <Center pt="11vh" w="100%">
            <div>{_id}</div>
        </Center>
    );
};

export default ProductDetail;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const token = cookies(context);

    return { props: { token } };
};
