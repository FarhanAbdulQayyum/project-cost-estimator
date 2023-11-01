import { Box, Button, Grid, GridItem, HStack, Heading } from "@chakra-ui/react";
import { data, getAllResources } from "../data/data";
import { ResourceItem } from "../components/ResourceItem";
import { UpdateResourceModal } from "../components/UpdateResourceModal";
import { useState } from "react";
import { RemoveItemModal } from "../components/RemoveItemModal";

export const Resources = () => {
    const [resources, setResources] = useState<IResource[]>(getAllResources())
    const [showUpdateResourceModal, setShowUpdateResourceModal] = useState(false)
    const [resourceModalMode, setResourceModalMode] = useState<ResourceModalMode>()
    const [resourceToUpdate, setResourceToUpdate] = useState<IResource>();
    const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState('');



    const onResourceSaved = () => {
        setResources(getAllResources());
        setShowUpdateResourceModal(false)
    }

    const onRemoveResource = (resourceName: string) => {
        setItemToRemove(resourceName)
        setShowRemoveItemModal(true);
    }

    const removeResource = () => {
        data.resources = resources.filter(resource => resource.name !== itemToRemove)
        setResources(getAllResources());
        setShowRemoveItemModal(false);
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
            <HStack justifyContent="space-between" mb="20px">
                <Heading fontSize="lg" fontWeight="bold">Resources</Heading>
                <Button size="sm" colorScheme="blue" onClick={addResource}> Add Resource</Button>
            </HStack>
            {
                resources.length > 0 &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} width="100%" >
                    {
                        resources.map((resource, index) => (
                            <GridItem key={`${resource.name}-${index}`} w="100%" h="10">
                                <Box onClick={() => updateResource(resource)}>
                                    <ResourceItem onRemoveResource={onRemoveResource} resource={resource} />
                                </Box>
                            </GridItem>
                        ))
                    }
                </Grid >
            }
            {
                resources.length == 0 &&
                <Box position="absolute" top="40%" right="30%" color="gray.600">
                    <Heading> No Resources Found</Heading>
                </Box>
            }
            <UpdateResourceModal onSave={onResourceSaved} onClose={() => setShowUpdateResourceModal(false)}
                isOpen={showUpdateResourceModal} mode={resourceModalMode as ResourceModalMode}
                resourceToUpdate={resourceToUpdate as IResource} />

            <RemoveItemModal isOpen={showRemoveItemModal} onClose={() => setShowRemoveItemModal(false)}
                onConfirm={removeResource} itemName={itemToRemove} />
        </>
    )
}
