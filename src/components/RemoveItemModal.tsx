import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"


interface IRemoveItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

export const RemoveItemModal = ({ isOpen, onClose, onConfirm, itemName }: IRemoveItemModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Delete ${itemName}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>{`Are you sure you want to remove ${itemName}?`}</Text>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button onClick={onClose}>
                        Discard
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={onConfirm}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}