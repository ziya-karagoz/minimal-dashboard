export interface IFaqResponse {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  active: boolean;
  faq_category: {
    id: number;
    title: string;
    active: boolean;
    created_at: string;
  };
}
export interface IFaqRequest {
  title: string;
  description: string;
  faq_category_id: number;
  active: boolean;
}
