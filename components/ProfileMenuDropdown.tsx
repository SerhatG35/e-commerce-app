import {
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { Api } from "global";

const ProfileMenuDropdown = ({
    data,
}: {
    data: Api.Login.LoginResponseData;
}) => {
    return (
        <Menu>
            <MenuButton as={Button}>Profile</MenuButton>
            <MenuList>
                <MenuGroup title={data.name}>
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenuDropdown;
