export type ButtonGroupProps = {
    color?:
    | "blue"
    | "gray"
    | "red"
    | "green"
    | "yellow"
    | "indigo"
    | "purple"
    | "pink"
    | "orange";
    buttons: {
        content: string;
        icon?: React.ReactNode;
        to?: string;
        active?: boolean;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }[];
    outlined?: boolean;
};