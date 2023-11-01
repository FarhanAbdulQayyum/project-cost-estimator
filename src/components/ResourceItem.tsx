import { Box, HStack, IconButton, Text } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons";

const ResourceItemStyles = {
    py: "5px",
    border: "1px solid",
    borderColor: "gray.900",
    borderRadius: "5px",
    w: "100%",
    cursor: "pointer",
    ':hover': {
        bgColor: "gray.500"
    }
}

interface IResourceItemProps {
    resource: IResource,
    onRemoveResource: (resourceName: string) => void
}

export const ResourceItem = ({ resource: { name, sku, unitPrice }, onRemoveResource }: IResourceItemProps) => {
    const onDelete = (e: any) => {
        e.stopPropagation();
        onRemoveResource(name);
    }
    return (
        <Box sx={ResourceItemStyles}>
            <HStack justifyContent="space-between">
                <HStack pl="5px" justifyContent="center" spacing="2px">
                    <Text>{name}</Text>
                    <Text mt="3px" fontSize="12px" color="gray.500">{`${unitPrice}  Rs/${sku}`}</Text>
                </HStack>
                <IconButton size="xs" mr="5px" onClick={onDelete} icon={<DeleteIcon />} aria-label='Delete' />
            </HStack>
        </Box>
    )
}