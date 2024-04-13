import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";

interface AutoCompleteTextInputProps {
  suggestions: { id: number; text: string }[];
  inputValue?: string;
  setInputValue: any;
  placeHolder: string;
  onSelect?: (e: any) => void;
  onChange?: (e: any) => void;
  returnKey?: string;
}

//return key eklendiğinde default gösterilen string yerine o obje içerisindeki bir keyi döndürmesini sağlar.

export const AutoCompleteTextInput: React.FC<AutoCompleteTextInputProps> = ({ suggestions, inputValue, setInputValue, placeHolder, onSelect, onChange, returnKey }) => {
  const [value, setValue] = useState(inputValue ?? "");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any>([]);

  function getSuggestions(value: string) {
    return suggestions.filter((company) => company.text.toLowerCase().includes(value.toLowerCase()));
  }

  return (
    <div>
      <AutoSuggest
        theme={{
          input: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
          suggestionHighlighted: "text-blue-500 bg-blue-50",
          suggestion: "p-2.5 cursor-pointer rounded-lg",
          suggestionsList: "z-10 absolute bg-white max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg",
        }}
        suggestions={filteredSuggestions}
        onSuggestionsClearRequested={() => setFilteredSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          setValue(value);
          setFilteredSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(_, { suggestionValue }) => {
          setInputValue(suggestionValue);
        }}
        getSuggestionValue={(suggestion) => {
          onSelect && onSelect(suggestion);
          return suggestion[returnKey ?? "text"];
        }}
        renderSuggestion={(suggestion) => <span>{suggestion.text}</span>}
        inputProps={{
          placeholder: placeHolder,
          value: value,
          onChange: (_, { newValue }) => {
            setValue(newValue);
            setInputValue(newValue);
            onChange && onChange(newValue);
          },
        }}
        highlightFirstSuggestion={true}
      />
    </div>
  );
};
