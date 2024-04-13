export interface IStepResponseP {
  id: number;
  name: string;
  description: string;
}

export interface IStepUpdateRequest {
  name?: string;
  description?: string;
}
