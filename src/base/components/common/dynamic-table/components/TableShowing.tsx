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
    <div className="flex items-center justify-start md:w-1/4 text-gray-500 space-x-1">
      <span className="me-2">Gösterilen:</span>
      <select
        onChange={handleChangeItemCount}
        value={meta.itemsPerPage}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 "
        aria-label="DefaultSelectExample"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <span className="mx-">of</span>
      <span id="datatableWithPaginationInfoTotalQty">{meta.totalItems}</span>
    </div>
  );
}
