import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import {
  IUserCreateRequest,
  IUserResponseP,
  IUserSetting,
  IUserUpdatePasswordRequest,
  IUserUpdateRequest,
} from "../models/user.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "user";

// Get Pageable Users
export function fetchUsers({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IUserResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Add User
export function addUser(data: IUserCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Get Single User
export function getUser(id: number): Promise<IUserResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update User
export function updateUser({
  id,
  data,
}: {
  id: number;
  data: IUserUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete User
export function deleteUser(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update User's Password
export function updateUserPassword({
  id,
  data,
}: {
  id: number;
  data: IUserUpdatePasswordRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}/password`, data);
}

// Get Single User Settings
export function getUserSettings(id: number): Promise<{
  settings: IUserSetting[];
}> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/setting`);
}

// Update Single User Setting

export function updateUserSetting({
  userId,
  settingId,
}: {
  userId: number;
  settingId: number;
}): Promise<any> {
  return api.put(
    `${API_URL}/api/backoffice/${PREFIX}/${userId}/setting/${settingId}`
  );
}
