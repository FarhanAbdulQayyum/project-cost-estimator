import { Box, Button, Grid, GridItem, HStack, Heading, Text } from "@chakra-ui/react";
import { data, getNewId } from "../data/data";
import { useNavigate } from 'react-router-dom';
import { ProjectItem } from "../components/ProjectItem";
import { useState } from "react";
import { RemoveItemModal } from "../components/RemoveItemModal";



export const MyProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState(data.projects)
    const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<IItemToRemoveItem>({ id: -1, name: '' });


    const createProject = () => {
        const newId = getNewId();
        data.projects.push({ id: newId, name: `New Project ${newId}`, total: 0, children: [] })
        navigate('/project-details', { state: { id: newId } })
    }

    const onRemoveProject = (project: IItemToRemoveItem) => {
        setItemToRemove(project)
        setShowRemoveItemModal(true);
    }

    const removeProject = () => {
        data.projects = data.projects.filter(project => project.id !== itemToRemove.id)
        setProjects(data.projects);
        setShowRemoveItemModal(false);
    }

    return (
        <>
            <HStack justifyContent="space-between" mb="20px">
                <Heading fontSize="lg" fontWeight="bold">Projects</Heading>
                <Button size="sm" colorScheme="blue" onClick={createProject}> Add Project</Button>
            </HStack>
            {data.projects.length > 0 &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} width="100%">
                    {projects.map(project => (
                        <GridItem key={project.id} w="100%" h="10">
                            <ProjectItem onRemove={onRemoveProject} name={project.name} id={project.id} />
                        </GridItem>
                    ))}
                </Grid>
            }
            {data.projects.length === 0 &&
                <Box position="absolute" top="40%" right="30%" color="gray.600">
                    <Heading> No Projects Found</Heading>
                </Box>
            }
            <RemoveItemModal isOpen={showRemoveItemModal} onClose={() => setShowRemoveItemModal(false)}
                onConfirm={removeProject} itemName={itemToRemove.name} />
        </>
    )
}