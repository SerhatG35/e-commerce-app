import {
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import { Api } from "global";
import { Auth } from "service/axios";

const ProfileMenuDropdown = ({
    data,
}: {
    data: Api.Login.LoginResponseData;
}) => {
    const userToken = useUserToken();
    const logout = () => {
        Auth.LOGOUT();
        userToken?.setUserToken(undefined);
    };

    return (
        <Menu>
            <MenuButton as={Button}>Profile</MenuButton>
            <MenuList>
                <MenuGroup title={data.name}>
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenuDropdown;
