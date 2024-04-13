import api from "@base/helpers/enhencers/Interceptor";
import {
  IEcommerceSettingResponse,
  IEcommerceSettingUpdateRequest,
  ISystemSetting,
  ISystemSettingUpdateRequest,
  IUserSettingResponseP,
  IUserSettingUpdateRequest,
} from "../models/settings.interface";
import { FetchListParams } from "@base/enums/api.interface";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";

const API_URL = import.meta.env.VITE_API_URL;

// Get system settings
export function getSystemSettings(): Promise<{ settings: ISystemSetting[] }> {
  return api.get(`${API_URL}/api/backoffice/system-setting`);
}

// Update system settings
export function updateSystemSettings(
  data: ISystemSettingUpdateRequest
): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/system-setting`, data);
}

// Get ecommerce settings
export function getEcommerceSettings(): Promise<IEcommerceSettingResponse> {
  return api.get(`${API_URL}/api/backoffice/ecommerce-setting`);
}

// Update ecommerce settings

export function updateEcommerceSettings(
  data: IEcommerceSettingUpdateRequest
): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/ecommerce-setting`, data);
}

// Get Pageable User Settings
export function getUserSettings({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IUserSettingResponseP>> {
  return api.get(`${API_URL}/api/backoffice/user-setting-item`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Get Single User Setting
export function getUserSetting(id: number): Promise<IUserSettingResponseP> {
  return api.get(`${API_URL}/api/backoffice/user-setting-item/${id}`);
}

// Update User Setting
export function updateUserSetting({
  id,
  data,
}: {
  id: number;
  data: any;
}): Promise<IUserSettingUpdateRequest> {
  return api.put(`${API_URL}/api/backoffice/user-setting-item/${id}`, data);
}
