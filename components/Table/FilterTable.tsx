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
import React, { FC, useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";

type FilterTableProps = {
    getReceivedPurchaseRequests?: (filter?: string[]) => Promise<void>;
    getSendedPurchaseRequests?: (filter?: string[]) => Promise<void>;
    tabIndex: number;
};

const FilterTable: FC<FilterTableProps> = ({
    getReceivedPurchaseRequests,
    getSendedPurchaseRequests,
    tabIndex,
}) => {
    const [filterValues, setFilterValues] = useState<string[]>([
        "Approved",
        "Pending",
        "Rejected",
    ]);

    const handleFilter = (keys: string[]) => {
        setFilterValues(keys);
    };

    const handleApplyFilter = () => {
        if (tabIndex === 0) getReceivedPurchaseRequests?.(filterValues);
        else if (tabIndex === 1) getSendedPurchaseRequests?.(filterValues);
        else return;
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
                    value={filterValues}
                    title="Status"
                    type="checkbox"
                    onChange={(e) => {
                        if (e.length <= 0) return;
                        handleFilter(e as string[]);
                    }}
                >
                    <MenuItemOption value="Approved">Approved</MenuItemOption>
                    <MenuItemOption value="Pending">Pending</MenuItemOption>
                    <MenuItemOption value="Rejected">Rejected</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuItem
                    closeOnSelect
                    onClick={handleApplyFilter}
                    textAlign="center"
                >
                    Apply Filter
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default FilterTable;
