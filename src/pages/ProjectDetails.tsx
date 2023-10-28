import { Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';

export const ProjectDetails = () => {
    const location = useLocation();

    return (
        <>
            <Text>Project Details Working</Text>
            <Text>Project Id is {location.state.id}</Text>
        </>
    )
}