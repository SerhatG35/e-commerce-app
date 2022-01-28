import { Avatar, Center, IconButton, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { MdOutlineChangeCircle } from "react-icons/md";

type ProfileProps = {
    user: Global.Login.AccessToken | undefined;
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
            textAlign="start"
            userSelect="none"
        >
            <IconButton
                aria-label="Change profile"
                icon={<MdOutlineChangeCircle size={30} />}
                alignSelf="start"
                rounded="50%"
                colorScheme="customPurple"
                color="#fff"
            />
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

export default ProfileBar;
