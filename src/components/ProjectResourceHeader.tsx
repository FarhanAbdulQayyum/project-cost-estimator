import { SimpleGrid, Text } from "@chakra-ui/react"

export const ProjectResourceHeader = () => {
    return (
        <SimpleGrid fontWeight="500" spacing={5} columns={5} width="95%" mb={2}>
            <Text>Name</Text>
            <Text>Price</Text>
            <Text>Quantity</Text>
            <Text>Sub Total</Text>
            <Text>Actions</Text>
        </SimpleGrid>
    )
} 