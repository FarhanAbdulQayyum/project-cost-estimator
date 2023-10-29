import { HStack, Text } from "@chakra-ui/react"

export const ProjectResourceHeader = () => {
    return (
        <HStack mb={10}>
            <Text>Name</Text>
            <Text>Unit Price</Text>
            <Text>Quantity</Text>
            <Text>Sub Total</Text>
        </HStack>
    )
} 