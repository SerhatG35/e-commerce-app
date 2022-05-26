import {
    Button,
    Center,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
    useColorModeValue,
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
    productId: string;
    productPrice: number;
    closeModal: (requireRefect?: boolean) => void;
    productName: string;
    sellerName: string;
};

type FormTypes = {
    price: number;
    message: string | undefined;
};

const ContactSellerForm: FC<ContactSellerFormProps> = ({
    productId,
    productPrice,
    productName,
    sellerName,
    closeModal,
}) => {
    const [proceed, setProceed] = useState(false);
    const userToken = useUserToken();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const color = useColorModeValue("#fff", "#000");

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
            ...data,
            productId,
            buyerId: userToken?.userToken?._id,
            buyerName: `${userToken?.userToken?.name} ${userToken?.userToken?.surname}`,
        };
        try {
            await Product.PURCHASE_REQUEST(modifiedData);
            closeModal(true);
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
                                <NumberInput
                                    {...field}
                                    borderColor={color}
                                    min={productPrice}
                                    max={productPrice + productPrice * 0.1}
                                    onBlur={(e: any) =>
                                        e.target.value >
                                            productPrice + productPrice * 0.1 &&
                                        onOpen()
                                    }
                                    allowMouseWheel
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper
                                            color={color}
                                            borderColor={color}
                                        />
                                        <NumberDecrementStepper
                                            color={color}
                                            borderColor={color}
                                        />
                                    </NumberInputStepper>
                                </NumberInput>
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
                                    borderColor={color}
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
                    <Text fontWeight="medium">{`You are about to send a purchase request to ${sellerName} for product named ${productName} for ${new Intl.NumberFormat(
                        "tr-TR",
                        {
                            style: "currency",
                            currency: "TRY",
                            maximumSignificantDigits: 4,
                        }
                    ).format(getValues("price"))}.`}</Text>
                    {getValues("message") && (
                        <Center
                            alignItems="flex-start"
                            flexDir="column"
                            mt="1rem"
                        >
                            <Heading textDecor="underline" size="sm" mb="0.5rem">
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
                    <Button onClick={() => setProceed(false)} colorScheme="red">
                        Back
                    </Button>
                    <Button
                        isLoading={isSubmitting}
                        colorScheme="blue"
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