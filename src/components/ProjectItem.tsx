import { Box, HStack, Image, Text } from "@chakra-ui/react"
import projectImageIcon from "../assets/project-icon.png"

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

export const ProjectItem = ({ name }: { name: string }) => (
    <Box sx={ProjectItemStyles}>
        <HStack spacing="0px">
            <Box height="40px" width="40px">
                <Image src={projectImageIcon} />
            </Box>
            <Text>{name}</Text>
        </HStack>
    </Box>
)