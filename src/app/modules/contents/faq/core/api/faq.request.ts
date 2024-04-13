import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IFaqRequest, IFaqResponse } from "../models/faq.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "faq";

export function fetchFaqs({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IFaqResponse>> {
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
export function addFaq(data: IFaqRequest): Promise<IFaqResponse> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

//delete blog
export function deleteFaq(id: number): Promise<void> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//update blog
export function updateFaq({id,data}:{id: number, data: IFaqRequest}): Promise<IFaqResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

//get blog by id
export function getFaq(id: number): Promise<IFaqResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
