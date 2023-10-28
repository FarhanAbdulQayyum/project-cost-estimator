import { Box, Button, HStack, Heading } from "@chakra-ui/react";
import { data, getNewId } from "../data/data";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    const createProject = () => {
        const newId = getNewId();
        data.projects.push({ id: newId, name: `New Project ${newId}`, children: [] })
        navigate('/project-details', { state: { id: newId } })
    }

    return (
        <HStack justifyContent="space-between" backgroundColor="blue.900" width="100%" p="10px" >
            <Heading fontWeight={600} fontSize="25px" color="whiteAlpha.900">
                Project Cost Estimator
            </Heading>
            <HStack spacing="10px">
                <Button onClick={createProject} colorScheme="blue">Create Project</Button>
                <Button>Upload Project</Button>
            </HStack>
        </HStack>
    )
}