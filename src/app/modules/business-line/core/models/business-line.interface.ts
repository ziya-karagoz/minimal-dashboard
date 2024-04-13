export interface IBusinessLineCreateRequest {
  name: string;
  description: string;
  active: boolean;
}

export interface IBusinessLineResponseP {
  id: number;
  name: string;
  business_line_code: string;
  description: string;
  active: boolean;
}

export interface IBusinessLineUpdateRequest {
  name?: string;
  description?: string;
  active?: boolean;
}
