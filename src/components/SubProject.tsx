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

interface ISubProjectProps {
    subProject: ISubProject;
    isDark: boolean;
    onAddResource: (id: number) => void;
    onAddSubProject: (id: number) => void
}

export const SubProject = ({ subProject, isDark, onAddResource, onAddSubProject }: ISubProjectProps) => {
    // const accordianButtonBgColor = subProject.type === 'sub_project' ? isDark ? 'gray.400' : 'gray.300' : 'green.300';
    const accordianButtonBgColor = 'gray.300';
    const accordianPanelBgColor = isDark ? 'gray.200' : 'gray.100';
    return (
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
                                return <SubProject key={child.id} subProject={child} isDark={!isDark} onAddResource={onAddResource} onAddSubProject={onAddSubProject} />
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
    )
}