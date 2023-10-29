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

export const SubProject = ({ subProject, isRoot }: { subProject: ISubProject, isRoot: boolean }) => {
    const accordianButtonBgColor = subProject.type === 'sub_project' ? isRoot ? 'blue.400' : 'gray.300' : 'green.300';
    return (
        <Accordion allowMultiple border="none">
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
                    <AccordionPanel border="none" mb={15} pr={0} bgColor={accordianButtonBgColor}>
                        {
                            subProject.children.map((child: ISubProject) => {
                                return <SubProject key={child.id} subProject={child} isRoot={false} />
                            })
                        }
                    </AccordionPanel>
                }
                {subProject.type === 'resource_container' &&
                    <AccordionPanel border="none" mb={15} pr={0} bgColor="green.100">
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