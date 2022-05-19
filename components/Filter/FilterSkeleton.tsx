import {
    Center,
    Flex,
    Skeleton,
    SkeletonText,
    useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FilterSkeleton = () => {
    const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(true);
    }, []);

    return (
        <>
            {flag &&
                (isLargerThan1280 ? (
                    <Center px="1rem" flexDir="column" w="25%" h="89vh">
                        <SkeletonText
                            w="50%"
                            noOfLines={1}
                            mb="1rem"
                            startColor="#262355"
                            endColor="#7B75C7"
                        />
                        <Skeleton
                            w="90%"
                            h="40px"
                            rounded="6px"
                            startColor="#262355"
                            endColor="#7B75C7"
                            mb="3rem"
                        />
                        <SkeletonText
                            w="50%"
                            noOfLines={1}
                            mb="1rem"
                            startColor="#262355"
                            endColor="#7B75C7"
                        />
                        <Skeleton
                            mb="1rem"
                            w="90%"
                            h="40px"
                            rounded="6px"
                            startColor="#262355"
                            endColor="#7B75C7"
                        />
                        <Skeleton
                            w="40%"
                            h="40px"
                            mt="1rem"
                            rounded="6px"
                            startColor="#262355"
                            endColor="#7B75C7"
                        />
                    </Center>
                ) : (
                    <Center
                        mb="3rem"
                        px="3rem"
                        w="100%"
                        justifyContent="space-evenly"
                        flexDir={[
                            "column",
                            "column",
                            "unset",
                            "unset",
                            "unset",
                        ]}
                    >
                        <Flex
                            flexDir="column"
                            alignItems="center"
                            mb={["1.5rem", "1.5rem", "0px", "0px", "0px"]}
                            w="30%"
                        >
                            <Skeleton
                                w="50%"
                                startColor="#262355"
                                endColor="#7B75C7"
                                mb="1rem"
                                h="15px"
                            />
                            <Skeleton
                                w="100%"
                                h="32px"
                                rounded="6px"
                                startColor="#262355"
                                endColor="#7B75C7"
                            />
                        </Flex>
                        <Flex flexDir="column" alignItems="center" w="50%">
                            <Skeleton
                                w="25%"
                                startColor="#262355"
                                endColor="#7B75C7"
                                mb="1rem"
                                h="15px"
                            />
                            <Skeleton
                                w="75%"
                                h="30px"
                                rounded="6px"
                                startColor="#262355"
                                endColor="#7B75C7"
                            />
                        </Flex>
                        <Skeleton
                            w={["20%", "20%", "15%", "15%", "unset"]}
                            h={["24px", "32px", "40px", "40px", "unset"]}
                            mt={["1rem", "1rem", "0px", "0px", "0px"]}
                            rounded="6px"
                            startColor="#262355"
                            endColor="#7B75C7"
                        />
                    </Center>
                ))}
        </>
    );
};

export default FilterSkeleton;
