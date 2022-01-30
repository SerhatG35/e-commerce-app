import { Avatar, Center, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";

type ProfileProps = {
    user: Global.User.UserInfo | undefined;
};

const ProfileBar = ({ user }: ProfileProps) => {
    return (
        <Center
            w="20%"
            h="100%"
            style={{ boxShadow: "0 2px 0px 0px red" }}
            flexDir="column"
            fontSize="xl"
            justifyContent="flex-start"
            userSelect="none"
        >
            <Avatar size="2xl" name={`${user?.name} ${user?.surname}`} />
            <Center my="1rem" flexDir="column">
                <Text fontWeight="thin" borderBottom="1px solid">
                    Name
                </Text>
                <Text fontWeight="semibold">{`${user?.name} ${user?.surname}`}</Text>
            </Center>
            <Center my="1rem" flexDir="column">
                <Text fontWeight="thin" borderBottom="1px solid">
                    City
                </Text>
                <Text fontWeight="semibold">{user?.city}</Text>
            </Center>
            <Center my="1rem" flexDir="column">
                <Text fontWeight="thin" borderBottom="1px solid">
                    Account Created
                </Text>
                <Text fontWeight="semibold">
                    {dayjs(user?.createdAt).format("MMM DD, YYYY")}
                </Text>
            </Center>
            <EditProfile user={user} />
        </Center>
    );
};

export default ProfileBar;
