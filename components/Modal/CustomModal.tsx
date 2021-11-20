import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { ModalState, useModal } from "context/modalContext";
import LoginForm from "./Form/LoginForm";
import SignUpForm from "./Form/SignUpForm";

const CustomModal = () => {
    const modal = useModal();
    const isLogin = modal?.modal === ModalState.LOGIN ? true : false;

    return (
        <Modal
            isOpen={modal?.modal !== undefined}
            onClose={() => modal?.setModal(undefined)}
            isCentered
        >
            <ModalOverlay />
            <ModalContent h={isLogin ? "30%" : "55%"} rounded="xl">
                <ModalHeader textAlign="center">
                    {isLogin ? "Login" : "Create new account"}
                </ModalHeader>
                <ModalCloseButton rounded="xl" _focus={{ outline: "none" }} />
                <ModalBody>
                    {isLogin ? <LoginForm /> : <SignUpForm />}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
