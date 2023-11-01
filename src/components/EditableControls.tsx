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
            <IconButton size='xs' icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label='Save' />
            <IconButton size='xs' icon={<CloseIcon />} {...getCancelButtonProps()} aria-label='Close' />
        </ButtonGroup>
    ) : (
        <Flex justifyContent='center'>
            <IconButton size='xs' icon={<EditIcon />} {...getEditButtonProps()} aria-label='Edit' />
        </Flex>
    )
}