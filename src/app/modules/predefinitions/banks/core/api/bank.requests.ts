import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import {
  IBankCreateRequest,
  IBankResponseP,
  IBankUpdateRequest,
} from "../models/bank.interface";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "bank";

export function fetchBanks({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IBankResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Get single bank
export function getBank(id: number): Promise<IBankResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Create bank
export function addBank(data: IBankCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Update bank
export function updateBank({
  id,
  data,
}: {
  id: number;
  data: IBankUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete bank
export function deleteBank(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
