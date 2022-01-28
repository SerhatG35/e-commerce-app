import { Avatar, Center, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

type ProfileProps = {
    user: Global.Login.AccessToken | undefined;
};
// DAYJS KUR
const Profile = ({ user }: ProfileProps) => {
    return (
        <Center
            w="20%"
            h="100%"
            style={{ boxShadow: "0 2px 0px 0px red" }}
            flexDir="column"
            fontSize="xl"
            justifyContent="flex-start"
            textAlign="start"
            userSelect="none"
        >
            <Avatar size="2xl" name={`${user?.name} ${user?.surname}`} />
            <Center my="1.5rem" flexDir="column">
                <Text fontWeight="thin" borderBottom="1px solid">
                    Name
                </Text>
                <Text fontWeight="semibold">{`${user?.name} ${user?.surname}`}</Text>
            </Center>
            <Center my="1.5rem" flexDir="column">
                <Text fontWeight="thin" borderBottom="1px solid">
                    City
                </Text>
                <Text fontWeight="semibold">{user?.city}</Text>
            </Center>
            <Center my="1.5rem" flexDir="column">
                <Text fontWeight="thin" borderBottom="1px solid">
                    Account Created
                </Text>
                <Text fontWeight="semibold">
                    {dayjs(user?.createdAt).format("MMM DD, YYYY")}
                </Text>
            </Center>
        </Center>
    );
};

export default Profile;
