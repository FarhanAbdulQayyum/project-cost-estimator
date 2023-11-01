import { Box, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const sideBarItemStyle = {
    borderBottom: "2px solid",
    borderColor: "blackAlpha.600",
    py: "10px",
    cursor: "pointer",
    ":hover": {
        bgColor: "gray.400"
    }
}

const selectedItemStyle = {
    ...sideBarItemStyle,
    bgColor: "gray.400"
}

const sideBarItemTextStyle = {
    color: "blackAlpha.900",
    textAlign: "center"
}

interface ISideBarProps {
    name: string,
    path: string
}

export const SideBarItem = ({ name, path }: ISideBarProps) => (
    <NavLink to={path}>
        {({ isActive }) => (
            <Box sx={isActive ? selectedItemStyle : sideBarItemStyle}>
                <Text sx={sideBarItemTextStyle}> {name} </Text>
            </Box>
        )}
    </NavLink>
)