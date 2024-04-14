// progressiveColors overrides the color prop and uses a gradient from red to green based on the value prop
export type ProgressProps = {
    title?: string;
    value: number;
    progressiveColors?: boolean;
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
    size: "sm" | "md" | "lg";
    withLabel?: boolean;
    labelPosition?: "inside" | "outside";
};