export interface IDynamicPageResponse {
    id: number;
    title: string;
    short_description: string;
    description: string;
    url: string;
    meta_title: string;
    main_image: string;
    meta_description: string;
    meta_keywords: string;
    active: boolean;
}
export interface IDynamicPageRequest {
    title: string;
    short_description: string;
    description: string;
    url: string;
    meta_title: string;
    main_image: string;
    meta_description: string;
    meta_keywords: string;
    active: boolean;
}
