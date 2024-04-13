import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import {
  ISectorCreateRequest,
  ISectorResponseP,
  ISectorUpdateRequest,
} from "../models/sector.interface";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "sector";

export function fetchSectors({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<ISectorResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

export function getSector(id: number): Promise<ISectorResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Add Sector
export function addSector(data: ISectorCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Update Sector
export function updateSector({
  id,
  data,
}: {
  id: number;
  data: ISectorUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Sector
export function deleteSector(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
