import { Box, Button, Editable, EditableInput, EditablePreview, HStack, Input, Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { addResourceInState, addSubProject, data, getProjectById, removeItemInState, renameItem, updateResourceInState, updateTotalsInProject } from "../data/data";
import { useState } from "react";
import { SubProject } from "../components/SubProject";
import { mockData, } from "../data/mockData";
import { useNavigate } from 'react-router-dom';
import { ResourceModal } from "../components/ResourceModal";
import { RemoveItemModal } from "../components/RemoveItemModal";
import { EditableControls } from "../components/EditableControls";

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
    const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<IItemToRemove>({ parentId: -1, item: { id: -1, name: '' } });


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

    const onRemoveItem = (parentId: number, item: IItemToRemoveItem) => {
        setShowRemoveItemModal(true);
        setItemToRemove({ parentId, item: { id: item.id, name: item.name } })

    }

    const removeItem = () => {
        const _project = removeItemInState(itemToRemove.parentId, itemToRemove.item.id, project);
        updateTotals(_project);
        setShowRemoveItemModal(false)
    }

    const updateTotals = (project: IProject) => {
        const projectWithUpdatedTotals = updateTotalsInProject(project)
        setProject({ ...projectWithUpdatedTotals })
        updateProjectInState();
    }

    const saveResource = (resource: Partial<IProjectResource>) => {
        if (resourceModalMode === "ADD") addResource(resource)
        if (resourceModalMode === "EDIT") updateResource(resource)
    }

    const onAddSubProject = (id: number, type = "unknown") => {
        const _project = addSubProject(id, project, type);
        setProject({ ..._project });
        updateProjectInState();
    }

    const onRename = (id: number, updatedName: string) => {
        const _project = renameItem(id, project, updatedName);
        setProject({ ..._project });
        updateProjectInState();
    }

    const updateProjectInState = () => {
        const projectIndex = data.projects.findIndex(project => project.id === location.state.id)
        data.projects[projectIndex] = project;
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
                <Editable
                    textAlign='center'
                    defaultValue={project.name}
                    isPreviewFocusable={false}
                    onSubmit={(value) => onRename(project.id, value)}
                >
                    <HStack>
                        <EditablePreview />
                        <Input maxWidth="150px" size="xs" as={EditableInput} />
                        <EditableControls />
                    </HStack>
                </Editable>
                <HStack>
                    <Button size="xs" onClick={() => onAddSubProject(project.id)}>Add Sub-Project</Button>
                </HStack>
                <Text textAlign="right">{project.total}</Text>
            </HStack>

            <Box height="80vh" overflowY="scroll" overflowX="hidden">

                {
                    project.children.map(child => {
                        return <SubProject key={child.id} subProject={child} isDark={true} parentId={project.id}
                            onRemove={onRemoveItem} onUpdateResource={onUpdateResource}
                            onAddSubProject={onAddSubProject} onRename={onRename} />
                    })
                }
            </Box>
            {isResourceModalVisible &&
                <ResourceModal onClose={() => setIsResourceModalVisible(false)}
                    onSave={saveResource} mode={resourceModalMode} isOpen={isResourceModalVisible} resourceToUpdate={currentResource} />
            }
            <RemoveItemModal isOpen={showRemoveItemModal} onClose={() => setShowRemoveItemModal(false)}
                onConfirm={removeItem} itemName={itemToRemove.item.name} title={`Delete ${itemToRemove.item.name}`} />
        </>
    )
}