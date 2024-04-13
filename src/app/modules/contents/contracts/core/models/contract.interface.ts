export interface IContractResponse {
    id?: number;
    title: string;
    short_description: string;
    description: string;
    url: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    created_at?: string;
    active: boolean;
    login?: boolean;
    signup?: boolean;
    payment?: boolean;
    

}
export interface IContractRequest {
    title: string;
    short_description: string;
    description: string;
    url: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    active: boolean;
    login?: boolean;
    signup?: boolean;
    payment?: boolean;
}
