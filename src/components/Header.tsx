import { Button, HStack, Heading } from "@chakra-ui/react";
import { data } from "../data/data";
import { useRef } from "react";

export const Header = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const exportClicked = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadElement = document.getElementById('downloadElement');
        if (downloadElement) {
            downloadElement.setAttribute("href", dataStr);
            downloadElement.setAttribute("download", "PCE-Data.json");
            downloadElement.click();
        }
    }

    const handleFileChange = (e: any) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const fileData = JSON.parse(e?.target?.result as string)
            data.projects = fileData.projects;
            data.resources = fileData.resources;
        };
    }

    const onUploadClick = () => {
        inputRef?.current?.click();
    };

    return (
        <HStack justifyContent="space-between" backgroundColor="blue.900" width="100%" p="10px" >
            <Heading fontWeight={600} fontSize="25px" color="whiteAlpha.900">
                Project Cost Estimator
            </Heading>
            <HStack spacing="10px">
                <Button colorScheme="blue" size="sm" onClick={exportClicked}>Export</Button>
                <Button size="sm" onClick={onUploadClick}>Upload</Button>
            </HStack>
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
        </HStack>
    )
}