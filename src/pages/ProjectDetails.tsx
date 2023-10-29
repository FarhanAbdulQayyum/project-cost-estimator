import { Box, HStack, Heading, Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { getProjectById } from "../data/data";
import { useState } from "react";
import { SubProject } from "../components/SubProject";
import { ProjectResource } from "../components/ProjectResource";
import { mockData, } from "../data/mockData";

export const ProjectDetails = () => {
    const location = useLocation();
    // const initialProject: IProject = getProjectById(location.state.id) as IProject;
    const initialProject: IProject = mockData.projects[0];
    const [project, setProject] = useState(initialProject);

    return (
        <>
            <HStack>
                <Heading fontSize="20px">{project?.name}</Heading>
                <Text>{project.total}</Text>
            </HStack>

            <Box height="80vh" overflowY="scroll" overflowX="hidden">

                {
                    project.children.map(child => {
                        return <SubProject key={child.id} subProject={child} />
                    })
                }
            </Box>

        </>
    )
}