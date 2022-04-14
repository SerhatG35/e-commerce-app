import {
    Button,
    Center,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Select,
    Skeleton,
    SkeletonText,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { productCategories } from "../constants";

interface FilterProps {
    highestPrice: number | undefined;
    filterProducts: (
        category: string,
        priceRange?: number[] | undefined
    ) => void;
    redirectedCategory: string | undefined;
}

const Filter = ({
    highestPrice,
    filterProducts,
    redirectedCategory,
}: FilterProps) => {
    const [range, setRange] = useState<number[] | undefined>(undefined);
    const [category, setCategory] = useState<string>("");

    useEffect(() => {
        redirectedCategory && setCategory(redirectedCategory);
    }, [redirectedCategory]);

    useEffect(() => {
        highestPrice && setRange([0, highestPrice]);
    }, [highestPrice]);

    useEffect(() => {
        if (category !== "" && range !== undefined)
            filterProducts(category, range);
    }, [range, redirectedCategory]);

    return (
        <>
            {highestPrice ? (
                <Center
                    flexDir={["row", "row", "row", "row", "column"]}
                    position={[
                        "static",
                        "static",
                        "static",
                        "static",
                        "sticky",
                    ]}
                    top={["unset", "unset", "unset", "unset", "10vh"]}
                    h={["unset", "unset", "unset", "unset", "89vh"]}
                    w={["90%", "90%", "90%", "90%", "25%"]}
                    px="1rem"
                    mb={["3rem", "3rem", "3rem", "3rem", ""]}
                >
                    <Center
                        mb={["1rem", "1rem", "1rem", "1rem", "3rem"]}
                        flexDir="column"
                    >
                        <Text decoration="underline" mb="1rem">
                            Category
                        </Text>
                        <Center>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                name="category"
                                variant="filled"
                                icon={<BiDownArrow />}
                                iconSize="1rem"
                            >
                                {productCategories.map((category, index) => (
                                    <option
                                        key={category}
                                        value={category}
                                        hidden={index === 0 ? true : false}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </Select>
                            {category !== "" && (
                                <Button
                                    onClick={() => setCategory("")}
                                    colorScheme="red"
                                    ml="0.5rem"
                                >
                                    X
                                </Button>
                            )}
                        </Center>
                    </Center>
                    <Center w="100%" flexDir="column">
                        {range && (
                            <>
                                <Text decoration="underline">Price Range</Text>
                                <Center
                                    w={["50%", "50%", "50%", "50%", "100%"]}
                                    justifyContent="space-between"
                                >
                                    <Text>
                                        {new Intl.NumberFormat("tr-TR", {
                                            style: "currency",
                                            currency: "TRY",
                                            notation: "compact",
                                        }).format(range[0])}
                                    </Text>
                                    <Text>
                                        {new Intl.NumberFormat("tr-TR", {
                                            style: "currency",
                                            currency: "TRY",
                                            notation: "compact",
                                        }).format(range[1])}
                                    </Text>
                                </Center>
                            </>
                        )}
                        <RangeSlider
                            aria-label={["min", "max"]}
                            onChangeEnd={(val) => setRange(val)}
                            colorScheme="purple"
                            max={highestPrice}
                            defaultValue={[0, highestPrice]}
                            w={["50%", "50%", "50%", "50%", "100%"]}
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                        </RangeSlider>
                    </Center>
                    <Button
                        colorScheme="customPurple"
                        color="#fff"
                        mt="1rem"
                        boxShadow="md"
                        onClick={() => filterProducts(category, range)}
                    >
                        Filter
                    </Button>
                </Center>
            ) : (
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
            )}
        </>
    );
};

export default Filter;
