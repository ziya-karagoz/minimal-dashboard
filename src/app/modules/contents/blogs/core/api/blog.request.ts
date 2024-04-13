import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IBlogRequest, IBlogResponse } from "../models/blog.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "blog";

export function fetchBlogs({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IBlogResponse>> {
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
export function addBlog(data: IBlogRequest): Promise<IBlogResponse> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

//delete blog
export function deleteBlog(id: number): Promise<void> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//update blog
export function updateBlog({id,data}:{id: number, data: IBlogRequest}): Promise<IBlogResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

//get blog by id
export function getBlog(id: number): Promise<IBlogResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
