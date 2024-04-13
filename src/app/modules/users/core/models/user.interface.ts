export interface IUserResponseP {
  account_status: boolean;
  birthday: string;
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  image?: string;
  last_name: string;
  phone: string;
  phone_code: string;
  tc_or_passport: string;
}

export interface IUserCreateRequest {
  first_name: string;
  last_name: string;
  email: string;
  image: string | null;
  phone: string;
  phone_code: string;
  birthday?: string;
  tc_or_passport: string;
  password: string;
  password_confirm: string;
  account_status: boolean;
}

export interface IUserUpdateRequest {
  first_name?: string;
  last_name?: string;
  image: string | null;
  email?: string;
  phone?: string;
  phone_code?: string;
  birthday?: string;
  tc_or_passport?: string;
  account_status?: boolean;
}

export interface IUserUpdatePasswordRequest {
  password: string;
  password_confirm: string;
}

export interface IUserSetting {
  id: number;
  active: boolean;
  setting: {
    title: string;
    description: string;
    is_new: boolean;
  };
}
