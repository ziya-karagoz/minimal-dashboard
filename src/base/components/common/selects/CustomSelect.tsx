import Select, { GroupBase } from "react-select";
import { CustomSelecttProps } from "./CustomSelect.types";



const CustomSelect = ({
    inactive = false,
    placeholder = "",
    isDisabled = false,
    isSearchable = false,
    options = [],
    isMulti = false,
    onChange,
    value,
}: CustomSelecttProps) => {
    return (
        <div className="w-75">
            <Select
                key={options.length}
                isSearchable={isSearchable}
                isDisabled={isDisabled ? true : options.length === 0}
                isMulti={isMulti}
                options={options as readonly ({ label: string; value: string | null; } | GroupBase<{ label: string; value: string | null; }>)[]}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "0.525rem",
                        paddingTop: "0.125rem",
                        paddingBottom: "0.125rem",
                        borderColor: state.isFocused ? "#e6210f" : "#D0D7DE",
                        boxShadow: state.isFocused
                            ? "0 0 0 0.2rem rgba(230, 33, 15, 0.25)"
                            : "",
                        "&:hover": {
                            borderColor: state.isFocused ? "#e6210f" : "#D0D7DE",
                            boxShadow: state.isFocused
                                ? "0 0 0 0.2rem rgba(230, 33, 15, 0.25)"
                                : "",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                        },
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? "#e6210f" : "#fff",
                        color: state.isFocused ? "#fff" : "#212529",
                        "&:hover": {
                            backgroundColor: state.isFocused ? "#e6210f" : "#fff",
                            color: state.isFocused ? "#fff" : "#212529",
                            cursor: "pointer",
                        },
                    }),
                    menu: (baseStyles, _) => ({
                        ...baseStyles,
                        backgroundColor: "#fff",
                        color: "#212529",
                        zIndex: 9999,
                    }),
                    menuList: (baseStyles, _) => ({
                        ...baseStyles,
                        backgroundColor: "#fff",
                        color: "#212529",
                    }),
                    singleValue: (baseStyles, _) => ({
                        ...baseStyles,
                        color: inactive ? "#ccc" : "#212529",
                    }),
                    placeholder: (baseStyles, _) => ({
                        ...baseStyles,
                        color: "#212529",
                    }),
                    input: (baseStyles, _) => ({
                        ...baseStyles,
                        color: "#212529",
                    }),
                    dropdownIndicator: (baseStyles, _) => ({
                        ...baseStyles,
                        color: "#212529",
                    }),
                    indicatorSeparator: (baseStyles, _) => ({
                        ...baseStyles,
                        backgroundColor: "#212529",
                    }),
                    clearIndicator: (baseStyles, _) => ({
                        ...baseStyles,
                        color: "#212529",
                    }),
                    multiValue: (baseStyles, _) => ({
                        ...baseStyles,
                        backgroundColor: inactive ? "#ccc" : "#e6210f",
                        color: "#fff",
                    }),
                    multiValueLabel: (baseStyles, _) => ({
                        ...baseStyles,
                        color: "#fff",
                    }),
                    multiValueRemove: (baseStyles, _) => ({
                        ...baseStyles,
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#e6210f",
                            color: "#fff",
                        },
                    }),
                }}
            />
        </div>
    );
};

export default CustomSelect;
