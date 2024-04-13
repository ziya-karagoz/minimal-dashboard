import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { IStepResponseP, IStepUpdateRequest } from "../models/step.interface";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "step";

export function fetchSteps({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IStepResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Get single step
export function getStep(id: number): Promise<IStepResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update Step
export function updateStep({
  id,
  data,
}: {
  id: number;
  data: IStepUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}
