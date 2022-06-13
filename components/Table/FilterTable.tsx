import {
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";

const FilterTable = () => {
    const [filterValues, setFilterValues] = useState<string[]>([
        "approved",
        "pending",
        "rejected",
    ]);

    const handleFilter = (keys: string[]) => {
        setFilterValues(keys);
    };

    const handleApplyFilter = () => {
        console.log(filterValues);
    };

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                _focus={{ outline: "none" }}
                as={Button}
                leftIcon={<AiOutlineFilter />}
            >
                Filter
            </MenuButton>
            <MenuList>
                <MenuOptionGroup
                    defaultValue={filterValues}
                    value={filterValues}
                    title="Status"
                    type="checkbox"
                    onChange={(e) => {
                        if (e.length <= 0) return;
                        handleFilter(e as string[]);
                    }}
                >
                    <MenuItemOption value="approved">Approved</MenuItemOption>
                    <MenuItemOption value="pending">Pending</MenuItemOption>
                    <MenuItemOption value="rejected">Rejected</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuItem onClick={handleApplyFilter} textAlign="center">
                    Apply Filter
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default FilterTable;
