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
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { ColorPalettes } from "../../constants";
import { Toaster } from "../../utils/Toster";

type ColorModePreferenceType = {
    colorPalette: COLOR_MODE_PREFERENCE;
    useSystemColorMode: boolean;
};

const ProfileMenuDropdown = () => {
    const userToken = useUserToken();

    const currentStatusOfLocalStorage =
        useReadLocalStorage<ColorModePreferenceType>("ColorModePreference");

    const [colorModePreference, setColorModePreference] =
        useLocalStorage<ColorModePreferenceType>(
            "ColorModePreference",
            currentStatusOfLocalStorage
                ? { ...currentStatusOfLocalStorage }
                : {
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
                                    <TagLabel fontWeight={600}>
                                        {`${userToken?.userToken?.name} ${userToken?.userToken?.surname}`}
                                    </TagLabel>
                                    <TagLabel opacity={0.5} fontSize="0.7rem">
                                        {userToken?.userToken?.email}
                                    </TagLabel>
                                </Center>
                            </Tag>
                        </MenuItem>
                    </Link>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup fontSize="inherit" title="Color Palette">
                    <Center w="100%" justifyContent="space-evenly">
                        {ColorPalettes.map((color) => (
                            <IconButton
                                key={color.preference}
                                size="sm"
                                w="32px"
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
