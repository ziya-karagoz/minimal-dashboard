export type ButtonProps = {
    className?: string;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
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
    gradient?: boolean;
    shadow?: boolean;
    outlined?: boolean;
    size?: "xs" | "sm" | "base" | "lg" | "xl";
    icon?: React.ReactNode;
    loader?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}