import { Button, HStack, Heading } from "@chakra-ui/react";
import { data } from "../data/data";

export const Header = () => {

    const exportClicked = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadElement = document.getElementById('downloadElement');
        if (downloadElement) {
            downloadElement.setAttribute("href", dataStr);
            downloadElement.setAttribute("download", "PCE-Data.json");
            downloadElement.click();
        }
    }

    return (
        <HStack justifyContent="space-between" backgroundColor="blue.900" width="100%" p="10px" >
            <Heading fontWeight={600} fontSize="25px" color="whiteAlpha.900">
                Project Cost Estimator
            </Heading>
            <HStack spacing="10px">
                <Button size="sm" onClick={exportClicked}>Export</Button>
                <Button size="sm">Upload</Button>
            </HStack>
        </HStack>
    )
}