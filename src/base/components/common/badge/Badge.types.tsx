export type BadgeProps = {
    className?: string;
    children?: React.ReactNode;
    color?:
    "blue"
    | "gray"
    | "red"
    | "green"
    | "yellow"
    | "indigo"
    | "purple"
    | "pink"
    | "orange";
    size?: "xs" | "sm" | "md";
    bordered?: boolean;
    pill?: boolean;
    link?: string | undefined;
    icon?: React.ReactNode | undefined;
    iconDirection?: "left" | "right";
};