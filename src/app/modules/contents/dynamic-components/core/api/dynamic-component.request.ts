import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IDynamicComponentRequest, IDynamicComponentResponse } from "../models/dynamic-component.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "component";

export function fetchDynamicComponents({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IDynamicComponentResponse>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

//update blog
export function updateDynamicComponent({id,data}:{id: number, data: IDynamicComponentRequest}): Promise<IDynamicComponentResponse> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

//get blog by id
export function getDynamicComponent(id: number): Promise<IDynamicComponentResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}
