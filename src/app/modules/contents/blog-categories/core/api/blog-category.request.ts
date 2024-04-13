import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IBlogCategoryRequest, IBlogCategoryResponse } from "../models/blog-category.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "blog/module/category";

// Get Pageable Users
export function fetchBlogCategories({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IBlogCategoryResponse>> {
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
export function deleteBlogCategory(id: number): Promise<void> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// add Blog Category
export function addBlogCategory(data:IBlogCategoryRequest): Promise<IBlogCategoryResponse> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

//get Blog Category by id
export function getBlogCategoryById(id: number): Promise<IBlogCategoryResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//update Blog Category
export function updateBlogCategory({id , data}:{id:number,data:IBlogCategoryRequest}): Promise<IBlogCategoryResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}