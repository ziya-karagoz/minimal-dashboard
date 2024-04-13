import { ECustomerType, EPartnerScope, EPartnerType } from "./customer.enum";

export interface ICustomerResponseP {
  id: number;
  company_name: string;
  email: string;
  image?: string;
  phone: string;
  phone_code: string;
  partner_type: EPartnerType;
  partner_scopes: EPartnerScope[];
  type: ECustomerType;
  account_status: boolean;
  dealer: ICustomerResponseDealer;
  sector: {
    id: number;
    name: string;
  };
}

export interface ICustomerResponseDealer {
  id: number;
  company_name: string;
  email: string;
  image: string;
  phone: string;
  phone_code: string;
  partner_type: EPartnerType;
  type: ECustomerType;
  account_status: boolean;
}

export interface ICustomerCreateRequest {
  company_name: string;
  email: string;
  image: string;
  phone: string;
  sector_id: number | null;
  phone_code: string;
  password: string;
  password_confirm: string;
  partner_scopes: EPartnerScope[];
  account_status: boolean;
}

export interface ICustomerUpdateRequest {
  company_name?: string;
  email?: string;
  image?: string;
  sector_id?: number | null;
  phone?: string;
  phone_code?: string;
  partner_type?: EPartnerType;
  partner_scopes?: EPartnerScope[];
  account_status?: boolean;
}

export interface ICustomerUpdatePasswordRequest {
  password: string;
  password_confirm: string;
}
