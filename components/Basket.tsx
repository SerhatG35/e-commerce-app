import { IconButton, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { BsBasket } from "react-icons/bs";

const Basket = () => {
    return (
        <Link href="/basket" passHref>
            <div>
                <Tooltip label="Basket">
                    <IconButton
                        mr="1rem"
                        rounded="50%"
                        colorScheme="customPurple"
                        color="#fff"
                        aria-label="go to basket"
                        icon={<BsBasket size={20} />}
                        _focus={{ outline: "none" }}
                    />
                </Tooltip>
            </div>
        </Link>
    );
};

export default Basket;
