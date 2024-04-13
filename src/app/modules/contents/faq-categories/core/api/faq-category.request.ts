import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IFaqCategoryRequest, IFaqCategoryResponse } from "../models/faq-category.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "faq/module/category";

export function fetchFaqCategories({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IFaqCategoryResponse>> {
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
export function addFaqCategory(data: IFaqCategoryRequest): Promise<IFaqCategoryResponse> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

//delete blog
export function deleteFaqCategory(id: number): Promise<void> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//update blog
export function updateFaqCategory({id,data}:{id: number, data: IFaqCategoryRequest}): Promise<IFaqCategoryResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

//get blog by id
export function getFaqCategory(id: number): Promise<IFaqCategoryResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
