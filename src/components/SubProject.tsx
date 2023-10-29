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

export const SubProject = ({ subProject }: { subProject: ISubProject }) => {
    return (
        <Accordion>
            <AccordionItem>
                <h2>
                    <AccordionButton>
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
                    <AccordionPanel pb={4}>
                        {
                            subProject.children.map((child: ISubProject) => {
                                return <SubProject subProject={child} />
                            })
                        }
                    </AccordionPanel>
                }
                {subProject.type === 'resource_container' &&
                    <AccordionPanel pb={4}>
                        <ProjectResourceHeader />
                        {
                            subProject.children.map((child: IProjectResource) => {
                                return <ProjectResource projectResource={child} />
                            })
                        }
                    </AccordionPanel>
                }

            </AccordionItem>
        </Accordion>
    )
}