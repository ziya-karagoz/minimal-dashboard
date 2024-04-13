import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";

import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import {
  IServiceGroupCreateRequest,
  IServiceGroupResponseP,
  IServiceGroupUpdateRequest,
} from "../models/service-group.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "service-group";

// Get Pageable Service Groups
export function fetchServiceGroups({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IServiceGroupResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Get Single Service Group
export function fetchServiceGroup(id: number): Promise<IServiceGroupResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Create Service Group
export function createServiceGroup(
  data: IServiceGroupCreateRequest
): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Update Service Group
export function updateServiceGroup({
  id,
  data,
}: {
  id: number;
  data: IServiceGroupUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Service Group
export function deleteServiceGroup(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Copy Service Group
export function copyServiceGroup(id: number): Promise<any> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/copy`);
}
