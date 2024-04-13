export type BannerProps = {
    icon?: React.ReactNode;
    children: React.ReactNode;
    dismissible?: boolean;
    dismissIcon?: React.ReactNode;
    onDismiss?: () => void;
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
};