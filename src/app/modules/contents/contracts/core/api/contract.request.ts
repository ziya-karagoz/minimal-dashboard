import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IContractRequest, IContractResponse } from "../models/contract.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "contract";

export function fetchContracts({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IContractResponse>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// add blog 
export function addContract(data: IContractRequest): Promise<IContractResponse> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

//delete blog
export function deleteContract(id: number): Promise<void> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//update blog
export function updateContract({id,data}:{id: number, data: IContractRequest}): Promise<IContractResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

//get blog by id
export function getContract(id: number): Promise<IContractResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
