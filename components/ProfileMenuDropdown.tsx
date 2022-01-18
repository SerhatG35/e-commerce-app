import {
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { Auth } from "service/axios";
import { removeAuthToken } from "utils/setTokens";
import { Toaster } from "./Toster";

const ProfileMenuDropdown = () => {
    const userToken = useUserToken();
    const { colorMode } = useColorMode();

    const logout = async () => {
        try {
            if (userToken?.userToken) {
                const result = await Auth.LOGOUT();
                result && removeAuthToken();
                userToken?.setUserToken(undefined);
            }
        } catch (error: any) {
            Toaster("Unauthorized", "", "error");
        }
    };

    const menuItemHoverColor = useColorModeValue("#50356C", "#242424");

    return (
        <Menu isLazy={true} autoSelect={false}>
            <MenuButton
                mr="1rem"
                aria-label="settings"
                as={IconButton}
                rounded="50%"
                colorScheme="customPurple"
                color="#fff"
                icon={<FiSettings size={20} strokeWidth={1.5} />}
                autoFocus={false}
            />
            <MenuList
                bg={colorMode === "light" ? "#262355" : "#fff"}
                color={colorMode === "light" ? "#fff" : "black"}
            >
                <MenuGroup>
                    <MenuItem
                        icon={<CgProfile size={24} />}
                        _hover={{
                            background: menuItemHoverColor,
                            color: "#fff",
                        }}
                    >
                        Profile
                    </MenuItem>
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
