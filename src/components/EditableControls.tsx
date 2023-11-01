import { ButtonGroup, Flex, IconButton, useEditableControls } from "@chakra-ui/react"
import { CloseIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";

export const EditableControls = () => {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm'>
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label='Save' />
            <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} aria-label='Close' />
        </ButtonGroup>
    ) : (
        <Flex justifyContent='center'>
            <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} aria-label='Edit' />
        </Flex>
    )
}