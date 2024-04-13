export type AlertProps = {
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
    bordered?: boolean;
    icon?: React.ReactNode | undefined;
    dismissible?: boolean;
    dismissIcon?: React.ReactNode;
    onDismiss?: () => void;
};