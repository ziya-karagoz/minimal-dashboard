// List Entity variables

import api from "@base/helpers/enhencers/Interceptor";
import {
  IEntityVariableAssignRequest,
  IEntityVariableCreateRequest,
  IEntityVariableListResponse,
} from "../models/entity-variable.interface";
import {
  IVariableOptionCreateRequest,
  IVariableOptionUpdateRequest,
  IVariableUpdateRequest,
} from "../models/variable.interface";
import { EEntityOrigin } from "../models/entity-variable.enums";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "variable";

// Get Entity Variables
export function fetchEntityVariables({
  origin,
  entity_id,
}: {
  origin: EEntityOrigin;
  entity_id: number;
}): Promise<IEntityVariableListResponse> {
  return api.get(`${API_URL}/api/backoffice/${origin}/${PREFIX}/${entity_id}`);
}

// Create Entity Variable
export function createEntityVariable({
  origin,
  data,
}: {
  origin: EEntityOrigin;
  data: IEntityVariableCreateRequest;
}): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${origin}/${PREFIX}`, data);
}

// Create Entity Variable Assign
export function assignEntityVariable({
  origin,
  data,
}: {
  origin: EEntityOrigin;
  data: IEntityVariableAssignRequest;
}): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${origin}/${PREFIX}/assign`, data);
}

// Update Entity Variable
export function updateEntityVariable({
  origin,
  variable_id,
  data,
}: {
  origin: EEntityOrigin;
  variable_id: number;
  data: IVariableUpdateRequest;
}): Promise<any> {
  return api.put(
    `${API_URL}/api/backoffice/${origin}/${PREFIX}/${variable_id}`,
    data
  );
}

// Delete Entity Variable
export function deleteEntityVariable({
  variable_id,
  origin,
}: {
  origin: EEntityOrigin;
  variable_id: number;
}): Promise<any> {
  return api.delete(
    `${API_URL}/api/backoffice/${origin}/${PREFIX}/${variable_id}`
  );
}

// Add Option to Entity Variable
export function addOptionToEntityVariable({
  origin,
  data,
}: {
  origin: EEntityOrigin;
  data: IVariableOptionCreateRequest;
}): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${origin}/${PREFIX}/option`, data);
}

// Update Option to Entity Variable
export function updateOptionToEntityVariable({
  origin,
  option_id,
  data,
}: {
  option_id: number;
  origin: EEntityOrigin;
  data: IVariableOptionUpdateRequest;
}): Promise<any> {
  return api.put(
    `${API_URL}/api/backoffice/${origin}/${PREFIX}/option/${option_id}`,
    data
  );
}

// Delete Option from Entity Variable
export function deleteOptionFromEntityVariable({
  origin,
  option_id,
}: {
  option_id: number;
  origin: EEntityOrigin;
}): Promise<any> {
  return api.delete(
    `${API_URL}/api/backoffice/${origin}/${PREFIX}/option/${option_id}`
  );
}
