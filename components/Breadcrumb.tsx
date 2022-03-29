import {
    Breadcrumb as BreadcrumbWrapper,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface BreadcrumbTypes {
    parentText: string;
    childText: string;
}

const Breadcrumb = ({ parentText, childText }: BreadcrumbTypes) => {
    return (
        <BreadcrumbWrapper
            spacing="8px"
            separator={<IoIosArrowForward color="gray.500" />}
            alignSelf="flex-start"
            fontSize="0.8rem"
        >
            <BreadcrumbItem>
                <Link passHref href="/">
                    <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link
                    passHref
                    href={{ pathname: "/", query: { category: parentText } }}
                >
                    <BreadcrumbLink>{parentText}</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">{childText}</BreadcrumbLink>
            </BreadcrumbItem>
        </BreadcrumbWrapper>
    );
};

export default Breadcrumb;
