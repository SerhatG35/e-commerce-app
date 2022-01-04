import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
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
    const isLogin = modal?.modal === ModalState.LOGIN ? true : false;

    return (
        <Modal
            isOpen={modal?.modal !== undefined}
            onClose={() => closeModal(modal)}
            isCentered
        >
            <ModalOverlay />
            <ModalContent rounded="xl">
                <ModalHeader textAlign="center">
                    {isLogin ? "Login" : "Create new account"}
                </ModalHeader>
                <ModalCloseButton rounded="xl" _focus={{ outline: "none" }} />
                <ModalBody>
                    {isLogin ? <Login /> : <SignUp />}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
