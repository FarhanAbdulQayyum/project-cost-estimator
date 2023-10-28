import { Box } from "@chakra-ui/react";
import { SideBarItem } from "./SideBarItem";

export const SideBar = () => (
    <Box h="100%" bgColor="gray.300">
        <SideBarItem name="My Projects" path="/my-projects" />
        <SideBarItem name="Resources" path="/resources" />
    </Box>
)
