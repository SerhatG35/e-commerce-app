import {
    Avatar,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    Tooltip,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import Link from "next/link";
import Router from "next/router";
import { CgLogOut } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { Auth } from "service/axios";
import { removeCookieAuthToken } from "utils/setCookies";
import { Toaster } from "../Toster";

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
        removeCookieAuthToken();
    };

    const menuItemHoverColor = useColorModeValue("#50356C", "#242424");

    return (
        <Menu isLazy={true} autoSelect={false}>
            <Tooltip label="Settings" closeOnMouseDown={true}>
                <MenuButton
                    mr="1rem"
                    aria-label="settings"
                    as={IconButton}
                    rounded="50%"
                    colorScheme="customPurple"
                    color="#fff"
                    icon={<FiSettings size={20} strokeWidth={1.5} />}
                    autoFocus={false}
                    _focus={{ outline: "none" }}
                />
            </Tooltip>
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
                            >
                                <Avatar
                                    size="xs"
                                    mr="8px"
                                    name={userToken?.userToken?.name}
                                />
                                <TagLabel>
                                    {userToken?.userToken?.email}
                                </TagLabel>
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
