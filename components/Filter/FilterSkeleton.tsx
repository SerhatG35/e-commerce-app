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
                            h="25px"
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
                            h="25px"
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
                    >
                        <Flex flexDir="column" alignItems="center" w="30%">
                            <Skeleton
                                w="50%"
                                startColor="#262355"
                                endColor="#7B75C7"
                                mb="1rem"
                                h="15px"
                            />
                            <Skeleton
                                w="100%"
                                h={["30px", "40px"]}
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
                            w="10%"
                            h={["20px", "30px", "40px"]}
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
