import { Box, Input, InputGroup, InputRightElement, List, ListItem } from "@chakra-ui/react"
import { useState } from "react"
import { scrollStyle } from "../globalStyles";
import { CloseIcon } from "@chakra-ui/icons";

interface IAutoCompleteProps {
    list: any[];
    searchProperty: string;
    onChange: (inputStr: string) => void;
    onSelect: (selectedListItem: any) => void
}

export const AutoComplete = ({ list, searchProperty, onChange, onSelect }: IAutoCompleteProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredList, setFilteredList] = useState([...list]);
    const [fieldText, setFieldText] = useState('')

    const onFocus = () => {
        setShowSuggestions(true);
        inputChanged('')
    }

    const itemSelected = (item: any) => {
        setFieldText(item[searchProperty]);
        setShowSuggestions(false)
        onSelect(item)
    }

    const inputChanged = (searchedString: string) => {
        const _filteredList = list.filter(item => item[searchProperty].toLowerCase().includes((searchedString).toLowerCase()))
        setFilteredList([..._filteredList])
        onChange(searchedString)
        setFieldText(searchedString)
    }

    return (
        <Box>
            <InputGroup>
                <Input onChange={(e: any) => inputChanged(e.target.value)} value={fieldText} onFocus={onFocus} />
                <InputRightElement>
                    {showSuggestions && filteredList.length > 0 &&
                        <CloseIcon boxSize={2.5} cursor="pointer" onClick={() => setShowSuggestions(false)} />
                    }
                </InputRightElement>
            </InputGroup>
            {showSuggestions && filteredList.length > 0 &&
                <List sx={scrollStyle} w="100%" bgColor="white" position="absolute" zIndex="99" width="85%" maxHeight="170px" overflow="scroll" overflowX="hidden" border="1px solid" borderRadius="5px">
                    {
                        filteredList.map((item, index) => (
                            <ListItem key={`${item.name}-${index}`} cursor="pointer" sx={{ ':hover': { bgColor: "gray.100" } }} onClick={() => itemSelected(item)}>{item[searchProperty]}</ListItem>
                        ))
                    }
                </List>
            }
        </Box>
    )

}