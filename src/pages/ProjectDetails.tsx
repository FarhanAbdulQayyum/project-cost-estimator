import { HStack, Heading, Text } from "@chakra-ui/react";
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
                <Heading>{project?.name}</Heading>
                <Text>{project.total}</Text>
            </HStack>

            {
                project.children.map(child => {
                    if (child.type === 'sub_project') return <SubProject subProject={child} />
                    if (child.type === 'resource') return <ProjectResource projectResource={child} />
                })
            }

        </>
    )
}