import { Box, HStack } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <Box h="100vh" overflow="hidden">
      <Header />
      <HStack gap={0} height="100%" alignItems="top">
        <Box width="17%">
          <SideBar />
        </Box>
        <Box width="83%" p={5}>
          <Outlet />
        </Box>
      </HStack>
    </Box>
  )
}

export default App
