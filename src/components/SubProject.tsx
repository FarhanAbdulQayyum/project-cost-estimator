import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'
import { ProjectResource } from './ProjectResource'

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
                <AccordionPanel pb={4}>
                    {
                        subProject.children.map(child => {
                            if (child.type === 'sub_project') return <SubProject subProject={child} />
                            if (child.type === 'resource') return <ProjectResource projectResource={child} />
                        })
                    }
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}