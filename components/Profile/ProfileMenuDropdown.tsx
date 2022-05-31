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
    Switch,
    Tag,
    TagLabel,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useUserToken } from "context/userContext";
import Link from "next/link";
import Router from "next/router";
import { BsFillPaletteFill } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { Auth } from "service/axios";
import { COLOR_MODE_PREFERENCE } from "theme";
import { useLocalStorage } from "usehooks-ts";
import { ColorPalettes } from "../../constants";
import { Toaster } from "../../utils/Toster";

const ProfileMenuDropdown = () => {
    const userToken = useUserToken();

    const [colorModePreference, setColorModePreference] = useLocalStorage(
        "ColorModePreference",
        {
            colorPalette: COLOR_MODE_PREFERENCE.CUSTOM_GREEN,
            useSystemColorMode: false,
        }
    );

    const logout = async () => {
        try {
            if (userToken?.userToken) {
                const result = await Auth.LOGOUT();
                if (result) {
                    Router.push("/");
                    userToken?.setUserToken(undefined);
                }
            }
        } catch (error: any) {
            Router.push("/");
            userToken?.setUserToken(undefined);
            Toaster("Unauthorized", "", "error");
        }
    };

    const buttonBreakpoint = useBreakpointValue({
        base: "sm",
        md: "md",
    });

    return (
        <Menu isLazy={true} autoSelect={false}>
            <MenuButton
                mr="1rem"
                aria-label="settings"
                as={IconButton}
                fontSize="inherit"
                rounded="50%"
                icon={<IoIosMenu />}
                autoFocus={false}
                _focus={{ outline: "none" }}
                size={buttonBreakpoint}
            />
            <MenuList>
                <MenuGroup>
                    <Link href={`/profile/${userToken?.userToken?._id}`}>
                        <MenuItem>
                            <Tag
                                size="lg"
                                borderRadius="full"
                                fontSize="inherit"
                                color="inherit"
                                py="0.25rem"
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
                                    <TagLabel fontSize="0.8rem">
                                        {userToken?.userToken?.email}
                                    </TagLabel>
                                </Center>
                            </Tag>
                        </MenuItem>
                    </Link>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup fontSize="inherit" title="Color Palette">
                    <MenuItem closeOnSelect={false}>
                        <Center w="100%" justifyContent="space-evenly">
                            {ColorPalettes.map((color) => (
                                <IconButton
                                    size="sm"
                                    aria-label="color-palette"
                                    onClick={() =>
                                        setColorModePreference({
                                            ...colorModePreference,
                                            colorPalette: color.preference,
                                        })
                                    }
                                    bg={color.hex}
                                    rounded="100%"
                                    _hover={{
                                        background: color.hex,
                                    }}
                                    _active={{
                                        background: color.hex,
                                    }}
                                    icon={
                                        colorModePreference.colorPalette ===
                                        color.preference ? (
                                            <BsFillPaletteFill />
                                        ) : (
                                            <></>
                                        )
                                    }
                                />
                            ))}
                        </Center>
                    </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="System Color Mode">
                    <MenuItem closeOnSelect={false}>
                        <Switch
                            isChecked={colorModePreference.useSystemColorMode}
                            onChange={(e: any) =>
                                setColorModePreference({
                                    ...colorModePreference,
                                    useSystemColorMode: e.target.checked,
                                })
                            }
                        />
                    </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem onClick={logout} icon={<CgLogOut size={24} />}>
                        Logout
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenuDropdown;
