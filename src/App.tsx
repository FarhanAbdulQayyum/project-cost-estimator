import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <Box h="100vh" overflow="hidden">
      <Header />
      <HStack gap={6} height="100%" alignItems="top">
        <Box width="17%">
          <SideBar />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </HStack>
    </Box>
  )
}

export default App
