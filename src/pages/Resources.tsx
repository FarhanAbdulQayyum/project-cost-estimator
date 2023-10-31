import { Box, Button, Grid, GridItem, HStack, Heading, Text } from "@chakra-ui/react";
import { getAllResources } from "../data/data";
import { ResourceItem } from "../components/ResourceItem";

export const Resources = () => {
    const resources = getAllResources()

    const createResource = () => console.log('Resource Created')

    if (resources.length) {
        return (
            <Grid templateColumns='repeat(5, 1fr)' gap={6} width="100%">
                {resources.map((resource, index) => (
                    <GridItem key={`${resource.name}-${index}`} w="100%" h="10">
                        <ResourceItem resource={resource} />
                    </GridItem>
                ))}
            </Grid>
        )
    } else {
        return (
            <Box position="absolute" top="40%" right="30%" color="gray.600">
                <Heading> No Resources Found</Heading>
                <Button onClick={createResource} colorScheme="blue">Create Resource</Button>
            </Box>
        )
    }
}