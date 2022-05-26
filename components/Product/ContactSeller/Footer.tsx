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
                <Button onClick={closeModal} colorScheme="red">
                    Cancel
                </Button>
                <Button
                    colorScheme="blue"
                    disabled={!isValid}
                    onClick={handleProceed}
                    type="button"
                    rightIcon={<MdNavigateNext size={20} />}
                >
                    Proceed
                </Button>
            </Center>
            <Collapse in={isInfoOpen}>
                <Center
                    fontSize="0.8rem"
                    rounded="4px"
                    border="1px solid transparent"
                    bg="orange.50"
                    borderLeftWidth="6px"
                    borderLeftColor="#473167"
                    p="0.5rem"
                    mt="2rem"
                    mb="1rem"
                    animation="ease-in-out"
                >
                    <AiOutlineInfoCircle color="#473167" size={40} />
                    <Text color="#1f1f1f" ml="0.5rem">
                        You can increase the bid by a maximum of 10% of the
                        original price of the product.
                    </Text>
                    <CloseButton
                        onClick={closeInfo}
                        color="#473167"
                        ml="0.25rem"
                    />
                </Center>
            </Collapse>
        </>
    );
};
