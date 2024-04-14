export type CustomSelecttProps = {
    inactive?: boolean;
    placeholder?: string;
    isDisabled?: boolean;
    isSearchable?: boolean;
    options?:
    | {
        label: string;
        value: string | number | null;
    }[]
    | (() => {
        label: string;
        value: string | number | null;
    }[]);
    isMulti?: boolean;
    onChange?: (value: any) => void;
    value?:
    | {
        label: string;
        value: string | number | null;
    }
    | {
        label: string;
        value: string | number | null;
    }[]
    | null;
};