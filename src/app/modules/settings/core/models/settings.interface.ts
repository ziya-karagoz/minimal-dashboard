export interface ISystemSetting {
  setting_name: string;
  value: string;
  setting_label: string;
  setting_type: "checkbox" | "text" | "phone";
  code: string | null;
}

export interface ISystemSettingUpdateRequest {
  systemSettings: {
    setting_name: string;
    value: string;
    code: string | null;
  }[];
}

export interface IEcommerceSettingResponse {
  id: number;
  shop_without_membership: boolean;
  can_be_ordered: boolean;
  payment_pay_at_the_door: boolean;
  payment_pay_at_the_door_credit_cart: boolean;
  payment_eft_transfer: boolean;
  payment_paytr: boolean;
  payment_iyzico: boolean;
  paytr_merchant_id: string;
  paytr_merchant_key: string;
  paytr_merchant_salt: string;
  paytr_installment_code: string;
  iyzico_api_key: string;
  iyzico_screet_key: string;
  iyzico_base_url: string;
  payment_ozan_super: boolean;
  ozan_super_api_key: string;
  ozan_super_screet_key: string;
  order_notif_mail: string;
}

export interface IEcommerceSettingUpdateRequest {
  shop_without_membership?: boolean;
  can_be_ordered?: boolean;
  payment_pay_at_the_door?: boolean;
  payment_pay_at_the_door_credit_cart?: boolean;
  payment_eft_transfer?: boolean;
  payment_with_cryptocurrency?: boolean;
  payment_paytr?: boolean;
  payment_iyzico?: boolean;
  paytr_merchant_id?: string;
  paytr_merchant_key?: string;
  paytr_merchant_salt?: string;
  paytr_installment_code?: string;
  iyzico_api_key?: string;
  iyzico_screet_key?: string;
  iyzico_base_url?: string;
  order_notif_mail?: string;
  payment_ozan_super?: boolean;
  ozan_super_api_key?: string;
  ozan_super_screet_key?: string;
}

export interface IUserSettingResponseP {
  id: number;
  title: string;
  description: string;
  is_new: boolean;
}

export interface IUserSettingUpdateRequest {
  title: string;
  description: string;
  is_new: boolean;
}
