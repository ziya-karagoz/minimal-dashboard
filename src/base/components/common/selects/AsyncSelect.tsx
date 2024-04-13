import { AsyncPaginate } from "react-select-async-paginate";

type Props = {
    className?: string;
    inactive?: boolean;
    isDisabled?: boolean;
    isSearchable?: boolean;
    defaultValue?: any;
    value: any;
    isMulti?: boolean;
    placeholder?: string;
    onChange: (value: any) => void;
    loadOptions: (
        search: any,
        loadedOptions: any,
        { page }: any
    ) => Promise<{
        options: any;
        hasMore: boolean;
        additional: {
            page: any;
        };
    }>;
};

const AsyncSelect: React.FC<Props> = ({ defaultValue,
    className = "",
    value,
    inactive = false,
    isDisabled = false,
    onChange,
    loadOptions,
    isSearchable = false,
    isMulti = false,
    placeholder = "Seçiniz...", }) => {
    return (
        <div className={className}>
            <AsyncPaginate
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                isSearchable={isSearchable}
                isMulti={isMulti}
                value={value}
                loadOptions={loadOptions}
                placeholder={placeholder}
                onChange={onChange}
                additional={{
                    page: 1,
                }}
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

export default AsyncSelect;

// here is an exapmle loadOption method

// const loadCompanyOptions = async (search: any, _: any, { page }: any) => {
//     return fetchCompanys({
//       skip: page,
//       filter: `[{"id":"global_search","type":"SEARCH","value":"${search}","columns":[{"id":"company_name","type":"string"}]}]`,
//       take: 10,
//     })
//       .then((res: any) => {
//         const options = res.items.map((item: any) => ({
//           label: item.company_name,
//           value: item.id,
//         }));
//         return {
//           options: options,
//           hasMore: res.meta.totalPages > res.meta.currentPage,
//           additional: {
//             page: page + 1,
//           },
//         };
//       })
//       .catch((err) => err);
//   };
