export interface ISectorResponseP {
  id: number;
  name: string;
  description: string;
  sector_code: string;
  active: boolean;
}

export interface ISectorCreateRequest {
  name: string;
  description: string;
  active: boolean;
}

export interface ISectorUpdateRequest {
  name?: string;
  description?: string;
  active?: boolean;
}
