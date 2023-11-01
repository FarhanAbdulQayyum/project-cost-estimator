import { Box, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { saveResource } from "../data/data";

interface IUpdateResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedValue: IResource) => void;
    resourceToUpdate: IResource
    mode: ResourceModalMode
}

interface IAddResourceForm {
    resource: IResource
}

export const UpdateResourceModal = ({ isOpen, onClose, onSave, resourceToUpdate, mode }: IUpdateResourceModalProps) => {

    const { register, getValues, setValue } = useForm<IAddResourceForm>()

    const saveResourceInData = () => {
        const updatedResource = getValues("resource")
        saveResource(updatedResource as IResource)
    }

    const saveClicked = () => {
        const updatedResource = getValues("resource")
        saveResourceInData()
        onSave(updatedResource)
    }

    useEffect(() => {
        if (resourceToUpdate) setValue("resource", resourceToUpdate);
    }, [resourceToUpdate])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{mode === 'ADD' ? 'Add Resource' : 'Update Resource'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={7}>
                        <VStack p="7px" spacing={7}>
                            <Box w="100%">
                                <Text>Name:</Text>
                                <Input {...register("resource.name")} />
                            </Box>
                            <HStack>
                                <Box>
                                    <Text>Price:</Text>
                                    <Input type="number" {...register("resource.unitPrice")} />
                                </Box>
                                <Box>
                                    <Text>SKU</Text>
                                    <Input {...register("resource.sku")} />
                                </Box>
                            </HStack>
                        </VStack>
                    </VStack>
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                    <Button onClick={onClose}>
                        Discard
                    </Button>
                    <Button colorScheme='blue' ml={3} onClick={saveClicked}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}