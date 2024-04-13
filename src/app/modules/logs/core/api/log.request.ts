import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import { ILogDetailResponse, ILogResponse } from "../models/log.interface";
import api from "@base/helpers/enhencers/Interceptor";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "log";

// Get Pageable Users
export function fetchLogs({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<ILogResponse>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

//get log detail
export function fetchLogDetail(id: number): Promise<ILogDetailResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
