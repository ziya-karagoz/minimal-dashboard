import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import {
  IVariableCreateRequest,
  IVariableOptionCreateRequest,
  IVariableOptionUpdateRequest,
  IVariableResponse,
  IVariableResponseP,
  IVariableUpdateRequest,
} from "../models/variable.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "variable";

// Get Pageable Variables
export function fetchVariables({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IVariableResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Add Variable
export function createVariable(data: IVariableCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Get Single Variable
export function fetchVariable(id: number): Promise<IVariableResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update Variable
export function updateVariable({
  id,
  data,
}: {
  id: number;
  data: IVariableUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Variable
export function deleteVariable(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Get Pageable Variables Usage
export function fetchVariableUsage({
  variable_id,
  skip,
  take,
  sort,
  filter,
}: {
  variable_id: number;
  skip: number;
  take: number;
  sort: string;
  filter: string;
}): Promise<PageableResponseModel<IVariableResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${variable_id}/usage`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Add option to variable
export function createVariableOption(
  data: IVariableOptionCreateRequest
): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}/option`, data);
}

// Update option to variable
export function updateVariableOption({
  option_id,
  data,
}: {
  option_id: number;
  data: IVariableOptionUpdateRequest;
}): Promise<any> {
  return api.put(
    `${API_URL}/api/backoffice/${PREFIX}/option/${option_id}`,
    data
  );
}

// Delete option from variable

export function deleteVariableOption(option_id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/option/${option_id}`);
}
