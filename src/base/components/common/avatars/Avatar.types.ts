export type AvatarProps = {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | "2xl";
    shape?: 'rounded' | 'circle';
    src?: string;
    initial?: string;
    alt?: string;
    className?: string;
    bordered?: boolean;
    type?: 'default' | 'stacked';
    indicator?: {
        color?: 'blue' | 'gray' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'orange';
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    };
};