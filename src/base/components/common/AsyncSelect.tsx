import { AsyncPaginate } from 'react-select-async-paginate';
import { StylesConfig } from "react-select";
import { OptionType } from './ReactSelect';
import { useTheme } from '../../context/ThemeProvider';


const darkModeStyles: StylesConfig<OptionType, boolean> = {
    control: (styles) => ({
        ...styles,
        backgroundColor: "#333a40",
        borderColor: "none",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        color: "white",
        border: "none",
        cursor: "pointer",
        ":hover": {
            border: "none",
            boxShadow: "none",
        },
        ":focus,": {
            border: "none",
            boxShadow: "none",
        },
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: "#333a40",
        color: "white",
    }),

    option: (styles, { isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isFocused ? "#23272B" : isSelected ? "#23272B" : "#333a40",
        color: "white",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: isFocused ? "#23272B" : isSelected ? "#23272B" : "#333a40",
        },
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "white",
    }),

};

const LightModeStyles: StylesConfig<OptionType, boolean> = {
    control: (styles) => ({
        ...styles,
        backgroundColor: "#f4f5fa",
        borderColor: "none",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        color: "#333a40",
        border: "none",
        ":hover": {
            border: "none",
            boxShadow: "none",
        },
        ":focus,": {
            border: "none",
            boxShadow: "none",
        },
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: "#f4f5fa",
        color: "white",
        border: "none",
    }),

    option: (styles, { isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isFocused ? "#e9ecef" : isSelected ? "#e9ecef" : "#f4f5fa",
        color: "#333a40",
        "&:hover": {
            backgroundColor: isFocused ? "#e9ecef" : isSelected ? "#e9ecef" : "#f4f5fa",
        },
        cursor: "pointer",
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "#333a40",
    }),
};


type Props = {
    value: any;
    onChange: (value: any) => void;
    loadOptions: (search: any, loadedOptions: any, { page }: any) => Promise<{
        options: any;
        hasMore: boolean;
        additional: {
            page: any;
        };
    }>
};

const AsyncSelect = ({ value, onChange, loadOptions }: Props) => {
    const { theme } = useTheme();


    return (
        <AsyncPaginate
            value={value}
            loadOptions={loadOptions}
            onChange={onChange}
            additional={{
                page: 1,
            }}
            styles={theme === "dark" ? darkModeStyles : LightModeStyles}
        />
    )
}

export default AsyncSelect