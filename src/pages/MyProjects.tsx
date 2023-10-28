import { Box, Button, Grid, GridItem, HStack, Heading, Text } from "@chakra-ui/react";
import { data, getNewId } from "../data/data";
import { useNavigate } from 'react-router-dom';
import { ProjectItem } from "../components/ProjectItem";

export const MyProjects = () => {
    const navigate = useNavigate();

    const createProject = () => {
        const newId = getNewId();
        data.projects.push({ id: newId, name: `New Project ${newId}`, children: [] })
        navigate('/project-details', { state: { id: newId } })
    }
    if (data.projects.length) {
        return (
            <Grid templateColumns='repeat(5, 1fr)' gap={6} width="100%">
                {data.projects.map(project => (
                    <GridItem key={project.id} w="100%" h="10">
                        <ProjectItem name={project.name} id={project.id} />
                    </GridItem>
                ))}
            </Grid>
        )
    } else {
        return (
            <Box position="absolute" top="40%" right="30%" color="gray.600">
                <Heading> No Projects Found</Heading>
                <HStack spacing="40px" marginTop="20px">
                    <Button onClick={createProject} colorScheme="blue">Create Project</Button>
                    <Button>Upload Project</Button>
                </HStack>
            </Box>
        )
    }
}