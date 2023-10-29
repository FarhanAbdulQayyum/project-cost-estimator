import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'
import { ProjectResource } from './ProjectResource'
import { ProjectResourceHeader } from './ProjectResourceHeader'

export const SubProject = ({ subProject, isDark }: { subProject: ISubProject, isDark: boolean }) => {
    // const accordianButtonBgColor = subProject.type === 'sub_project' ? isDark ? 'gray.400' : 'gray.300' : 'green.300';
    const accordianButtonBgColor = 'gray.300';
    const accordianPanelBgColor = isDark ? 'gray.200' : 'gray.100';
    return (
        <Accordion allowMultiple border="none" mt="3px">
            <AccordionItem border="none">
                <h2>
                    <AccordionButton _hover={{ background: accordianButtonBgColor }} bgColor={accordianButtonBgColor}>
                        <Box as="span" flex='1' textAlign='left'>
                            {subProject.name}
                        </Box>
                        <Box as="span" flex='1' textAlign='right'>
                            {`Total: ${subProject.total}`}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                {subProject.type === 'sub_project' &&
                    <AccordionPanel mb={10} pr={0} bgColor={accordianPanelBgColor}>
                        {
                            subProject.children.map((child: ISubProject) => {
                                return <SubProject key={child.id} subProject={child} isDark={!isDark} />
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
        </Accordion>
    )
}