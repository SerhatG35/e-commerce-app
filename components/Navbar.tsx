import { ModalState, useModal } from "context/modalContext";
import {
    Link as ChakraLink,
    Button,
    Center,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

import { BsMoon, BsSun } from "react-icons/bs";
import { SiTrustedshops } from "react-icons/si";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const modal = useModal();

    const navbarBg = useColorModeValue(
        "hsl(0, 0%, 12%,0.8)",
        "hsl(0, 0%, 96%,0.8)"
    );
    const navbarColor = useColorModeValue("#f5f5f5", "#1f1f1f");
    const colorModeColor = useColorModeValue("#1f1f1f", "#f5f5f5");
    const colorModeHoverBg = useColorModeValue("#E3E3E3", "#2f2f2f");
    return (
        <Center
            as="nav"
            width="100%"
            height="5rem"
            backdropFilter="blur(8px)"
            background={navbarBg}
            position="fixed"
            top="0"
            zIndex="1000"
            color={navbarColor}
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
                        textAlign="center"
                        fontWeight={600}
                    >
                        <SiTrustedshops size={40} /> shop
                    </ChakraLink>
                </Link>

                <Center>
                    <Button
                        margin="0 0.75rem"
                        boxShadow="2xl"
                        colorScheme="lime"
                        color="#1f1f1f"
                        onClick={() => modal?.setModal(ModalState.LOGIN)}
                        _focus={{ boxShadow: "none" }}
                        border="1px solid transparent"
                    >
                        Login
                    </Button>
                    <Button
                        margin="0 0.75rem"
                        color="#1f1f1f"
                        colorScheme="lime"
                        onClick={() => modal?.setModal(ModalState.SIGNUP)}
                        _focus={{ boxShadow: "none" }}
                        border="1px solid transparent"
                    >
                        Sign Up
                    </Button>
                    <Button
                        rounded="50%"
                        p="0"
                        bg={navbarColor}
                        color={colorModeColor}
                        onClick={toggleColorMode}
                        _focus={{ boxShadow: "none" }}
                        backdropFilter="blur(8px)"
                        _hover={{
                            background: colorModeHoverBg,
                        }}
                    >
                        {colorMode === "light" ? <BsSun /> : <BsMoon />}
                    </Button>
                </Center>
            </Center>
        </Center>
    );
};

export default Navbar;
