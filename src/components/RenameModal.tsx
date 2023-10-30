import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react";

interface IRenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSave: (updatedValue: string) => void;
    oldName: string
}

export const RenameModal = ({ isOpen, onClose, title, onSave, oldName }: IRenameModalProps) => {
    const [updatedName, setUpdatedName] = useState(oldName);

    useEffect(() => setUpdatedName(oldName), [oldName])


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                    <Button onClick={onClose}>
                        Discard
                    </Button>
                    <Button colorScheme='blue' ml={3} onClick={() => onSave(updatedName)}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}