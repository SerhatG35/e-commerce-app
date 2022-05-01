import {
    Button,
    Center,
    IconButton,
    Link as ChakraLink,
    Tooltip,
    useBreakpointValue,
    useColorMode,
} from "@chakra-ui/react";
import { ModalState, useModal } from "context/modalContext";
import { useUserToken } from "context/userContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { BsMoon, BsSun } from "react-icons/bs";
import { RiFilePaper2Fill } from "react-icons/ri";
import { SiTrustedshops } from "react-icons/si";
import { openModal } from "./Modal/CustomModal";
import ProfileMenuDropdown from "./Profile/ProfileMenuDropdown";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const modal = useModal();
    const userToken = useUserToken();

    const buttonBreakpoint = useBreakpointValue({
        base: "xs",
        sm: "sm",
        md: "md",
    });
    const iconBreakpoint = useBreakpointValue({ base: 10, md: 20 });
    const mainIconBreakpoint = useBreakpointValue({ base: 30, md: 40 });

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
            boxShadow="sm"
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
                        <SiTrustedshops size={mainIconBreakpoint} /> shop
                    </ChakraLink>
                </Link>
                <Center>
                    {!userToken?.userToken ? (
                        <>
                            <Button
                                mr={[
                                    "0.3rem",
                                    "0.3rem",
                                    "0.5rem",
                                    "0.5rem",
                                    "0.75",
                                ]}
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
                                fontSize="inherit"
                                size={buttonBreakpoint}
                            >
                                Login
                            </Button>
                            <Button
                                colorScheme="customPurple"
                                mx={[
                                    "0.3rem",
                                    "0.3rem",
                                    "0.5rem",
                                    "0.5rem",
                                    "0.75rem",
                                ]}
                                onClick={() =>
                                    openModal(modal, ModalState.SIGNUP)
                                }
                                _focus={{ boxShadow: "none" }}
                                border="1px solid transparent"
                                color="#fff"
                                fontSize="inherit"
                                size={buttonBreakpoint}
                            >
                                Sign Up
                            </Button>
                        </>
                    ) : (
                        <>
                            <ProfileMenuDropdown />
                            <Link passHref href="/purchase-requests">
                                <div>
                                    <Tooltip label="Purchase Requests">
                                        <IconButton
                                            color="#fff"
                                            colorScheme="customPurple"
                                            _focus={{ boxShadow: "none" }}
                                            mr="1rem"
                                            rounded="50%"
                                            aria-label="Purchase Requests"
                                            icon={<RiFilePaper2Fill />}
                                            size={buttonBreakpoint}
                                        />
                                    </Tooltip>
                                </div>
                            </Link>
                        </>
                    )}
                    <Button
                        rounded="50%"
                        p="0"
                        onClick={toggleColorMode}
                        _focus={{ boxShadow: "none" }}
                        color="#fff"
                        colorScheme="customPurple"
                        overflow="hidden"
                        size={buttonBreakpoint}
                    >
                        {colorMode === "light" && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ y: "25px", opacity: 0 }}
                                    animate={{ y: "0px", opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    exit={{ y: "25px", opacity: 0 }}
                                >
                                    <BsSun size={iconBreakpoint} />
                                </motion.div>
                            </AnimatePresence>
                        )}
                        {colorMode === "dark" && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ y: "-25px", opacity: 0 }}
                                    animate={{ y: "0px", opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    exit={{ y: "-25px", opacity: 0 }}
                                >
                                    <BsMoon size={iconBreakpoint} />
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </Button>
                </Center>
            </Center>
        </Center>
    );
};

export default Navbar;
