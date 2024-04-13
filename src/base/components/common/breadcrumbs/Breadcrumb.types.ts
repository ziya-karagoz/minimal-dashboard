export type BreadcrumbProps = {
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
    style?: "default" | "solid";
    items: {
        disabled?: boolean;
        name: string;
        icon?: React.ReactNode;
        link: string;
    }[];
};