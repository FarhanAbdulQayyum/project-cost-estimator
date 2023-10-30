import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { addResourceInState, addSubProject, getProjectById, renameItem, updateResourceInState, updateTotalsInProject } from "../data/data";
import { useState } from "react";
import { SubProject } from "../components/SubProject";
import { mockData, } from "../data/mockData";
import { useNavigate } from 'react-router-dom';
import { ResourceModal } from "../components/ResourceModal";

export const ProjectDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialProject: IProject = getProjectById(location.state.id) as IProject;
    // const initialProject: IProject = mockData.projects[0];
    const [project, setProject] = useState(initialProject);
    const [currentResource, setCurrentResource] = useState({})
    const [currentResourceContainerId, setCurrentResourceContainerId] = useState(0);
    const [isResourceModalVisible, setIsResourceModalVisible] = useState(false);
    const [resourceModalMode, setResourceModalMode] = useState<ResourceModalMode>('ADD');

    const onUpdateResource = (id: number, currentResource: Partial<IProjectResource>, operation: ResourceModalMode) => {
        setCurrentResource(currentResource);
        setCurrentResourceContainerId(id);
        setIsResourceModalVisible(true);
        setResourceModalMode(operation);
    }

    const addResource = (resource: Partial<IProjectResource>) => {
        const _project = addResourceInState(currentResourceContainerId, project, resource);
        updateTotals(_project)
        setIsResourceModalVisible(false);
    }

    const updateResource = (resource: Partial<IProjectResource>) => {
        const _project = updateResourceInState(currentResourceContainerId, project, resource);
        updateTotals(_project)
        setIsResourceModalVisible(false);
    }

    const updateTotals = (project: IProject) => {
        const projectWithUpdatedTotals = updateTotalsInProject(project)
        setProject({ ...projectWithUpdatedTotals })
    }

    const saveResource = (resource: Partial<IProjectResource>) => {
        if (resourceModalMode === "ADD") addResource(resource)
        if (resourceModalMode === "EDIT") updateResource(resource)
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
                            onUpdateResource={onUpdateResource} onAddSubProject={onAddSubProject} onRename={onRename} />
                    })
                }
            </Box>
            {isResourceModalVisible &&
                <ResourceModal onClose={() => setIsResourceModalVisible(false)}
                    onSave={saveResource} mode={resourceModalMode} isOpen={isResourceModalVisible} resourceToUpdate={currentResource} />
            }
        </>
    )
}