import {
    Button,
    Center,
    Heading,
    InputGroup,
    InputLeftAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserToken } from "context/userContext";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Product } from "service/axios";
import { Toaster } from "utils/Toster";
import { ContactSellerSchema } from "./ContactSellerSchema";
import { Footer } from "./Footer";

type ContactSellerFormProps = {
    closeModal: (requireRefect?: boolean) => void;
    productInfo: Global.Products.Product;
};

type FormTypes = {
    price: number;
    message: string | undefined;
};

const ContactSellerForm: FC<ContactSellerFormProps> = ({
    productInfo,
    closeModal,
}) => {
    const [proceed, setProceed] = useState(false);
    const userToken = useUserToken();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const productPrice = Number(productInfo.price);

    const {
        control,
        formState: { errors, isValid, isSubmitting },
        handleSubmit,
        trigger,
        getValues,
    } = useForm<FormTypes>({
        resolver: yupResolver(ContactSellerSchema(productPrice)),
        defaultValues: {
            price: productPrice,
            message: undefined,
        },
    });

    const onSubmit: SubmitHandler<FormTypes> = async (data) => {
        const modifiedData: Global.Products.PurchaseRequestPayload = {
            message: data.message,
            price: data.price,
            productId: productInfo._id,
            productCategory: productInfo.category,
            productName: productInfo.title,
            sellerId: productInfo.user,
            sellerName: productInfo.userNameAndSurname,
            buyerId: userToken?.userToken?._id,
            buyerName: `${userToken?.userToken?.name} ${userToken?.userToken?.surname}`,
        };
        try {
            await Product.PURCHASE_REQUEST(modifiedData);
            closeModal(true);
            Toaster(
                "Success",
                "You have successfully sended request for this product.",
                "success"
            );
        } catch (error: any) {
            Toaster("Error", `${error?.response?.data}`, "error");
        }
    };

    const handleProceed = () => {
        trigger();
        isValid && setProceed(true);
    };

    return (
        <form id="contact-seller-form" onSubmit={handleSubmit(onSubmit)}>
            {!proceed ? (
                <>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Text mb="0.5rem" textDecoration="underline">
                                    Price
                                </Text>
                                <InputGroup>
                                    <InputLeftAddon
                                        children="₺"
                                        fontSize="1.2rem"
                                        pointerEvents="none"
                                    />
                                    <NumberInput
                                        {...field}
                                        min={productPrice}
                                        max={productPrice + productPrice * 0.1}
                                        onBlur={(e: any) =>
                                            e.target.value >
                                                productPrice +
                                                    productPrice * 0.1 &&
                                            onOpen()
                                        }
                                        allowMouseWheel
                                        w="100%"
                                    >
                                        <NumberInputField
                                            _focus={{ outline: "none" }}
                                            borderLeftRadius="0px"
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </InputGroup>
                                <Text color="red">
                                    {errors?.price?.message}
                                </Text>
                            </>
                        )}
                    />
                    <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Text
                                    mb="0.5rem"
                                    mt="1rem"
                                    textDecoration="underline"
                                >
                                    Message
                                </Text>
                                <Textarea
                                    {...field}
                                    _focus={{ outline: "none" }}
                                    maxH="200px"
                                    placeholder="Your message.. (optional)"
                                    onBlur={() => trigger()}
                                />
                                <Text color="red">
                                    {errors?.message?.message}
                                </Text>
                            </>
                        )}
                    />
                </>
            ) : (
                <Center alignItems="flex-start" flexDir="column">
                    <Text fontWeight="medium">{`You are about to send a purchase request to ${
                        productInfo.userNameAndSurname
                    } for product named ${
                        productInfo.title
                    } for ${new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                        maximumSignificantDigits: 4,
                    }).format(getValues("price"))}.`}</Text>
                    {getValues("message") && (
                        <Center
                            alignItems="flex-start"
                            flexDir="column"
                            mt="1rem"
                        >
                            <Heading
                                textDecor="underline"
                                size="sm"
                                mb="0.5rem"
                            >
                                Your message to the seller
                            </Heading>
                            <Text wordBreak="break-word">
                                {getValues("message")}
                            </Text>
                        </Center>
                    )}
                </Center>
            )}
            {!proceed ? (
                <Footer
                    closeModal={closeModal}
                    isValid={isValid}
                    isInfoOpen={isOpen}
                    closeInfo={onClose}
                    handleProceed={handleProceed}
                />
            ) : (
                <Center
                    mb="1rem"
                    mt="2rem"
                    w="100%"
                    justifyContent="space-between"
                >
                    <Button
                        fontSize="inherit"
                        colorScheme="red"
                        onClick={() => setProceed(false)}
                    >
                        Back
                    </Button>
                    <Button
                        fontSize="inherit"
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        loadingText="Sending"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Center>
            )}
        </form>
    );
};

export default ContactSellerForm;
