import { EEntityItemType } from "./entity-variable.enums";
import { EVariableType } from "./variable.enums";

export interface IVariableResponseP {
  id: number;
  type: EVariableType;
  name: string;
  usage_count: number;
  active: boolean;
  created_at: string;
}

export interface IVariableResponse {
  id: number;
  type: EVariableType;
  name: string;
  active: boolean;
  unit: {
    id: number;
    name: string;
  };
  options: IVariableOption[];
}

export interface IVariableOption {
  id: number;
  name: string;
  is_answer: boolean;
}

export interface IVariableCreateRequest {
  name: string;
  type: EVariableType | null;
  active: boolean;
  unit_id: number | null;
  options: {
    name: string;
  }[];
}

export interface IVariableUpdateRequest {
  name?: string;
  unit_id?: number;
  active?: boolean;
  type?: EVariableType;
}

export interface IVariableUsageResponseP {
  id: number;
  usage_id: number;
  usage_name: string;
  usage_code: string;
  usage_type: EEntityItemType;
  created_at: string;
}

export interface IVariableOptionCreateRequest {
  variable_id: number;
  name: string;
}

export interface IVariableOptionUpdateRequest {
  name?: string;
  is_answer?: boolean;
}
