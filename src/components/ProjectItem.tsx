import { Box, HStack, Image, Text } from "@chakra-ui/react"

export const ProjectItem = ({ name }: { name: string }) => (
    <Box>
        <HStack>
            <Box height="15px" width="15px">
                <Image src='./assets/project-icon.png' />
            </Box>
            <Text>{name}</Text>
        </HStack>
    </Box>
)