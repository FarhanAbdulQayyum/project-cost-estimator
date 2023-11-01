import { Box, Button, Grid, GridItem, HStack, Heading, Text } from "@chakra-ui/react";
import { data, getNewId } from "../data/data";
import { useNavigate } from 'react-router-dom';
import { ProjectItem } from "../components/ProjectItem";

export const MyProjects = () => {
    const navigate = useNavigate();

    const createProject = () => {
        const newId = getNewId();
        data.projects.push({ id: newId, name: `New Project ${newId}`, total: 0, children: [] })
        navigate('/project-details', { state: { id: newId } })
    }
    return (
        <>
            <HStack justifyContent="space-between" mb="20px">
                <Heading fontSize="lg" fontWeight="bold">Projects</Heading>
                <Button size="sm" colorScheme="blue" onClick={createProject}> Add Project</Button>
            </HStack>
            {data.projects.length &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} width="100%">
                    {data.projects.map(project => (
                        <GridItem key={project.id} w="100%" h="10">
                            <ProjectItem name={project.name} id={project.id} />
                        </GridItem>
                    ))}
                </Grid>
            }
            {!data.projects.length &&
                <Box position="absolute" top="40%" right="30%" color="gray.600">
                    <Heading> No Projects Found</Heading>
                </Box>
            }
        </>
    )
}