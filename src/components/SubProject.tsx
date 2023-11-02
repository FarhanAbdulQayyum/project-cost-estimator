import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    HStack,
    Button,
    IconButton,
    Editable,
    Input,
    EditablePreview,
    EditableInput,
} from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons";
import { ProjectResource } from './ProjectResource'
import { ProjectResourceHeader } from './ProjectResourceHeader'
import { accordianDefaultIndexes } from '../constants';
import { EditableControls } from './EditableControls';

interface ISubProjectProps {
    subProject: ISubProject;
    isDark: boolean;
    parentId: number;
    onUpdateResource: (id: number, currentResource: Partial<IProjectResource>, operation: ResourceModalMode) => void;
    onAddSubProject: (id: number) => void;
    onRename: (id: number, updatedName: string) => void;
    onRemove: (parentId: number, item: IItemToRemoveItem) => void;
}

export const SubProject = ({
    subProject, isDark, onUpdateResource, onAddSubProject,
    onRename, onRemove, parentId }: ISubProjectProps) => {
    const accordianButtonBgColor = 'gray.300';
    const accordianPanelBgColor = isDark ? 'gray.200' : 'gray.100';

    return (
        <>
            <Accordion allowMultiple defaultIndex={accordianDefaultIndexes} border="none" mt="3px" mr="10px">
                <AccordionItem border="none">
                    <h2>
                        <Box borderRadius="5px 5px 0px 0px" bgColor={accordianButtonBgColor}>
                            <HStack>
                                <Box width="30px">
                                    <AccordionButton><AccordionIcon /></AccordionButton>
                                </Box>
                                <Box as="span" textAlign='left'>
                                    <Editable
                                        textAlign='center'
                                        defaultValue={subProject.name}
                                        isPreviewFocusable={false}
                                        onSubmit={(value) => onRename(subProject.id, value)}
                                    >
                                        <HStack>
                                            <EditablePreview fontWeight="semibold" />
                                            <Input maxWidth="150px" size="xs" as={EditableInput} />
                                            <EditableControls />
                                        </HStack>
                                    </Editable>
                                </Box>
                                <HStack justifyContent="start">
                                    <IconButton size='xs' icon={<DeleteIcon />}
                                        onClick={() => onRemove(parentId, { id: subProject.id, name: subProject.name })}
                                        aria-label='Edit' />
                                    {subProject.type !== 'sub_project' &&
                                        <Button size="xs"
                                            onClick={() => onUpdateResource(
                                                subProject.id, { name: '', quantity: 0, sku: '', unitPrice: 0 }, "ADD"
                                            )}
                                        >+ Resources</Button>
                                    }
                                    {subProject.type !== 'resource_container' &&
                                        <Button size="xs" onClick={() => onAddSubProject(subProject.id)}>
                                            + Sub-Project
                                        </Button>
                                    }
                                </HStack>
                                <Box mr="10px" as="span" flex='1' textAlign='right'>
                                    {`Total: ${subProject.total}`}
                                </Box>
                            </HStack>
                        </Box>
                    </h2>
                    {subProject.type === 'sub_project' &&
                        <AccordionPanel borderRadius="0px 0px 5px 5px" mb={10} pr={0} bgColor={accordianPanelBgColor}>
                            {
                                subProject.children.map((child: ISubProject) => {
                                    return <SubProject parentId={subProject.id}
                                        key={child.id} subProject={child} isDark={!isDark} onRemove={onRemove}
                                        onUpdateResource={onUpdateResource}
                                        onAddSubProject={onAddSubProject} onRename={onRename} />
                                })
                            }
                        </AccordionPanel>
                    }
                    {subProject.type === 'resource_container' &&
                        <AccordionPanel borderRadius="0px 0px 5px 5px" border="none" mb={10} pr={0} bgColor={accordianPanelBgColor}>
                            <ProjectResourceHeader />
                            {
                                subProject.children.map((child: IProjectResource) => {
                                    return <ProjectResource onRemove={onRemove} subProjectId={subProject.id}
                                        onUpdateResource={onUpdateResource} key={child.id} projectResource={child} />
                                })
                            }
                        </AccordionPanel>
                    }

                </AccordionItem>
            </Accordion >
        </>
    )
}