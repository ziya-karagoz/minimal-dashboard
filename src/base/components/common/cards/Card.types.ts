export type CardProps = {
    exClass?: string;
    shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
    dismissible?: boolean;
    collapsible?: boolean;
    onDismiss?: () => void;
    children: React.ReactNode;
};

export type CardHeaderProps = {
    dismissIcon?: React.ReactNode;
    children: React.ReactNode;
};

export type CardBodyProps = {
    children: React.ReactNode;
};

export type CardFooterProps = {
    floating?: boolean; // Yeni özellik
    children: React.ReactNode;
};