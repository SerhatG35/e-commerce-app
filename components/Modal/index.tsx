import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useColorMode,
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
    const { colorMode } = useColorMode();

    return (
        <Modal isOpen={true} onClose={onClickClose} isCentered>
            <ModalOverlay />
            <ModalContent
                bg={colorMode === "light" ? "#262355" : "#fff"}
                color={colorMode === "light" ? "#fff" : "#1f1f1f"}
                rounded="xl"
            >
                <ModalHeader textAlign="center">{header}</ModalHeader>
                <ModalCloseButton rounded="xl" _focus={{ outline: "none" }} />
                <ModalBody>{content}</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
