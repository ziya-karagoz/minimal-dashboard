export interface IBlogResponse {
    id?: number;
    title: string;
    short_description: string;
    description: string;
    url: string;
    meta_title: string;
    main_image: string;
    meta_description: string;
    meta_keywords: string;
    created_at?: string;
    active: boolean;
    category:{
        id:number;
        title:string;
        short_description:string;
        created_at  : string;
    }
}
export interface IBlogRequest {
    title: string;
    short_description: string;
    description: string;
    url: string;
    meta_title: string;
    main_image: string;
    meta_description: string;
    meta_keywords: string;
    active: boolean;
    category_id: number;
}
