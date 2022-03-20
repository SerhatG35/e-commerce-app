import {
    Avatar,
    Box,
    Center,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";

interface ProfileBarTypes {
    user: Global.User.UserInfo | undefined;
    usersOwnProfile: boolean;
}

const ProfileBar = ({ user, usersOwnProfile }: ProfileBarTypes) => {
    return (
        <Center
            w="20%"
            h="89vh"
            position="sticky"
            top="10vh"
            flexDir="column"
            fontSize="xl"
            justifyContent="flex-start"
            userSelect="none"
        >
            {user ? (
                <>
                    <Avatar
                        size="2xl"
                        name={`${user?.name} ${user?.surname}`}
                    />
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
                    {usersOwnProfile && <EditProfile user={user} />}
                </>
            ) : (
                <Box>
                    <SkeletonCircle
                        startColor="#262355"
                        endColor="#7B75C7"
                        size="128px"
                    />
                    <SkeletonText
                        rounded="12px"
                        startColor="#262355"
                        endColor="#7B75C7"
                        h="20px"
                        mt="3.5rem"
                        noOfLines={2}
                    />
                    <SkeletonText
                        rounded="12px"
                        startColor="#262355"
                        endColor="#7B75C7"
                        h="20px"
                        mt="3.5rem"
                        noOfLines={2}
                    />
                    <SkeletonText
                        rounded="12px"
                        startColor="#262355"
                        endColor="#7B75C7"
                        h="20px"
                        mt="3.5rem"
                        noOfLines={2}
                    />
                    <Skeleton
                        rounded="12px"
                        startColor="#262355"
                        endColor="#7B75C7"
                        h="30px"
                        mt="3.5rem"
                    />
                </Box>
            )}
        </Center>
    );
};

export default ProfileBar;
