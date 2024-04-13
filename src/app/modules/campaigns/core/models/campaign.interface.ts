export interface ICampaignResponse {
  id: number;
  campaign_name: string;
  campaign_description: string;
  coupon_generate_limit: number;
  usage_period_type: string;
  campaign_image: string;
  discount_type: string;
  discount_value: number;
  valid_start_date: string;
  valid_end_date: string;
  campaign_status: string;
  is_ui_shown: boolean;
  created_at: string;
  customer: {
    id: number;
    company_name: string;
    image: string;
    account_status: boolean;
  };
}
export interface ICampaignRequest {
  campaign_name: string;
  campaign_description: string;
  coupon_generate_limit: number;
  usage_period_type?: string;
  campaign_image: string;
  discount_type?: string;
  discount_value: number;
  valid_start_date: string;
  valid_end_date: string;
  customer_id?: number;
  campaign_status?: string;
  is_ui_shown: boolean;
}
