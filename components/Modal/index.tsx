import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useMediaQuery,
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
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    return (
        <Modal
            size={isLargerThan768 ? "md" : "xs"}
            isOpen={true}
            onClose={onClickClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent
                fontSize={["0.75rem", "0.75rem", "0.85rem", "0.85rem", "1rem"]}
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
