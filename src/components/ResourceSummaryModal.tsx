import { Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { ResourceItem } from "./ResourceItem";
import { ProjectResource } from "./ProjectResource";


interface IResourceSummaryProps {
    isOpen: boolean;
    onClose: () => void;
    resourceSummary: IProjectResource[]
}

export const ResourceSummaryModal = ({ isOpen, onClose, resourceSummary }: IResourceSummaryProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Project Resource Summary</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mb="20px">
                        <SimpleGrid fontWeight="500" columns={4}>
                            <Text>Name</Text>
                            <Text>Price</Text>
                            <Text>Quantity</Text>
                            <Text>Sub Total</Text>
                        </SimpleGrid>

                        {
                            resourceSummary.map(projectResource =>
                                <SimpleGrid columns={4}>
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
                    </Box>

                </ModalBody>
            </ModalContent>
        </Modal>
    )

}