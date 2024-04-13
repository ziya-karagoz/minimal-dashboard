import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import {
  IUnitCreateRequest,
  IUnitResponseP,
  IUnitUpdateRequest,
} from "../models/unit.interface";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "unit";

export function fetchUnits({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IUnitResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

export function getUnit(id: number): Promise<IUnitResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Add Unit
export function addUnit(data: IUnitCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Update Unit
export function updateUnit({
  id,
  data,
}: {
  id: number;
  data: IUnitUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Unit
export function deleteUnit(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
