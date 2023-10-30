import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"

interface IAddResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedValue: Partial<IProjectResource>) => void;
    resourceToUpdate: Partial<IProjectResource>
}

interface IAddResourceForm {
    resource: Partial<IProjectResource>
}

export const AddResourceModal = ({ isOpen, onClose, onSave, resourceToUpdate }: IAddResourceModalProps) => {
    const [total, setTotal] = useState(0);

    const { register, getValues, watch, reset, setValue } = useForm<IAddResourceForm>()

    const watchFields = watch(["resource.unitPrice", "resource.quantity"])

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
                <ModalHeader>Add Resource</ModalHeader>
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
                    <Button colorScheme='blue' ml={3} onClick={() => onSave(getValues("resource"))}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}