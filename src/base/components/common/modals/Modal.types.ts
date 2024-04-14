export type ModalProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
    open: boolean;
    align?: "center" | "default";
    onClose: () => void;
    backdrop?: "default" | "static";
    children: React.ReactNode;
};