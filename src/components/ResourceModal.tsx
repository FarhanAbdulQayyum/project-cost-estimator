import { Box, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { saveResource } from "../data/data";

interface IAddResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedValue: Partial<IProjectResource>) => void;
    resourceToUpdate: Partial<IProjectResource>
    mode: ResourceModalMode
}

interface IAddResourceForm {
    resource: Partial<IProjectResource>
}

export const ResourceModal = ({ isOpen, onClose, onSave, resourceToUpdate, mode }: IAddResourceModalProps) => {
    const [total, setTotal] = useState(0);

    const { register, getValues, watch, reset, setValue } = useForm<IAddResourceForm>()

    const watchFields = watch(["resource.unitPrice", "resource.quantity"])

    const saveResourceInData = () => {
        const updatedResource = getValues("resource")
        saveResource(updatedResource as IResource)
    }

    const saveClicked = () => {
        const updatedResource = getValues("resource")
        saveResourceInData()
        updatedResource.total = total
        if (mode === "EDIT") updatedResource.id = resourceToUpdate.id
        onSave(updatedResource)
    }

    useEffect(() => {
        setValue("resource", resourceToUpdate);
    }, [])

    useEffect(() => {
        const _quantity = getValues("resource.quantity");
        const _unitPrice = getValues("resource.unitPrice");
        setTotal(_quantity && _unitPrice ? _quantity * _unitPrice : 0);
    }, [watchFields])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{mode === 'ADD' ? 'Add Resource' : 'Update Resource'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Resource Information</Text>
                    <VStack spacing={7}>
                        <VStack p="7px" spacing={7} border="1px solid" borderRadius="5px">
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
                        <Box w="100%">
                            <Text>Quantity:</Text>
                            <Input type="number" {...register("resource.quantity")} />
                        </Box>
                        <Box w="100%">
                            <HStack spacing={1}>
                                <Text>Total: Rs</Text>
                                <Text fontWeight={600}>{total}</Text>
                            </HStack>
                        </Box>
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
        </Modal>
    )
}