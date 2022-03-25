import {
    Button,
    Center,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Select,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { productCategories } from "../constants";

interface FilterProps {
    highestPrice: number | undefined;
    filterProducts: (
        category: string,
        priceRange?: number[] | undefined
    ) => void;
}

const Filter = ({ highestPrice, filterProducts }: FilterProps) => {
    const [range, setRange] = useState<number[] | undefined>(undefined);
    const [category, setCategory] = useState<string>("");

    const applyFilter = () => {
        filterProducts(category);
    };

    useEffect(() => {
        highestPrice && setRange([0, highestPrice]);
    }, [highestPrice]);

    return (
        <>
            {highestPrice && (
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
                    <Button
                        mt="2rem"
                        boxShadow="xl"
                        color="#fff"
                        colorScheme="customPurple"
                        onClick={applyFilter}
                    >
                        Apply Filter
                    </Button>
                </Center>
            )}
        </>
    );
};

export default Filter;
