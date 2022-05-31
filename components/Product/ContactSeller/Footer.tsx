import { Button, Center, CloseButton, Collapse, Text } from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

type FooterProps = {
    closeModal: () => void;
    closeInfo: () => void;
    handleProceed: () => void;
    isValid: boolean;
    isInfoOpen: boolean;
};

export const Footer: FC<FooterProps> = ({
    closeModal,
    isValid,
    closeInfo,
    isInfoOpen,
    handleProceed,
}) => {
    return (
        <>
            <Center mb="1rem" mt="2rem" w="100%" justifyContent="space-between">
                <Button
                    fontSize="inherit"
                    colorScheme="red"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    fontSize="inherit"
                    disabled={!isValid}
                    onClick={handleProceed}
                    type="button"
                    rightIcon={<MdNavigateNext fontSize="1.1rem" />}
                    colorScheme="blue"
                >
                    Proceed
                </Button>
            </Center>
            <Collapse in={isInfoOpen}>
                <Center
                    fontSize="0.8rem"
                    rounded="4px"
                    border="1px solid transparent"
                    borderLeftWidth="6px"
                    borderLeftColor="blue.500"
                    p="0.5rem"
                    mt="2rem"
                    mb="1rem"
                    animation="ease-in-out"
                    bg="#FDF8EF"
                >
                    <AiOutlineInfoCircle color="#3282ce" size={40} />
                    <Text color="#1f1f1f" ml="0.5rem">
                        You can increase the bid by a maximum of 10% of the
                        original price of the product.
                    </Text>
                    <CloseButton onClick={closeInfo} color="red" ml="0.25rem" />
                </Center>
            </Collapse>
        </>
    );
};
