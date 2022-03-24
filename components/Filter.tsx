import {
    Button,
    Center,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FilterProps {
    highestPrice: number | undefined;
}

const Filter = ({ highestPrice }: FilterProps) => {
    const [range, setRange] = useState<number[] | undefined>(undefined);

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
                    {range && (
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
                    >
                        Apply Filter
                    </Button>
                </Center>
            )}
        </>
    );
};

export default Filter;
