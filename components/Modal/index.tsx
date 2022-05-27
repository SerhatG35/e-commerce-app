import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";

type CustomModalProps = {
    header: string;
    content: JSX.Element;
    onClickClose: () => void;
};

const CustomModal: FC<CustomModalProps> = ({
    header,
    content,
    onClickClose,
}) => {
    return (
        <Modal isOpen={true} onClose={onClickClose} isCentered>
            <ModalOverlay />
            <ModalContent rounded="xl">
                <ModalHeader textAlign="center">{header}</ModalHeader>
                <ModalCloseButton rounded="xl" _focus={{ outline: "none" }} />
                <ModalBody>{content}</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
