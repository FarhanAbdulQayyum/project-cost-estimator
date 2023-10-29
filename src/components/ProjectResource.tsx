import { HStack, Text } from "@chakra-ui/react"

export const ProjectResource = ({ projectResource }: { projectResource: IProjectResource }) => {
    return (
        <HStack>
            <Text>{projectResource.name}</Text>
            <HStack>
                <Text>{projectResource.unitPrice}</Text>
                <Text>{`Rs per ${projectResource.sku}`}</Text>
            </HStack>
            <Text>{projectResource.quantity}</Text>
            <Text>{projectResource.total}</Text>
        </HStack>
    )
} 