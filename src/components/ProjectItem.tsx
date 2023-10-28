import { Box, HStack, Image, Text } from "@chakra-ui/react"
import projectImageIcon from "../assets/project-icon.png"
import { useNavigate } from 'react-router-dom';

const ProjectItemStyles = {
    py: "5px",
    border: "1px solid",
    borderColor: "gray.900",
    borderRadius: "5px",
    w: "100%",
    cursor: "pointer",
    ':hover': {
        bgColor: "gray.500"
    }
}

export const ProjectItem = ({ name, id }: { name: string, id: number }) => {
    const navigate = useNavigate();

    const onProjectClick = (id: number) => {
        navigate('/project-details', { state: { id } })
    }

    return (
        <Box sx={ProjectItemStyles} onClick={() => onProjectClick(id)}>
            <HStack spacing="0px">
                <Box height="40px" width="40px">
                    <Image src={projectImageIcon} />
                </Box>
                <Text>{name}</Text>
            </HStack>
        </Box>
    )
}