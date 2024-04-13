import { EContactAdminType, EContactStatus } from "./contact.enum";

export interface IContactResponseP {
  id: number;
  related_employee_name_surname: string;
  first_name: string;
  last_name: string;
  message: string;
  email: string;
  phone: string;
  device: string;
  status: EContactStatus;
  admin: IContactAdminResponse;
  completed_admin_name_surname: string;
  completed_admin: IContactAdminResponse;
  completed_admin_type: EContactAdminType;
  created_at: string;
  notes: IContactNote[];
}

export interface IContactResponseD {
  id: number;
  related_employee_name_surname: string;
  first_name: string;
  last_name: string;
  message: string;
  email: string;
  phone: string;
  device: string;
  status: EContactStatus;
  admin: IContactAdminResponse;
  completed_admin_name_surname: string;
  completed_admin: IContactAdminResponse;
  completed_admin_type: EContactAdminType;
  created_at: string;
  user_agent: string;
  ip_address: string;
  notes: IContactNote[];
}

export interface IContactAdminResponse {
  id: number;
  image: string;
  first_name: string;

  last_name: string;
  email: string;
}

export interface IContactNote {
  type: EContactAdminType;
  message: string;
  created_at: string;
  owner_name_surname: string;
  admin: IContactAdminResponse;
}

export interface ICreateContactMessageRequest {
  contact_id: number;
  message: string;
}
