import {
    Button,
    Center,
    IconButton,
    Link as ChakraLink,
    Tooltip,
    useBreakpointValue,
    useColorMode,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { RiFilePaper2Fill } from "react-icons/ri";
import { SiTrustedshops } from "react-icons/si";
import CustomModal from "./Modal";
import ProfileMenuDropdown from "./Profile/ProfileMenuDropdown";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

enum NAVBAR_MODAL_ACTIONS {
    NO_ACTION,
    SIGN_IN,
    SIGN_UP,
}

type StateTypes = {
    currentAction: NAVBAR_MODAL_ACTIONS;
};

const Navbar = () => {
    const [{ currentAction }, setState] = useState<StateTypes>({
        currentAction: NAVBAR_MODAL_ACTIONS.NO_ACTION,
    });

    const { colorMode, toggleColorMode } = useColorMode();
    const userToken = useUserToken();

    const buttonBreakpoint = useBreakpointValue({
        base: "sm",
        md: "md",
    });
    const mainIconBreakpoint = useBreakpointValue({ base: 30, md: 40 });

    const toggleModal = (
        action: NAVBAR_MODAL_ACTIONS = NAVBAR_MODAL_ACTIONS.NO_ACTION
    ) => {
        setState((state) => ({
            ...state,
            currentAction: action,
        }));
    };

    const isCurrenActionSignIn = currentAction === NAVBAR_MODAL_ACTIONS.SIGN_IN;

    return (
        <Center
            as="nav"
            width="100%"
            height="8vh"
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
                                boxShadow="md"
                                onClick={() =>
                                    toggleModal(NAVBAR_MODAL_ACTIONS.SIGN_IN)
                                }
                                _focus={{ boxShadow: "none" }}
                                border="1px solid"
                                variant="outline"
                                fontSize="inherit"
                                size={buttonBreakpoint}
                            >
                                Sign In
                            </Button>
                            <Button
                                mx={[
                                    "0.3rem",
                                    "0.3rem",
                                    "0.5rem",
                                    "0.5rem",
                                    "0.75rem",
                                ]}
                                boxShadow="md"
                                onClick={() =>
                                    toggleModal(NAVBAR_MODAL_ACTIONS.SIGN_UP)
                                }
                                _focus={{ boxShadow: "none" }}
                                border="1px solid transparent"
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
                                            _focus={{ boxShadow: "none" }}
                                            mr="1rem"
                                            rounded="50%"
                                            aria-label="Purchase Requests"
                                            fontSize="inherit"
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
                        overflow="hidden"
                        fontSize="inherit"
                        size={buttonBreakpoint}
                        boxShadow="md"
                    >
                        {colorMode === "light" && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ y: "40px", opacity: 0 }}
                                    animate={{ y: "0px", opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ y: "40px", opacity: 0 }}
                                >
                                    <BsSun />
                                </motion.div>
                            </AnimatePresence>
                        )}
                        {colorMode === "dark" && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ y: "-40px", opacity: 0 }}
                                    animate={{ y: "0px", opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ y: "-40px", opacity: 0 }}
                                >
                                    <BsMoon />
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </Button>
                </Center>
            </Center>
            {currentAction !== NAVBAR_MODAL_ACTIONS.NO_ACTION && (
                <CustomModal
                    onClickClose={toggleModal}
                    content={
                        isCurrenActionSignIn ? (
                            <SignIn closeModal={toggleModal} />
                        ) : (
                            <SignUp closeModal={toggleModal} />
                        )
                    }
                    header={isCurrenActionSignIn ? "Sign In" : "Sign Up"}
                />
            )}
        </Center>
    );
};

export default Navbar;
