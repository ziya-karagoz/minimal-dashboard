
export type BottomNavigationProps = {
    items: {
        icon: React.ReactNode
        content: React.ReactNode
        to: string
    }[];
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
    type?: "default" | "appbar"

}