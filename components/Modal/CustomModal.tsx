import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useColorMode,
} from "@chakra-ui/react";
import { ModalContextTypes, ModalState, useModal } from "context/modalContext";
import Login from "./Form/Login";
import SignUp from "./Form/SignUp";

export const closeModal = (modal: ModalContextTypes | undefined) => {
    return modal?.setModal(undefined);
};

export const openModal = (
    modal: ModalContextTypes | undefined,
    modalState: ModalState
) => {
    return modal?.setModal(modalState);
};

const CustomModal = () => {
    const modal = useModal();
    const { colorMode } = useColorMode();
    const isLogin = modal?.modal === ModalState.LOGIN ? true : false;

    return isLogin !== undefined ? (
        <Modal
            isOpen={modal?.modal !== undefined}
            onClose={() => closeModal(modal)}
            isCentered
        >
            <ModalOverlay />
            <ModalContent
                bg={colorMode === "light" ? "#262355" : "#fff"}
                color={colorMode === "light" ? "#fff" : "black"}
                rounded="xl"
            >
                <ModalHeader textAlign="center">
                    {isLogin ? "Login" : "Create new account"}
                </ModalHeader>
                <ModalCloseButton rounded="xl" _focus={{ outline: "none" }} />
                <ModalBody>{isLogin ? <Login /> : <SignUp />}</ModalBody>
            </ModalContent>
        </Modal>
    ) : (
        <></>
    );
};

export default CustomModal;
