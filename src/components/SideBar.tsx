import { Box, Text } from "@chakra-ui/react";

const sideBarItemStyle = {
    borderBottom: "2px solid",
    borderColor: "blackAlpha.600",
    py: "10px",
    cursor: "pointer",
    ":hover": {
        bgColor: "gray.600"
    }
}

const sideBarItemTextStyle = {
    color: "blackAlpha.900",
    textAlign: "center"
}

export const SideBar = () => (
    <Box h="100%" bgColor="gray.300">
        <Box sx={sideBarItemStyle}>
            <Text sx={sideBarItemTextStyle}> My Projects </Text>
        </Box>
        <Box sx={sideBarItemStyle}>
            <Text sx={sideBarItemTextStyle}> Resources </Text>
        </Box>
    </Box>
)