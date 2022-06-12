import {
    Avatar,
    Button,
    Center,
    Flex,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import dayjs from "dayjs";
import router from "next/router";
import { FC } from "react";

type SellerCardProps = {
    productDetails: Global.Products.Product;
    toggleContactSellerFormModal: (requireRefect?: boolean) => void;
};

const SellerCard: FC<SellerCardProps> = ({
    productDetails,
    toggleContactSellerFormModal,
}) => {
    const userToken = useUserToken();

    const userHasToken = !!userToken?.userToken?._id;

    const isUsersOwnProduct =
        userToken?.userToken?._id === productDetails?.user;

    const SellerCardBg = useColorModeValue("#f9f9f9", "#5f5f5f");

    return (
        <Flex
            pl={["unset", "unset", "unset", "unset", "2rem"]}
            flexDir="column"
            w={["100%", "100%", "100%", "100%", "30%"]}
            my={["2rem", "2rem", "2rem", "2rem", "unset"]}
            alignItems="center"
        >
            <Center
                p="1rem"
                borderRadius="6px"
                flexDir="column"
                bg={SellerCardBg}
                w="100%"
                boxShadow="sm"
                h="100%"
                alignItems={[
                    "center",
                    "center",
                    "center",
                    "center",
                    "flex-start",
                ]}
                justifyContent="space-around"
            >
                <Center
                    justifyContent="space-between"
                    alignItems="flex-start"
                    flexDir="column"
                    w="100%"
                >
                    <Center alignSelf="center" flexDir="column">
                        <Avatar
                            size="xl"
                            name={productDetails.userNameAndSurname}
                            cursor="pointer"
                            onClick={() =>
                                router.push(`/profile/${productDetails.user}`)
                            }
                        />
                        <Text>{productDetails.userNameAndSurname}</Text>
                    </Center>
                    <Center mt="1rem" w="100%" flexDir="column">
                        <Flex>
                            <Text mr="0.5rem" fontWeight="bold">
                                Category:
                            </Text>
                            <Text>{productDetails.category}</Text>
                        </Flex>
                        <Flex>
                            <Text mr="0.5rem" fontWeight="bold">
                                Added:
                            </Text>
                            <Text>
                                {dayjs(productDetails.createdAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text mr="0.5rem" fontWeight="bold">
                                Price:
                            </Text>
                            <Text>
                                {new Intl.NumberFormat("tr-TR", {
                                    style: "currency",
                                    currency: "TRY",
                                    maximumSignificantDigits: 4,
                                }).format(Number(productDetails.price))}
                            </Text>
                        </Flex>
                    </Center>
                </Center>
                {!isUsersOwnProduct && (
                    <Tooltip
                        visibility={
                            !userHasToken || productDetails.isItSold
                                ? "visible"
                                : "hidden"
                        }
                        label={
                            !userHasToken
                                ? "Please login to make a purchase request."
                                : productDetails.isItSold
                                ? "This item has already been sold."
                                : ""
                        }
                    >
                        <Center w="100%">
                            <Button
                                mt="1rem"
                                w={["50%", "50%", "50%", "50%", "100%"]}
                                onClick={() =>
                                    toggleContactSellerFormModal(false)
                                }
                                disabled={
                                    !userHasToken || productDetails.isItSold
                                }
                            >
                                Contact the seller
                            </Button>
                        </Center>
                    </Tooltip>
                )}
            </Center>
        </Flex>
    );
};

export default SellerCard;
