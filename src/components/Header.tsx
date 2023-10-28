import { Box, Heading } from "@chakra-ui/react";

export const Header = () => (
    <Box backgroundColor="blue.900" width="100%" p="10px" >
        <Heading fontWeight={600} fontSize="25px" color="whiteAlpha.900">
            Project Cost Estimator
        </Heading>
    </Box>
)