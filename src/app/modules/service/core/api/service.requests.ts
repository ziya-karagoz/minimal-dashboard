import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";

import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import {
  IServiceCreateRequest,
  IServiceResponseP,
  IServiceUpdateRequest,
} from "../models/service.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "service";

// Get Pageable Services
export function fetchServices({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IServiceResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Get Single Service
export function fetchService(id: number): Promise<IServiceResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Create Service
export function createService(data: IServiceCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Update Service
export function updateService({
  id,
  data,
}: {
  id: number;
  data: IServiceUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Service
export function deleteService(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Copy Service
export function copyService(id: number): Promise<any> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/copy`);
}
