import { IBusinessLineResponseP } from "@app/modules/business-line/core/models/business-line.interface";

export interface IServiceGroupCreateRequest {
  name: string;
  description: string;
  business_line_id: number;
  active: boolean;
}

export interface IServiceGroupResponseP {
  id: number;
  name: string;
  service_group_code: string;
  description: string;
  active: boolean;
  business_line: IBusinessLineResponseP;
}

export interface IServiceGroupUpdateRequest {
  name?: string;
  description?: string;
  business_line_id?: number;
  active?: boolean;
}
