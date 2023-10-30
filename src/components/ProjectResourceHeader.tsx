import { SimpleGrid, Text } from "@chakra-ui/react"

export const ProjectResourceHeader = () => {
    return (
        <SimpleGrid fontWeight="500" spacing={20} columns={4} width="60%" mb={2}>
            <Text>Name</Text>
            <Text>Unit Price</Text>
            <Text>Quantity</Text>
            <Text>Sub Total</Text>
        </SimpleGrid>
    )
} 