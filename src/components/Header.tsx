import { Button, HStack, Heading } from "@chakra-ui/react";

export const Header = () => {

    return (
        <HStack justifyContent="space-between" backgroundColor="blue.900" width="100%" p="10px" >
            <Heading fontWeight={600} fontSize="25px" color="whiteAlpha.900">
                Project Cost Estimator
            </Heading>
            <HStack spacing="10px">
                <Button>Upload Project</Button>
            </HStack>
        </HStack>
    )
}