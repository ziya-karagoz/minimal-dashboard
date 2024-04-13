import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IDynamicPageRequest, IDynamicPageResponse } from "../models/dynamic-page";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "page";

// Get Pageable Users
export function fetchDynamicPages({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IDynamicPageResponse>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

//delete Blog Category
export function deleteDynamicPage(id: number): Promise<void> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// add Blog Category
export function addDynamicPage(data:IDynamicPageRequest): Promise<IDynamicPageResponse> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

//get Blog Category by id
export function getDynamicPage(id: number): Promise<IDynamicPageResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//update Blog Category
export function updateDynamicPage({id , data}:{id:number,data:IDynamicPageRequest}): Promise<IDynamicPageResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}