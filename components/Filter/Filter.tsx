import {
    Button,
    Center,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Select,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { productCategories } from "../../constants";
import FilterSkeleton from "./FilterSkeleton";

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

    const buttonBreakpoint = useBreakpointValue({
        base: "xs",
        sm: "sm",
        md: "md",
    });
    const iconBreakpoint = useBreakpointValue({ base: "0.75rem", md: "1rem" });

    return (
        <>
            {highestPrice ? (
                <Center
                    flexDir={["column", "column", "row", "row", "column"]}
                    position={[
                        "static",
                        "static",
                        "static",
                        "static",
                        "sticky",
                    ]}
                    top={["unset", "unset", "unset", "unset", "11vh"]}
                    h={["unset", "unset", "unset", "unset", "89vh"]}
                    w={["100%", "100%", "100%", "100%", "25%"]}
                    px={["3rem", "3rem", "3rem", "3rem", "1rem"]}
                    mb={["3rem", "3rem", "3rem", "3rem", "unset"]}
                    justifyContent={[
                        "space-evenly",
                        "space-evenly",
                        "space-evenly",
                        "space-evenly",
                        "center",
                    ]}
                >
                    <Center
                        mb={["1.5rem", "1.5rem", "unset", "unset", "3rem"]}
                        flexDir="column"
                        w={["unset", "unset", "unset", "unset", "100%"]}
                    >
                        <Text
                            fontSize="inherit"
                            decoration="underline"
                            mb="1rem"
                        >
                            Category
                        </Text>
                        <Center
                            w={["unset", "unset", "unset", "unset", "100%"]}
                        >
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                name="category"
                                variant="filled"
                                icon={<BiDownArrow />}
                                iconSize={iconBreakpoint}
                                size={buttonBreakpoint}
                                _focus={{ outline: "none" }}
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
                    <Center
                        w={["50%", "50%", "50%", "50%", "100%"]}
                        flexDir="column"
                    >
                        {range && (
                            <>
                                <Text fontSize="inherit" decoration="underline">
                                    Price Range
                                </Text>
                                <Center
                                    w={["100%", "75%", "50%", "50%", "100%"]}
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
                            onChange={setRange}
                            colorScheme="purple"
                            max={highestPrice}
                            defaultValue={[0, highestPrice]}
                            w={["100%", "75%", "50%", "50%", "100%"]}
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb
                                _focus={{ outline: "none" }}
                                index={0}
                            />
                            <RangeSliderThumb
                                _focus={{ outline: "none" }}
                                index={1}
                            />
                        </RangeSlider>
                    </Center>
                    <Button
                        colorScheme="customPurple"
                        color="#fff"
                        mt={["1rem", "1rem", "unset", "unset", "1rem"]}
                        boxShadow="md"
                        onClick={() => filterProducts(category, range)}
                        size={buttonBreakpoint}
                        _focus={{ outline: "none" }}
                    >
                        Filter
                    </Button>
                </Center>
            ) : (
                <FilterSkeleton />
            )}
        </>
    );
};

export default Filter;
