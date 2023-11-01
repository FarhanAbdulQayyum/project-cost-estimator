import { Box, HStack, IconButton, Image, Text } from "@chakra-ui/react"
import projectImageIcon from "../assets/project-icon.png"
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from "@chakra-ui/icons";

const ProjectItemStyles = {
    py: "5px",
    border: "1px solid",
    borderColor: "gray.900",
    borderRadius: "5px",
    w: "100%",
    cursor: "pointer",
    ':hover': {
        bgColor: "gray.300"
    }
}

export const ProjectItem = ({ name, id, onRemove }: { name: string, id: number, onRemove: (project: { id: number, name: string }) => void }) => {
    const navigate = useNavigate();

    const onProjectClick = (id: number) => {
        navigate('/project-details', { state: { id } })
    }

    const onDelete = (e: any) => {
        e.stopPropagation();
        onRemove({ id, name });
    }

    return (
        <HStack justifyContent="space-between" sx={ProjectItemStyles} onClick={() => onProjectClick(id)}>
            <HStack spacing="0px">
                <Box height="40px" width="40px">
                    <Image src={projectImageIcon} />
                </Box>
                <Text>{name}</Text>
            </HStack>
            <IconButton size="xs" mr="5px" onClick={onDelete} icon={<DeleteIcon />} aria-label='Delete' />
        </HStack>
    )
}