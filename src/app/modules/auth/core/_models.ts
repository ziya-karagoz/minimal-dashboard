export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
  user: CurrentUserModel;
}

export interface AuthModel {
  accessToken: string;
}

export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
}

export interface CurrentUserModel {
  account_status: boolean;
  created_at: string;
  deleted_at: string;
  email: string;
  first_name: string;
  id: number;
  image: string;
  last_name: string;
  phone: string;
  phone_code: string;
  signout: boolean;
  updated_at: string;
}

export type LogoutOptions = {
  alert?: boolean;
};
