import { HStack, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface IProjectResourceProps {
    onRemove: (parentId: number, item: IItemToRemoveItem) => void;
    projectResource: IProjectResource;
    subProjectId: number;
    onUpdateResource: (id: number, currentResource: Partial<IProjectResource>, mode: ResourceModalMode) => void;
}

export const ProjectResource = ({ projectResource, onUpdateResource, subProjectId, onRemove }: IProjectResourceProps) => {
    return (
        <SimpleGrid spacing={20} columns={5} width="60%">
            <Text>{projectResource.name}</Text>
            <HStack>
                <Text>{projectResource.unitPrice}</Text>
                <Text mt="3px" fontSize="12px" color="gray.500">{`Rs/${projectResource.sku}`}</Text>
            </HStack>
            <Text>{projectResource.quantity}</Text>
            <Text>{projectResource.total}</Text>
            <HStack>
                <IconButton size='sm' icon={<EditIcon />} onClick={() => onUpdateResource(subProjectId, projectResource, "EDIT")} aria-label='Edit' />
                <IconButton size='sm' icon={<DeleteIcon />} onClick={() => onRemove(subProjectId, { id: projectResource.id, name: projectResource.name })} aria-label='Edit' />
            </HStack>
        </SimpleGrid>
    )
} 