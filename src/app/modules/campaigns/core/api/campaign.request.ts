import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { ICampaignRequest, ICampaignResponse } from "../models/campaign.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "campaign";

// Get Pageable Users
export function fetchCampaigns({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<ICampaignResponse>> {
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
export function deleteCampaign(id: number): Promise<void> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// add Blog Category
export function addCampaign(data:ICampaignRequest): Promise<ICampaignResponse> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

//get Blog Category by id
export function getCampaign(id: number): Promise<ICampaignResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//update Blog Category
export function updateCampaign({id , data}:{id:number,data:ICampaignRequest}): Promise<ICampaignResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}