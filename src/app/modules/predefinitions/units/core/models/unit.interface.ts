export interface IUnitResponseP {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface IUnitCreateRequest {
  name: string;
  description: string;
  active: boolean;
}

export interface IUnitUpdateRequest {
  name?: string;
  description?: string;
  active?: boolean;
}
