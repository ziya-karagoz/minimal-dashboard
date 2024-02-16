import React from "react";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import { EColumnType, IColumn } from "../core/models";
import { hasPermission } from "../../../../helpers/permissions/permission.helper";
import { useIntl } from "react-intl";

type TableCellProps<T> = {
  tableHead: IColumn<T>;
  row: T;
};
export default function TableCell<T>({ tableHead, row }: TableCellProps<T>) {
  const intl = useIntl();

  // @ts-ignore
  const value = row[tableHead?.id];
  switch (tableHead.type) {
    case EColumnType.IMAGE:
      return (
        <td>
          <div>
            <img src={value} alt="" />
          </div>
        </td>
      );
    case EColumnType.PROFILE:
      return (
        <td>
          <div>
            <img className="image-profile" src={value} alt="" />
          </div>
        </td>
      );
    case EColumnType.POINT:
      return (
        <td align="left">
          <span
            className={"legend-indicator " + tableHead?.point?.bg[value]}
          ></span>
          {tableHead?.point?.text[value]}
        </td>
      );
    case EColumnType.BADGE:
      return (
        <td align="left">
          <span className={"badge " + tableHead?.badge?.bg[value]}>
            {tableHead?.badge?.text[value]}
          </span>
        </td>
      );

    case EColumnType.OPERATIONS:
      return (
        <td align="left">
          {tableHead.operations?.map((item, index) => {
            if (item?.conditions?.length) {
              for (const element of item.conditions) {
                if (row[element.key] !== element.value) {
                  return "";
                }
              }
            }
            const labelExists = intl.messages[item?.text] !== undefined;
            return hasPermission(item?.role) ? (
              <React.Fragment key={index}>
                <Tooltip
                  id={"tooltip-" + index}
                  place="top"
                  content={intl.formatMessage({
                    id: labelExists ? item?.text : "",
                  })}
                />
                <span
                  data-tooltip-id={"tooltip-" + index}
                  key={index}
                  className="btn btn-icon btn-sm btn-soft-primary ms-1"
                  onClick={() => {
                    item.handle(row[item?.key ?? "id"]);
                  }}
                >
                  <Icon
                    fontSize={"18px"}
                    icon={item?.icon}
                    className="btn-icon"
                  ></Icon>
                </span>
              </React.Fragment>
            ) : null;
          })}
        </td>
      );
      break;
    case EColumnType.DATE:
      return (
        <td align="left">{new Date(value).toLocaleDateString("tr-TR")}</td>
      );
    default:
      const relations = tableHead?.id.split(".");
      if (relations.length > 1) {
        try {
          let data = row;
          for (const relation of relations) {
            data = data[relation];
          }
          return data ? (
            <td align="left">
              {row[tableHead?.idLeft]}{" "}
              {tableHead?.filterContent ? tableHead?.filterContent(data) : data}{" "}
              {row[tableHead?.idRight]}
            </td>
          ) : (
            <td>-</td>
          );
        } catch (error) {
          return <td>-</td>;
        }
      }
      return (
        <td align="left">
          {row[tableHead?.idLeft]}{" "}
          {tableHead?.filterContent ? tableHead?.filterContent(value) : value}{" "}
          {row[tableHead?.idRight]}
        </td>
      );
  }
}
