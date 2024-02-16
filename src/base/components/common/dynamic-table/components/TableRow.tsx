import React from "react";
import { v4 as uuidv4 } from "uuid";
import { IColumn } from "../core/models";
import TableCell from "./TableCell";
type TableRowProps<T> = {
  tableHeads: IColumn<T>[];
  row: T;
};
export default function TableRow<T>({ tableHeads, row }: TableRowProps<T>) {
  return (
    <tr key={uuidv4()} tabIndex={-1}>
      {tableHeads.map((tableHead, key) => {
        return <TableCell key={key} tableHead={tableHead} row={row} />;
      })}
    </tr>
  );
}
