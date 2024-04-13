import { IServiceGroupResponseP } from "@app/modules/service-group/core/models/service-group.interface";

export interface IServiceCreateRequest {
  name: string;
  description: string;
  service_group_id: number;
  active: boolean;
}

export interface IServiceResponseP {
  id: number;
  name: string;
  service_code: string;
  description: string;
  active: boolean;
  service_group: IServiceGroupResponseP;
}

export interface IServiceUpdateRequest {
  name?: string;
  description?: string;
  service_group_id?: number;
  active?: boolean;
}
