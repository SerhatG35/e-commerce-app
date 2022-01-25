import {
    Button,
    Center,
    Link as ChakraLink,
    useColorMode,
} from "@chakra-ui/react";
import { ModalState, useModal } from "context/modalContext";
import { useUserToken } from "context/userContext";
import Link from "next/link";
import { BsMoon, BsSun } from "react-icons/bs";
import { SiTrustedshops } from "react-icons/si";
import { openModal } from "./Modal/CustomModal";
import ProfileMenuDropdown from "./ProfileMenuDropdown";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const modal = useModal();
    const userToken = useUserToken();

    return (
        <Center
            as="nav"
            width="100%"
            height="10vh"
            backdropFilter="blur(8px)"
            bg="hsla(0,0%,100%,.1)"
            position="fixed"
            top="0"
            zIndex="1000"
            borderBottom={colorMode === "light" ? "1px solid #eeeeee" : undefined}
        >
            <Center
                w="100%"
                h="100%"
                maxW="1200px"
                justifyContent="space-between"
                px="1rem"
            >
                <Link passHref href="/">
                    <ChakraLink
                        _focus={{ boxShadow: "none" }}
                        margin="0 0.75rem"
                        _hover={{ textDecoration: "none" }}
                        userSelect="none"
                        textAlign="center"
                        fontWeight={600}
                        color={colorMode === "light" ? "#262355" : "#fff"}
                    >
                        <SiTrustedshops size={40} /> shop
                    </ChakraLink>
                </Link>
                <Center>
                    {!userToken?.userToken ? (
                        <>
                            <Button
                                margin="0 0.75rem"
                                boxShadow="2xl"
                                onClick={() =>
                                    openModal(modal, ModalState.LOGIN)
                                }
                                _focus={{ boxShadow: "none" }}
                                border="1px solid"
                                variant="outline"
                                borderColor={
                                    colorMode === "light" ? "#1f1f1f" : "#fff"
                                }
                                color={
                                    colorMode === "light" ? "#1f1f1f" : "#fff"
                                }
                            >
                                Login
                            </Button>
                            <Button
                                colorScheme="customPurple"
                                margin="0 0.75rem"
                                onClick={() =>
                                    openModal(modal, ModalState.SIGNUP)
                                }
                                _focus={{ boxShadow: "none" }}
                                border="1px solid transparent"
                                color="#fff"
                            >
                                Sign Up
                            </Button>
                        </>
                    ) : (
                        <ProfileMenuDropdown />
                    )}
                    <Button
                        rounded="50%"
                        p="0"
                        onClick={toggleColorMode}
                        _focus={{ boxShadow: "none" }}
                        color="#fff"
                        colorScheme="customPurple"
                    >
                        {colorMode === "light" ? (
                            <BsSun size={20} />
                        ) : (
                            <BsMoon size={20} />
                        )}
                    </Button>
                </Center>
            </Center>
        </Center>
    );
};

export default Navbar;
