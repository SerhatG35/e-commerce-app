import type { NextPage } from "next";
import { Center, Box } from "@chakra-ui/layout";
import Filter from "components/Filter";
import Cards from "components/Cards";

const Home: NextPage = () => {
    return (
        <Box w="100%" pt="10vh">
            <Center
                pt="1rem"
                maxW="1200px"
                h="90vh"
                margin="auto"
                alignItems="flex-start"
                justifyContent="space-between"
            >
                <Filter />
                <Cards />
            </Center>
        </Box>
    );
};

export default Home;
