export interface IBlogCategoryResponse {
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
export interface IBlogCategoryRequest {
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
