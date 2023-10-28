import { Box, HStack, Image, Text } from "@chakra-ui/react"
import projectImageIcon from "../assets/project-icon.png"

export const ProjectItem = ({ name }: { name: string }) => (
    <Box py="5px" pr="15px" border="1px solid" borderColor="gray.900" borderRadius="5px">
        <HStack spacing="0px">
            <Box height="40px" width="40px">
                <Image src={projectImageIcon} />
            </Box>
            <Text>{name}</Text>
        </HStack>
    </Box>
)