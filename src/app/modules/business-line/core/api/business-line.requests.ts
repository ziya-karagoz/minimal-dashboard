import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";

import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import {
  IBusinessLineCreateRequest,
  IBusinessLineResponseP,
  IBusinessLineUpdateRequest,
} from "../models/business-line.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "business-line";

// Get Pageable Business Lines
export function fetchBusinessLines({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IBusinessLineResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Get Single Business Line
export function fetchBusinessLine(id: number): Promise<IBusinessLineResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Create Business Line
export function createBusinessLine(
  data: IBusinessLineCreateRequest
): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Update Business Line
export function updateBusinessLine({
  id,
  data,
}: {
  id: number;
  data: IBusinessLineUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Business Line
export function deleteBusinessLine(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Copy Business Line
export function copyBusinessLine(id: number): Promise<any> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}/copy`);
}
