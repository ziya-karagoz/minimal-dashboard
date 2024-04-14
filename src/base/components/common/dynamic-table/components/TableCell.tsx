// @ts-nocheck
import React from "react";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import { EColumnType, IColumn, IConditionLogic } from "../core/models";
import { hasPermission } from "../../../../helpers/permissions/permission.helper";
import Avatar from "../../avatars/Avatar";
import Indicator from "../../indicators/Indicator";
import moment from "@base/helpers/enhencers/Moment";
import Badge from "../../badge/Badge";

type TableCellProps<T> = {
  tableHead: IColumn<T>;
  row: T;
};
export default function TableCell<T>({ tableHead, row }: TableCellProps<T>) {
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
      const profileValuePaths = String(tableHead?.id).split(".");
      let profileValue = row;
      try {
        for (const path of profileValuePaths) {
          profileValue = profileValue[path];
        }
      } catch (error) {
        profileValue = undefined;
      }
      return (
        <td className="border-t border-gray-100 align-middle border-l-0 border-r-0 text-sm text-gray-600">
          <Avatar src={profileValue ? profileValue : "/media/avatars/blank.png"} alt="profile" />
        </td>
      );
    case EColumnType.POINT:
      return (
        <td align="left" className="border-t border-gray-100 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-4 ">
          <Indicator color={tableHead?.point?.bg[value]}><span className="text-gray-600 font-normal">{tableHead?.point?.text[value]}</span></Indicator>
        </td>
      );
    case EColumnType.BADGE:
      return (
        <td align="left" className="border-t border-gray-100 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-4 ">

          <Badge color={tableHead?.badge?.bg[value]}>{tableHead?.badge?.text[value]}</Badge>
        </td>
      );

    case EColumnType.OPERATIONS:
      return (
        <td align="left" style={{ width: "15em" }} className="border-t border-gray-100 border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap px-4 py-2 ">
          {tableHead.operations?.map((item, index) => {
            if (item?.conditions?.length) {
              for (const element of item.conditions) {
                if (element.logic === IConditionLogic.INVERSE) {
                  if (row[element.key] !== element.value) {
                    return "";
                  }
                } else if (element.logic === IConditionLogic.STRAIGHT) {
                  if (row[element.key] === element.value) {
                    return "";
                  }
                } else if (element.logic === IConditionLogic.OBJECT_EXIST) {
                  if (Object.keys(row[element.key]).length > 0) {
                    return "";
                  }
                }
              }
            }
            return hasPermission(item?.role) ? (
              <React.Fragment key={index}>
                <Tooltip
                  id={"tooltip-" + index}
                  place="top"
                  content={item?.text}
                />
                <span
                  data-tooltip-id={"tooltip-" + index}
                  key={index}
                  className="inline-flex text-sm items-center justify-center text-primary-500 hover:text-white hover:bg-primary-500 bg-neutral-100 p-3 rounded-md cursor-pointer m-1"
                  onClick={() => {
                    item.handle(row[item?.key ?? "id"]);
                  }}
                >
                  <Icon icon={item?.icon} />
                </span>
              </React.Fragment>
            ) : null;
          })}
        </td>
      );
      break;
    case EColumnType.DATE:
      return (
        <td align="left" className="border-t border-gray-100 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-4 ">{value ? moment(value).format("DD.MM.YYYY, HH:mm:ss") : "-"}</td>
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
            <td align="left" className="border-t border-gray-100 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-4 ">
              {row[tableHead?.idLeft]}{" "}
              {tableHead?.filterContent ? tableHead?.filterContent(data) : data}{" "}
              {row[tableHead?.idRight]}
            </td>
          ) : (
            <td className="border-t border-gray-100 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-4 ">-</td>
          );
        } catch (error) {
          return <td className="border-t border-gray-100 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-4 ">-</td>;
        }
      }
      return (
        <td
          align="left"
          className="border-t border-gray-100 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-600 whitespace-nowrap p-4 "
        >
          {row[tableHead?.idLeft]}{" "}
          {tableHead?.filterContent ? tableHead?.filterContent(value) : value}{" "}
          {row[tableHead?.idRight]}
        </td>
      );
  }
}
