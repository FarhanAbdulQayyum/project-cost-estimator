import { Box, Button, Editable, EditableInput, EditablePreview, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';
import { addResourceInState, addSubProject, data, getProjectById, getResourceSummary, removeItemInState, renameItem, updateResourceInState, updateTotalsInProject } from "../data/data";
import { useState } from "react";
import { SubProject } from "../components/SubProject";
import { useNavigate } from 'react-router-dom';
import { ResourceModal } from "../components/ResourceModal";
import { RemoveItemModal } from "../components/RemoveItemModal";
import { EditableControls } from "../components/EditableControls";
import { scrollStyle } from "../globalStyles";
import { ResourceSummaryModal } from "../components/ResourceSummaryModal";

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
    const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false);
    const [resourceSummary, setResourceSummary] = useState<any[]>([]);


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

    const showResourceSummaryModal = (project: IProject) => {
        const resourceSummary = getResourceSummary(project)
        setResourceSummary(resourceSummary)
        setIsSummaryModalVisible(true);
    }

    if (!project) {
        return (
            <>
                <VStack alignItems="center" position="absolute" top="40%" right="30%" color="gray.600">
                    <Heading fontWeight="semibold" fontSize="27px">No Project Selected</Heading>
                    <Button size="sm" colorScheme="blue" onClick={gotoMyProjects}>My Projects</Button>
                </VStack>
            </>
        )
    }

    return (
        <>
            <HStack justifyContent="space-between" w="100%">
                <HStack>
                    <Editable
                        textAlign='center'
                        defaultValue={project.name}
                        isPreviewFocusable={false}
                        onSubmit={(value) => onRename(project.id, value)}
                    >
                        <HStack>
                            <EditablePreview fontWeight="bold" fontSize="lg" />
                            <Input maxWidth="150px" size="xs" as={EditableInput} />
                            <EditableControls />
                        </HStack>
                    </Editable>
                    <HStack>
                        <Button size="xs" onClick={() => onAddSubProject(project.id)}>Add Sub-Project</Button>
                    </HStack>
                </HStack>
                <HStack mr="20px" fontWeight="bold" as="span" justifyContent="end" textAlign='right'>
                    <Button size="xs" onClick={() => showResourceSummaryModal(project)}>View Resource Summary</Button>
                    <Text>{`Total: ${project.total}`}</Text>
                </HStack>
            </HStack>

            <Box height="80vh" overflowY="scroll" sx={scrollStyle} overflowX="hidden">

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
                onConfirm={removeItem} itemName={itemToRemove.item.name} />
            <ResourceSummaryModal isOpen={isSummaryModalVisible} onClose={() => setIsSummaryModalVisible(false)} resourceSummary={resourceSummary} />
        </>
    )
}