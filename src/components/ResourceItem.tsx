import { Box, HStack, Text } from "@chakra-ui/react"

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

export const ResourceItem = ({ resource: { name, sku, unitPrice } }: { resource: IResource }) => {
    const onResourceClick = (_name: string) => console.log("Resource Clicked", _name)

    return (
        <Box sx={ResourceItemStyles} onClick={() => onResourceClick(name)}>
            <HStack justifyContent="center" spacing="2px">
                <Text>{name}</Text>
                <Text mt="3px" fontSize="12px" color="gray.500">{`${unitPrice}  Rs/${sku}`}</Text>
            </HStack>
        </Box>
    )
}