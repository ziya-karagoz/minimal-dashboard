import React from "react";
import { TableMeta } from "../core/models";

type TableShowingProps = {
  meta: TableMeta;
  handleChangeItemCount: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export default function TableShowing({
  meta,
  handleChangeItemCount,
}: TableShowingProps) {
  return (
    <div className="d-flex align-items-center">
      <span className="me-2">Gösterilen:</span>
      <select
        onChange={handleChangeItemCount}
        value={meta.itemsPerPage}
        className="form-select me-2 table-countshow"
        aria-label="DefaultSelectExample"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <span className="text-secondary me-2"> of</span>
      <span id="datatableWithPaginationInfoTotalQty">{meta.totalItems}</span>
    </div>
  );
}
