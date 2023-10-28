import { Box, Button, Grid, HStack, Heading, Text } from "@chakra-ui/react";
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
            <Grid marginTop="10px" templateColumns='repeat(5, 1fr)' gap={6}>
                {data.projects.map(project => (
                    <Box>
                        <ProjectItem name={project.name} />
                    </Box>
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