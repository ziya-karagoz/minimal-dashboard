import React from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { hasPermissionMany } from "../../../../helpers/permissions/permission.helper";
import { IColumn, IFilterField } from "../core/models";
import TableDropdown from "./TableDropdown";

type TableHeadProps<T> = {
  order: "asc" | "desc";
  orderBy: string;
  headLabel: IColumn<T>[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  filterPath: any;
};
export default function TableHead<T>({
  order,
  orderBy,
  headLabel,
  onRequestSort,
  filterPath,
}: TableHeadProps<T>) {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  type HeadCellItemProps = {
    headCell: any;
  };

  const HeadCellItem = ({ headCell }: HeadCellItemProps) => {
    const [searchParams] = useSearchParams();
    const [filterField, setFilterField] = React.useState<IFilterField>(
      JSON.parse(searchParams.get("filter")!)?.find(
        (x: any) => x.id === headCell.id
      ) ?? {
        id: headCell.id,
        type: headCell.filterType,
        selecteds: [],
        min: null,
        max: null,
      }
    );
    let roleCheck = true;
    if (headCell?.type === "operations") {
      let roles = "";
      headCell.operations.forEach((item: any) => (roles += item?.role + ","));
      roleCheck = hasPermissionMany(roles);
    }

    if (roleCheck)
      return (
        <th align={"left"} className="p-5 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100  text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          <div className="flex align-center justify-start gap-1">
            {headCell.filterable ? (
              <TableDropdown<T>
                headCell={headCell}
                filterPath={filterPath}
                filterField={filterField}
                setFilterField={setFilterField}
              />
            ) : null}
            <div
              onClick={createSortHandler(headCell.id)}
              className={`cursor-pointer dynamic-table-head flex align-start justify-start gap-1 ${clsx(
                {
                  "text-gray-500":
                    filterField?.selecteds?.length === 0 &&
                    filterField.min === null &&
                    filterField.max === null,
                  "text-primary-500":
                    (filterField?.selecteds?.length &&
                      filterField?.selecteds?.length > 0) ||
                    filterField.min !== null ||
                    filterField.max !== null,
                }
              )}`}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <div>
                  {order === "desc" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-sort-alpha-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
                      />
                      <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-sort-alpha-down-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                      <path
                        fillRule="evenodd"
                        d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"
                      />
                      <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                    </svg>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </th>
      );
  };
  return (
    <thead className="align-bottom">
      <tr className="table-row align-top">
        {headLabel.map((headCell, index) => (
          <HeadCellItem headCell={headCell} key={index} />
        ))}
      </tr>
    </thead>
  );
}
