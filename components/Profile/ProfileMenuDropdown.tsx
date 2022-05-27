import {
    Avatar,
    Button,
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
import { CgLogOut } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { Auth } from "service/axios";
import { COLOR_MODE_PREFERENCE } from "theme";
import { useLocalStorage } from "usehooks-ts";
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
                result && Router.push("/");
            }
        } catch (error: any) {
            Router.push("/");
            Toaster("Unauthorized", "", "error");
        }
        userToken?.setUserToken(undefined);
    };

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
                icon={<IoIosMenu size={iconBreakpoint} />}
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
                <MenuGroup title="Color Palette">
                    <MenuItem closeOnSelect={false}>
                        <Center w="100%" justifyContent="space-evenly">
                            <Button
                                onClick={() =>
                                    setColorModePreference({
                                        ...colorModePreference,
                                        colorPalette:
                                            COLOR_MODE_PREFERENCE.CUSTOM_GREEN,
                                    })
                                }
                                bg="#32B54E"
                                rounded="100%"
                                _hover={{ background: "#32B54E" }}
                                _active={{ background: "#32B54E" }}
                            />
                            <Button
                                onClick={() =>
                                    setColorModePreference({
                                        ...colorModePreference,
                                        colorPalette:
                                            COLOR_MODE_PREFERENCE.CUSTOM_ICE_CREAM,
                                    })
                                }
                                bg="#F68D32"
                                rounded="100%"
                                _hover={{ background: "#F68D32" }}
                                _active={{ background: "#F68D32" }}
                            />
                            <Button
                                onClick={() =>
                                    setColorModePreference({
                                        ...colorModePreference,
                                        colorPalette:
                                            COLOR_MODE_PREFERENCE.CUSTOM_PINK_AND_PURPLE,
                                    })
                                }
                                bg="#A277B3"
                                rounded="100%"
                                _hover={{ background: "#A277B3" }}
                                _active={{ background: "#A277B3" }}
                            />
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
