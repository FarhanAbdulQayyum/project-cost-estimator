import { HStack, SimpleGrid, Text } from "@chakra-ui/react"

interface IProjectResourceProps {
    projectResource: IProjectResource;
    subProjectId: number;
    onUpdateResource: (id: number, currentResource: Partial<IProjectResource>, mode: ResourceModalMode) => void;
}

export const ProjectResource = ({ projectResource, onUpdateResource, subProjectId }: IProjectResourceProps) => {
    return (
        <SimpleGrid spacing={20} columns={4} width="60%" onClick={() => onUpdateResource(subProjectId, projectResource, "EDIT")}>
            <Text>{projectResource.name}</Text>
            <HStack>
                <Text>{projectResource.unitPrice}</Text>
                <Text mt="3px" fontSize="12px" color="gray.500">{`Rs/${projectResource.sku}`}</Text>
            </HStack>
            <Text>{projectResource.quantity}</Text>
            <Text>{projectResource.total}</Text>
        </SimpleGrid>
    )
} 