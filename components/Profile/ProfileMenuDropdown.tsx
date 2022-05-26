import {
    Avatar,
    Center,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import Link from "next/link";
import Router from "next/router";
import { CgLogOut } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { Auth } from "service/axios";
import { Toaster } from "../../utils/Toster";

const ProfileMenuDropdown = () => {
    const userToken = useUserToken();
    const { colorMode } = useColorMode();

    const logout = async () => {
        try {
            if (userToken?.userToken) {
                const result = await Auth.LOGOUT();
                result && Router.push("/");
            }
        } catch (error: any) {
            Router.push("/");
            Toaster("Unauthorized", "", "error");
        }
        userToken?.setUserToken(undefined);
    };

    const menuItemHoverColor = useColorModeValue("#50356C", "#242424");
    const buttonBreakpoint = useBreakpointValue({
        base: "sm",
        md: "md",
    });
    const iconBreakpoint = useBreakpointValue({ base: 10, md: 20 });

    return (
        <Menu isLazy={true} autoSelect={false}>
            <MenuButton
                mr="1rem"
                aria-label="settings"
                as={IconButton}
                rounded="50%"
                colorScheme="customPurple"
                color="#fff"
                icon={<IoIosMenu size={iconBreakpoint} />}
                autoFocus={false}
                _focus={{ outline: "none" }}
                size={buttonBreakpoint}
            />
            <MenuList
                bg={colorMode === "light" ? "#262355" : "#fff"}
                color={colorMode === "light" ? "#fff" : "black"}
            >
                <MenuGroup>
                    <Link href={`/profile/${userToken?.userToken?._id}`}>
                        <MenuItem
                            _hover={{
                                background: menuItemHoverColor,
                                color: "#fff",
                            }}
                        >
                            <Tag
                                size="lg"
                                colorScheme="customPurple"
                                borderRadius="full"
                                fontSize="inherit"
                            >
                                <Avatar
                                    size="xs"
                                    mr="8px"
                                    name={userToken?.userToken?.name}
                                />
                                <Center
                                    flexDir="column"
                                    alignItems="flex-start"
                                >
                                    <TagLabel>
                                        {`${userToken?.userToken?.name} ${userToken?.userToken?.surname}`}
                                    </TagLabel>
                                    <TagLabel
                                        fontSize="0.8rem"
                                        color="gray.400"
                                        isTruncated
                                    >
                                        {userToken?.userToken?.email}
                                    </TagLabel>
                                </Center>
                            </Tag>
                        </MenuItem>
                    </Link>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem
                        _hover={{
                            background: menuItemHoverColor,
                            color: "#fff",
                        }}
                        onClick={logout}
                        icon={<CgLogOut size={24} />}
                    >
                        Logout
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenuDropdown;
