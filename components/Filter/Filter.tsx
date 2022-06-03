import {
    Button,
    Center,
    Collapse,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Select,
    Text,
    useBreakpointValue,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import {
    IoIosArrowBack,
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosArrowUp,
} from "react-icons/io";
import { productCategories } from "../../constants";
import FilterSkeleton from "./FilterSkeleton";

interface FilterProps {
    highestPrice: number | undefined;
    filterProducts: (
        category?: string,
        priceRange?: number[],
        shouldCategoryIncluded?: boolean
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

    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
    const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
    const buttonBreakpoint = useBreakpointValue({
        base: "xs",
        sm: "sm",
        md: "md",
    });
    const iconBreakpoint = useBreakpointValue({ base: "0.75rem", md: "1rem" });

    useEffect(() => {
        redirectedCategory && setCategory(redirectedCategory);
    }, [redirectedCategory]);

    useEffect(() => {
        highestPrice && setRange([0, highestPrice]);
    }, [highestPrice]);

    const handleFilterProducts = () => {
        filterProducts(category, range, category === "" ? false : true);
    };

    return (
        <>
            {highestPrice ? (
                <>
                    <Collapse
                        style={{ width: isLargerThan1280 ? "25%" : "100%" }}
                        in={isOpen}
                        animateOpacity
                    >
                        <Center
                            flexDir={[
                                "column",
                                "column",
                                "row",
                                "row",
                                "column",
                            ]}
                            position={[
                                "static",
                                "static",
                                "static",
                                "static",
                                "sticky",
                            ]}
                            top={["unset", "unset", "unset", "unset", "11vh"]}
                            h={["unset", "unset", "unset", "unset", "89vh"]}
                            w="100%"
                            px={["3rem", "3rem", "3rem", "3rem", "1rem"]}
                            justifyContent={[
                                "space-evenly",
                                "space-evenly",
                                "space-evenly",
                                "space-evenly",
                                "center",
                            ]}
                        >
                            <Center
                                mb={[
                                    "1.5rem",
                                    "1.5rem",
                                    "unset",
                                    "unset",
                                    "3rem",
                                ]}
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
                                    w={[
                                        "unset",
                                        "unset",
                                        "unset",
                                        "unset",
                                        "100%",
                                    ]}
                                >
                                    <Select
                                        value={category}
                                        onChange={(e: any) =>
                                            setCategory(e.target.value)
                                        }
                                        name="category"
                                        variant="filled"
                                        icon={<BiDownArrow />}
                                        iconSize={iconBreakpoint}
                                        size={buttonBreakpoint}
                                        _focus={{ outline: "none" }}
                                    >
                                        {productCategories.map(
                                            (category, index) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                    hidden={
                                                        index === 0
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {category}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                    {category !== "" && (
                                        <Button
                                            onClick={() => setCategory("")}
                                            ml="0.5rem"
                                            colorScheme="red"
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
                                        <Text
                                            fontSize="inherit"
                                            decoration="underline"
                                        >
                                            Price Range
                                        </Text>
                                        <Center
                                            w={[
                                                "100%",
                                                "75%",
                                                "50%",
                                                "50%",
                                                "100%",
                                            ]}
                                            justifyContent="space-between"
                                        >
                                            <Text>
                                                {new Intl.NumberFormat(
                                                    "tr-TR",
                                                    {
                                                        style: "currency",
                                                        currency: "TRY",
                                                        notation: "compact",
                                                    }
                                                ).format(range[0])}
                                            </Text>
                                            <Text>
                                                {new Intl.NumberFormat(
                                                    "tr-TR",
                                                    {
                                                        style: "currency",
                                                        currency: "TRY",
                                                        notation: "compact",
                                                    }
                                                ).format(range[1])}
                                            </Text>
                                        </Center>
                                    </>
                                )}
                                <RangeSlider
                                    aria-label={["min", "max"]}
                                    onChange={setRange}
                                    max={highestPrice}
                                    defaultValue={[0, highestPrice]}
                                    w={["100%", "75%", "50%", "50%", "100%"]}
                                    mt="0.5rem"
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
                                mt={["1rem", "1rem", "unset", "unset", "1rem"]}
                                boxShadow="md"
                                onClick={handleFilterProducts}
                                size={buttonBreakpoint}
                                _focus={{ outline: "none" }}
                            >
                                Apply Filter
                            </Button>
                        </Center>
                    </Collapse>
                    <IconButton
                        icon={
                            isLargerThan1280 ? (
                                isOpen ? (
                                    <IoIosArrowBack />
                                ) : (
                                    <IoIosArrowForward />
                                )
                            ) : isOpen ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            )
                        }
                        aria-label="toggle-filter"
                        onClick={onToggle}
                        _focus={{ outline: "none" }}
                        variant="ghost"
                        my={["1.5rem", "1.5rem", "1.5rem", "1.5rem", "0"]}
                        alignSelf="center"
                    />
                </>
            ) : (
                <FilterSkeleton />
            )}
        </>
    );
};

export default Filter;
