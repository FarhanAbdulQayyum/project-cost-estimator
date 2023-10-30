import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    HStack,
    Button,
} from '@chakra-ui/react'
import { ProjectResource } from './ProjectResource'
import { ProjectResourceHeader } from './ProjectResourceHeader'
import { RenameModal } from './RenameModal';
import { useState } from 'react';

interface ISubProjectProps {
    subProject: ISubProject;
    isDark: boolean;
    onAddResource: (id: number) => void;
    onAddSubProject: (id: number) => void;
    onRename: (id: number, updatedName: string) => void;
}

export const SubProject = ({ subProject, isDark, onAddResource, onAddSubProject, onRename }: ISubProjectProps) => {
    // const accordianButtonBgColor = subProject.type === 'sub_project' ? isDark ? 'gray.400' : 'gray.300' : 'green.300';
    const accordianButtonBgColor = 'gray.300';
    const accordianPanelBgColor = isDark ? 'gray.200' : 'gray.100';
    const [isRenameModalVisible, setIsRenameModalVisible] = useState(false)
    const [renameItemId, setRenameItemId] = useState(0)
    const [renameItemName, setRenameItemName] = useState('')

    const showRenameModal = (id: number, name: string) => {
        setRenameItemId(id);
        setRenameItemName(name);
        setIsRenameModalVisible(true);
    }

    const itemRenamed = (updatedName: string) => {
        onRename(renameItemId, updatedName);
        setIsRenameModalVisible(false)
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
                                    {subProject.name}
                                </Box>
                                <HStack>
                                    <Button size="xs" onClick={() => showRenameModal(subProject.id, subProject.name)}>Rename</Button>
                                    <Button size="xs" onClick={() => onAddResource(subProject.id)}>Add Resources</Button>
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
                                        onAddResource={onAddResource} onAddSubProject={onAddSubProject} onRename={onRename} />
                                })
                            }
                        </AccordionPanel>
                    }
                    {subProject.type === 'resource_container' &&
                        <AccordionPanel border="none" mb={10} pr={0} bgColor={accordianPanelBgColor}>
                            <ProjectResourceHeader />
                            {
                                subProject.children.map((child: IProjectResource) => {
                                    return <ProjectResource key={child.id} projectResource={child} />
                                })
                            }
                        </AccordionPanel>
                    }

                </AccordionItem>
            </Accordion >
            <RenameModal isOpen={isRenameModalVisible} onClose={() => setIsRenameModalVisible(false)} onSave={itemRenamed} title='Rename Sub-Project' oldName={renameItemName} />
        </>
    )
}