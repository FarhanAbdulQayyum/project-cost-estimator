import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { addResource, addSubProject, getProjectById } from "../data/data";
import { useState } from "react";
import { SubProject } from "../components/SubProject";
import { mockData, } from "../data/mockData";
import { useNavigate } from 'react-router-dom';

export const ProjectDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialProject: IProject = getProjectById(location.state.id) as IProject;
    // const initialProject: IProject = mockData.projects[0];
    const [project, setProject] = useState(initialProject);

    const onAddResource = (id: number) => {
        const _project = addResource(id, project);
        setProject({ ..._project });
    }

    const onAddSubProject = (id: number, type = "sub_project") => {
        const _project = addSubProject(id, project, type);
        setProject({ ..._project });
    }

    const onRename = (id: number, updatedName: string) => {
        console.log("___________________")
        console.log("Updated Item")
        console.log(id, updatedName)
        console.log("___________________")
    }

    const gotoMyProjects = () => {
        navigate('/my-projects')
    }

    if (!project) {
        return (
            <>
                <Text>No Project Selected</Text>
                <Button onClick={gotoMyProjects}>My Projects</Button>
            </>
        )
    }

    return (
        <>
            <HStack>
                <Heading fontSize="20px">{project?.name}</Heading>
                <HStack>
                    <Button size="xs" onClick={() => onAddSubProject(project.id, "resource_container")}>Add Resources</Button>
                    <Button size="xs" onClick={() => onAddSubProject(project.id)}>Add Sub-Project</Button>
                </HStack>
                <Text textAlign="right">{project.total}</Text>
            </HStack>

            <Box height="80vh" overflowY="scroll" overflowX="hidden">

                {
                    project.children.map(child => {
                        return <SubProject key={child.id} subProject={child} isDark={true}
                            onAddResource={onAddResource} onAddSubProject={onAddSubProject} onRename={onRename} />
                    })
                }
            </Box>

        </>
    )
}