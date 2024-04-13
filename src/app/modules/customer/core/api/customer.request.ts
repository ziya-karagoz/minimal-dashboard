import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import {
  ICustomerCreateRequest,
  ICustomerResponseP,
  ICustomerUpdatePasswordRequest,
  ICustomerUpdateRequest,
} from "../models/customer.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "customer";

// Get Pageable Customers
export function fetchCustomers({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<ICustomerResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Add Customer
export function addCustomer(data: ICustomerCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Get Single Customer
export function getCustomer(id: number): Promise<ICustomerResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update Customer
export function updateCustomer({
  id,
  data,
}: {
  id: number;
  data: ICustomerUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Customer
export function deleteCustomer(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update Customer's Password
export function updateCustomerPassword({
  id,
  data,
}: {
  id: number;
  data: ICustomerUpdatePasswordRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}/password`, data);
}

// Update Single Customer Setting

export function updateCustomerSetting({
  customerId,
  settingId,
}: {
  customerId: number;
  settingId: number;
}): Promise<any> {
  return api.put(
    `${API_URL}/api/backoffice/${PREFIX}/${customerId}/setting/${settingId}`
  );
}
