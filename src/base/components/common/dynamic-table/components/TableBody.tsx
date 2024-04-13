import TableRow from "./TableRow";
import { IColumn } from "../core/models";

type TableBodyProps<T> = {
  tableHeads: IColumn<T>[];
  rows?: T[];
};

export default function TableBody<T>({ tableHeads, rows }: TableBodyProps<T>) {
  return (
    <>
      <tbody>
        {rows?.map((row, index) => (
          <TableRow key={index} tableHeads={tableHeads} row={row} />
        ))}
      </tbody>
    </>
  );
}
