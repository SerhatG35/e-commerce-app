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
                    flexDir="column"
                    position="sticky"
                    top="10vh"
                    h="89vh"
                    w="25%"
                    px="1rem"
                >
                    <Center mb="3rem" flexDir="column">
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
                    {range && (
                        <>
                            <Text decoration="underline">Price Range</Text>
                            <Center w="100%" justifyContent="space-between">
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
                    >
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                    </RangeSlider>
                    <Button onClick={() => filterProducts(category, range)}>
                        filter
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
