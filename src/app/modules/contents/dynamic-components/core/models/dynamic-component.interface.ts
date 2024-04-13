export interface IDynamicComponentResponse {
    id?: number;
    title: string;
    short_description: string;
    description: string;
    main_image: string;
    active: boolean;

}
export interface IDynamicComponentRequest{
    title: string;
    short_description: string;
    description: string;
    main_image: string;
    active: boolean;

}
