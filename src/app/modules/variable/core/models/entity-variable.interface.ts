import { EEntityItemType } from "./entity-variable.enums";
import { EVariableType } from "./variable.enums";
import { IVariableResponse } from "./variable.interface";

export interface IEntityVariableListResponse {
  entity: {
    id: number;
    name: string;
  };
  items: {
    type: EEntityItemType;
    variables: IVariableResponse[];
  }[];
}

export interface IEntityVariableCreateRequest {
  entity_id: number;
  name: string;
  type: EVariableType | null;
  active: true;
  unit_id: number | null;
  options: [
    {
      name: string;
    }
  ];
}

export interface IEntityVariableAssignRequest {
  entity_id: number;
  variable_id: number;
}
