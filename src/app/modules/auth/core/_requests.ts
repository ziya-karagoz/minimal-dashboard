import axios, { AxiosResponse } from "axios";
import { CurrentUserModel, LoginResponse } from "./_models";
import api from "@base/helpers/enhencers/Interceptor";

const APP_URL = import.meta.env.VITE_APP_API_URL;
export const LOGIN_URL = `${APP_URL}/api/backoffice/auth/login`;
export const REQUEST_PASSWORD_URL = `${APP_URL}/forgot_password`;

export function login(email: string, password: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<LoginResponse>(LOGIN_URL, {
        email,
        password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchCurrentUser(): Promise<
  AxiosResponse<CurrentUserModel, any>
> {
  return api.get<CurrentUserModel>(`${APP_URL}/api/backoffice/admin/current`);
}
