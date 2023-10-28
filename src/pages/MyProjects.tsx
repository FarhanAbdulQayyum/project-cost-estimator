import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { data, getNewId, isData } from "../data/data";
import { useNavigate } from 'react-router-dom';

export const MyProjects = () => {
    const navigate = useNavigate();

    const createProject = () => {
        const newId = getNewId();
        data.projects.push({ id: newId, name: `New Project ${newId}`, children: [] })
        navigate('/project-details', { state: { id: newId } })
    }
    if (isData) {

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