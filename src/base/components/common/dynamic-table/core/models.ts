import { ERole } from "../../../../enums/role.enum";

export interface PageableResponseModel<T> {
  items: T[];
  meta: TableMeta;
}

export interface TableMeta {
  totalItems: number;
  itemCount: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export enum EFilterType {
  SELECT = "SELECT",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

export enum EFilterOperator {
  OR = "or",
  AND = "and",
  EQUALS = "=",
  NOT = "!=",
  LESS_THAN = "<",
  LESS_THAN_OR_EQUAL = "<=",
  GREATER_THAN = ">",
  GREATER_THAN_OR_EQUAL = ">=",
  CONTAINS = "contains",
  STARTS_WITH = "startsWith",
  ENDS_WITH = "endsWith",
}

export enum EColumnType {
  IMAGE = "image",
  PROFILE = "profile",
  POINT = "point",
  BADGE = "badge",
  DATE = "date",
  OPERATIONS = "operations",
}

export enum IConditionLogic {
  STRAIGHT = "STRAIGHT",
  INVERSE = "INVERSE",
  OBJECT_EXIST = "OBJECT_EXIST",
}
export interface IOperation {
  name: string;
  icon: string;
  text: string;
  handle: (row: any) => void;
  role: ERole;
  conditions?: { key: string; value?: any; logic: IConditionLogic }[];
}

export interface FilterDropdownType {
  value: any;
  name: string;
  label: string;
}

export interface IColumn<T> {
  type?: EColumnType;
  operations?: IOperation[];
  label?: string;
  // ! Degisecek
  id?: string | keyof T;
  alignRight?: boolean;
  filterContent?: (item: any) => string | JSX.Element;
  filterable?: boolean;
  filterType?: EFilterType;
  point?: {
    bg: { [key: string]: string };
    text: { [key: string]: string };
  };
  badge?: {
    bg: { [key: string]: string };
    text: { [key: string]: string };
  };
  filterDropdownTypes?: FilterDropdownType[];
}

export type IColumnFilterParams = {
  path: string;
  skip?: number;
  take?: number;
  sort?: string;
  search?: string;
  status?: string;
  group?: string;
};

export type IFilterField = {
  id: number;
  type: EFilterType;
  selecteds?: string[] | number[] | boolean[];
  min?: number;
  max?: number;
};

export type IFilterResponseData = {
  key: any;
};
export interface IFilterResponse {
  data: IFilterResponseData[];
  totalCount: number;
}
