import { Box, Input, InputGroup, InputRightElement, List, ListItem } from "@chakra-ui/react"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { scrollStyle } from "../globalStyles";
import { CloseIcon } from "@chakra-ui/icons";

interface IAutoCompleteProps<T> {
    list: T[];
    searchProperty: keyof T;
    onChange: (inputStr: string) => void;
    onSelect: (selectedListItem: T) => void
}

export const AutoComplete = <T,>({ list, searchProperty, onChange, onSelect }: IAutoCompleteProps<T>) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredList, setFilteredList] = useState([...list]);
    const [fieldText, setFieldText] = useState('')

    const onFocus = () => {
        setShowSuggestions(true);
        inputChanged('')
    }

    const itemSelected = (item: T) => {
        setFieldText(item[searchProperty] as string);
        setShowSuggestions(false)
        onSelect(item)
    }

    const inputChanged = (searchedString: string) => {
        const _filteredList = list.filter(item => (item[searchProperty] as string).toLowerCase().includes((searchedString).toLowerCase()))
        setFilteredList([..._filteredList])
        onChange(searchedString)
        setFieldText(searchedString)
    }

    return (
        <Box>
            <InputGroup>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChanged(e.target.value)} value={fieldText} onFocus={onFocus} />
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
                            <ListItem key={`${item[searchProperty]}-${index}`} cursor="pointer" sx={{ ':hover': { bgColor: "gray.100" } }} onClick={() => itemSelected(item)}>{(item[searchProperty] as string)}</ListItem>
                        ))
                    }
                </List>
            }
        </Box>
    )

}