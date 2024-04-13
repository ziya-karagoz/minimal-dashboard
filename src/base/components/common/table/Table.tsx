/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DataGrid, {
  Column,
  Toolbar,
  Item,
  Paging,
  Pager,
  Selection,
  MasterDetail,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "./table.css";
import api from "@base/helpers/enhencers/Interceptor";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";

interface ITable {
  url: string;
  urlParams?: any;
  uniqueKey?: string;
  columns?: IColumns[];
  tableInfo?: string;
  tableTitle?: string;
  filterValue?: string;
  showBorder?: boolean;
  isSelectMode?: boolean;
  searchText?: string;
  showDataCount?: boolean;
  showMasterDetail?: boolean;
  detailTemplate?: any;
}

interface IColumns {
  dataField?: string;
  caption: string;
  badgeMap?: Record<string, JSX.Element>;
  buttons?: (row: any) => JSX.Element[];
  dataType: "string" | "date" | "badge" | "badge_array" | "progress" | "string_array" | "buttons" | "image" | "object" | "all_data";
  options?: {
    className?: string;
    format?(cell: any): string | JSX.Element;
    copiable?: boolean;
    truncate?: number;
  };
  allowFiltering?: boolean;
  allowHeaderFiltering?: boolean;
}

export const Table = ({
  url,
  urlParams,
  uniqueKey,
  columns,
  tableInfo,
  tableTitle,
  filterValue,
  showBorder,
  isSelectMode,
  searchText,
  showDataCount,
  showMasterDetail,
  detailTemplate,
}: ITable) => {
  function isNotEmpty(value: any) {
    return value !== undefined && value !== null && value !== "";
  }
  const allowedPageSizes = [5, 10, 20, 50, 100];
  const store = new CustomStore({
    key: uniqueKey ?? "id",
    load(loadOptions: any) {
      let params = "?";
      if (urlParams) {
        Object.keys(urlParams).forEach((o, i) => {
          params += `${o}=${JSON.stringify(Object.values(urlParams)[i])}&`;
        });
      }
      [
        "skip",
        "take",
        "requireTotalCount",
        "requireGroupCount",
        "sort",
        "search",
        "filter",
        "totalSummary",
        "group",
        "groupSummary",
      ].forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
          params += `${i}=${JSON.stringify(loadOptions[i])}&`;
        }
      });
      if (searchText) params += `search=${encodeURIComponent(searchText)}&`;
      params = params.slice(0, -1);

      return tableFetch(`${url ?? ""}${params}`)
        .then((response: any) => response)
        .then((data: any) => {
          return {
            data: data.data,
            totalCount: parseInt(data?.meta?.totalCount ?? data.totalCount, 10),
            summary: data?.meta?.summary,
            groupCount: data?.meta?.groupCount,
          };
        });
    },
  });

  async function tableFetch(url: string) {
    const data = await api.get(url);
    return data;
  }
  const successRateComp = (cell: any) => {
    let colorProgress = "#FE3C47";
    if (cell.data.value > 75) {
      colorProgress = "#65FAA5";
    } else if (cell.data.value > 50) {
      colorProgress = "#F2E248";
    }
    return (
      <div className="progress" style={{ position: "relative" }}>
        <div
          style={{
            width: `${cell.data.value}%`,
            backgroundColor: colorProgress,
          }}
        >
          {" "}
        </div>
        <span
          style={{
            position: "absolute",
            left: 0,
            top: -1,
            right: 0,
            fontSize: 12,
            textAlign: "center",
            color: "#006A33",
          }}
        >
          {" "}
          {`%${Math.floor(cell.data.value)}`}{" "}
        </span>
      </div>
    );
  };
  const customCellComponent = (cell: any, col: any) => {

    if (col.dataType === "all_data") {
      return col.options.format(cell.data.data);
    }

    if (col.dataType === "object") {
      // provide the cell data for the format function
      return col.options.format(cell.data.data[col.dataField]);
    }

    if (col.dataType === "image") {
      return <img
        src={cell.data.text}
        alt="img"
        className={col?.options?.className}
      />;
    }

    if (col.dataType === "badge_array") {
      return <div className="flex flex-wrap gap-1">
        {cell.data.data[col.dataField].map((i: string, index: number) => (
          <React.Fragment key={index}>
            {col.badgeMap[i]}
          </React.Fragment >
        ))}
      </div>
    }

    if (col.dataType === "badge") {
      return col.badgeMap[cell.data.data[col.dataField]];
    }
    if (col.dataType === "string_array") {
      const arr = cell.data.data[col.dataField];
      return arr
        .map((i: string) => i.charAt(0).toUpperCase() + i.slice(1))
        .join(", ");
    }
    if (col.dataType === "date") {
      if (col.format === "MM-dd-yyyy HH:mm") {
        const formattedText = cell.data.text;
        return (
          <div className="d-flex flex-column text-center">
            <div className="flex-1">{formattedText.split(" ")[0]}</div>
            <div>
              <strong style={{ fontSize: ".7rem" }}>
                {formattedText.split(" ")[1]}
              </strong>
            </div>
          </div>
        );
      }
      return cell.data.text;
    }
    if (col.dataType === "buttons") {
      return col.buttons(cell);
    }

    switch (col.dataType) {
      case "progress":
        return successRateComp(cell);
      default:
        // consider copiable option
        return col.options?.copiable ? (
          <div className="flex items-center">
            <span >{col.options?.truncate ? cell.data.text.substring(0, col.options.truncate) + "..." : cell.data.text}</span>
            <Icon
              icon="akar-icons:copy"
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(cell.data.text);
                toast.success('Successfully copied!')
              }}
            />
          </div>
        ) : (
          col.options?.truncate ? cell.data.text.substring(0, col.options.truncate) + "..." : cell.data.text
        );
    }
  };
  const renderTable = () => (
    <DataGrid
      dataSource={store}
      showBorders
      loadPanel={{ enabled: false }}
      remoteOperations
      filterValue={filterValue}
      className={showBorder ? "showBorder" : "showBorder"}
      noDataText="No data"
      // headerFilter={{visible:true}}
      // filterRow={{visible:true}}
      allowColumnResizing
      showColumnHeaders={true} // Sütun başlıklarını göster
      showRowLines={true} // Satır çizgilerini göster
      columnAutoWidth={true} // Sütunların otomatik genişlik ayarını kullan
      columnResizingMode="nextColumn" // Sütun boyutlandırmayı etkinleştir (isteğe bağlı)
      columnMinWidth={100} // Minimum sütun genişliği (isteğe bağlı)
    >
      {/* <HeaderFilter visible></HeaderFilter> */}
      {/* <FilterRow visible></FilterRow> */}
      {isSelectMode && (
        <Selection
          mode="multiple"
          selectAllMode="page"
          showCheckBoxesMode="always"
        />
      )}
      {columns &&
        columns.map((col: any, index: number) => (
          <Column
            sortOrder={col.sortOrder ?? null}
            allowFiltering={col.allowFiltering ?? false}
            allowHeaderFiltering={col.allowHeaderFiltering ?? false}
            format={col.format}
            allowSorting={!showDataCount}
            visible={col.visible}
            key={index}
            caption={col.caption}
            dataField={col.dataField}
            dataType={col.dataType}
            cellComponent={(cell) => customCellComponent(cell, col)}
          />
        ))}
      <MasterDetail enabled={showMasterDetail} component={detailTemplate} />

      {tableTitle || tableInfo ? (
        <Toolbar>
          <Item location="before">
            <div className="pt-3">
              <h3 className="count">{tableTitle ?? ""}</h3>
              <span className="h6 fw-light">{tableInfo ?? ""}</span>
            </div>
          </Item>
        </Toolbar>
      ) : null}

      <Paging defaultPageSize={5} />
      <Pager visible showPageSizeSelector allowedPageSizes={allowedPageSizes} />
    </DataGrid>
  );
  const memoized = React.useMemo(
    () => renderTable(),
    [url, searchText, urlParams]
  );
  return memoized;
};
