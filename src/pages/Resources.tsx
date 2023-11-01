import { Box, Button, Grid, GridItem, HStack, Heading } from "@chakra-ui/react";
import { getAllResources } from "../data/data";
import { ResourceItem } from "../components/ResourceItem";
import { UpdateResourceModal } from "../components/UpdateResourceModal";
import { useState } from "react";

export const Resources = () => {
    const [resources, setResources] = useState<IResource[]>(getAllResources())
    const [showUpdateResourceModal, setShowUpdateResourceModal] = useState(false)
    const [resourceModalMode, setResourceModalMode] = useState<ResourceModalMode>()
    const [resourceToUpdate, setResourceToUpdate] = useState<IResource>();
    const createResource = () => console.log('Resource Created')


    const onResourceSaved = () => {
        setResources(getAllResources());
        setShowUpdateResourceModal(false)
    }

    const addResource = () => {
        setResourceModalMode('ADD')
        setResourceToUpdate({ name: '', unitPrice: 0, sku: '' })
        setShowUpdateResourceModal(true)
    }

    const updateResource = (resource: IResource) => {
        setResourceModalMode('EDIT')
        setResourceToUpdate(resource)
        setShowUpdateResourceModal(true)
    }

    return (
        <>
            <HStack>
                <Heading>Resources</Heading>
                <Button colorScheme="blue" onClick={addResource}> Add Resource</Button>
            </HStack>
            {
                resources.length &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} width="100%" >
                    {
                        resources.map((resource, index) => (
                            <GridItem key={`${resource.name}-${index}`} w="100%" h="10">
                                <Box onClick={() => updateResource(resource)}>
                                    <ResourceItem resource={resource} />
                                </Box>
                            </GridItem>
                        ))
                    }
                </Grid >
            }
            {
                !resources.length &&
                <Box position="absolute" top="40%" right="30%" color="gray.600">
                    <Heading> No Resources Found</Heading>
                    <Button onClick={createResource} colorScheme="blue">Create Resource</Button>
                </Box>
            }
            <UpdateResourceModal onSave={onResourceSaved} onClose={() => setShowUpdateResourceModal(false)}
                isOpen={showUpdateResourceModal} mode={resourceModalMode as ResourceModalMode}
                resourceToUpdate={resourceToUpdate as IResource} />
        </>
    )
}
