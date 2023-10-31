import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    HStack,
    Button,
    useEditableControls,
    ButtonGroup,
    IconButton,
    Flex,
    Editable,
    Input,
    EditablePreview,
    EditableInput,
} from '@chakra-ui/react'
import { CloseIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import { ProjectResource } from './ProjectResource'
import { ProjectResourceHeader } from './ProjectResourceHeader'
import { useState } from 'react';

interface ISubProjectProps {
    subProject: ISubProject;
    isDark: boolean;
    onUpdateResource: (id: number, currentResource: Partial<IProjectResource>, operation: ResourceModalMode) => void;
    onAddSubProject: (id: number) => void;
    onRename: (id: number, updatedName: string) => void;
}

export const SubProject = ({ subProject, isDark, onUpdateResource, onAddSubProject, onRename }: ISubProjectProps) => {
    const accordianButtonBgColor = 'gray.300';
    const accordianPanelBgColor = isDark ? 'gray.200' : 'gray.100';
    const [isRenameModalVisible, setIsRenameModalVisible] = useState(false)
    const [renameItemId, setRenameItemId] = useState(0)
    const [renameItemName, setRenameItemName] = useState('')

    const EditableControls = () => {
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

    return (
        <>
            <Accordion allowMultiple border="none" mt="3px">
                <AccordionItem border="none">
                    <h2>
                        <Box bgColor={accordianButtonBgColor}>
                            <HStack>
                                <Box width="30px">
                                    <AccordionButton><AccordionIcon /></AccordionButton>
                                </Box>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Editable
                                        textAlign='center'
                                        defaultValue={subProject.name}
                                        isPreviewFocusable={false}
                                        onSubmit={(value) => onRename(subProject.id, value)}
                                    >
                                        <HStack>
                                            <EditablePreview />
                                            <Input maxWidth="150px" size="xs" onChange={(e) => setRenameItemName(e.target.value)} as={EditableInput} />
                                            <EditableControls />
                                        </HStack>
                                    </Editable>
                                </Box>
                                <HStack>
                                    <Button size="xs" onClick={() => onUpdateResource(subProject.id, { name: '', quantity: 0, sku: '', unitPrice: 0 }, "ADD")}>Add Resources</Button>
                                    {subProject.type === 'sub_project' &&
                                        < Button size="xs" onClick={() => onAddSubProject(subProject.id)}>Add Sub-Project</Button>
                                    }
                                </HStack>
                                <Box as="span" flex='1' textAlign='right'>
                                    {`Total: ${subProject.total}`}
                                </Box>
                            </HStack>
                        </Box>
                    </h2>
                    {subProject.type === 'sub_project' &&
                        <AccordionPanel mb={10} pr={0} bgColor={accordianPanelBgColor}>
                            {
                                subProject.children.map((child: ISubProject) => {
                                    return <SubProject key={child.id} subProject={child} isDark={!isDark}
                                        onUpdateResource={onUpdateResource} onAddSubProject={onAddSubProject} onRename={onRename} />
                                })
                            }
                        </AccordionPanel>
                    }
                    {subProject.type === 'resource_container' &&
                        <AccordionPanel border="none" mb={10} pr={0} bgColor={accordianPanelBgColor}>
                            <ProjectResourceHeader />
                            {
                                subProject.children.map((child: IProjectResource) => {
                                    return <ProjectResource subProjectId={subProject.id} onUpdateResource={onUpdateResource} key={child.id} projectResource={child} />
                                })
                            }
                        </AccordionPanel>
                    }

                </AccordionItem>
            </Accordion >
        </>
    )
}