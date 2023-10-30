import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { addResourceInState, addSubProject, getProjectById, renameItem } from "../data/data";
import { useState } from "react";
import { SubProject } from "../components/SubProject";
import { mockData, } from "../data/mockData";
import { useNavigate } from 'react-router-dom';
import { AddResourceModal } from "../components/AddResourceModal";

export const ProjectDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialProject: IProject = getProjectById(location.state.id) as IProject;
    // const initialProject: IProject = mockData.projects[0];
    const [project, setProject] = useState(initialProject);
    const [currentResource, setCurrentResource] = useState({})
    const [currentResourceContainerId, setCurrentResourceContainerId] = useState(0);
    const [isAddResourceModalVisible, setIsAddResourceModalVisible] = useState(false);

    const onAddResource = (id: number, currentResource: Partial<IProjectResource>) => {
        setCurrentResource(currentResource);
        setCurrentResourceContainerId(id);
        setIsAddResourceModalVisible(true);
    }

    const addResource = (resource: Partial<IProjectResource>) => {
        const _project = addResourceInState(currentResourceContainerId, project, resource);
        setProject({ ..._project });
        setIsAddResourceModalVisible(false);
    }

    const onAddSubProject = (id: number, type = "sub_project") => {
        const _project = addSubProject(id, project, type);
        setProject({ ..._project });
    }

    const onRename = (id: number, updatedName: string) => {
        const _project = renameItem(id, project, updatedName);
        setProject({ ..._project });
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
            {isAddResourceModalVisible &&
                <AddResourceModal onClose={() => setIsAddResourceModalVisible(false)}
                    onSave={addResource} isOpen={isAddResourceModalVisible} resourceToUpdate={currentResource} />
            }
        </>
    )
}