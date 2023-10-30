import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"

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

    const saveClicked = () => {
        const updatedResource = getValues("resource")
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
                    <Text>Resource Name:</Text>
                    <Input {...register("resource.name")} />

                    <Text>Price:</Text>
                    <Input type="number" {...register("resource.unitPrice")} />
                    <Text>per</Text>
                    <Input {...register("resource.sku")} />
                    <Text>Quantity:</Text>
                    <Input type="number" {...register("resource.quantity")} />
                    <Text>Total: {total}</Text>
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