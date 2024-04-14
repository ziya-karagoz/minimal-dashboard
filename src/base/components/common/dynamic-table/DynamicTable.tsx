import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FetchStatus } from "../../../enums/api.enum";
import TableShowing from "./components/TableShowing";
import Pagination from "./components/Pagination";
import Empty from "./components/Empty";
import TableLoader from "./components/Loader";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import { IColumn, TableMeta } from "./core/models";
import { Icon } from "@iconify/react/dist/iconify.js";
import { debounce } from "lodash";

type DynamicTableProps<T> = {
  title: string;
  rows?: T[];
  meta?: TableMeta;
  loadStatus?: FetchStatus;
  filterPath?: string;
  tableHeads: IColumn<T>[];
  headerActionsComponent?: React.ReactNode;
  searchColumns?: any[];
};

function DynamicTable<T>({
  title,
  rows,
  loadStatus,
  meta,
  filterPath,
  tableHeads,
  headerActionsComponent,
  searchColumns,
}: DynamicTableProps<T>) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Component States
  const [orderBy, setOrderBy] = React.useState("name");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [skip, setSkip] = React.useState(1);
  const [search, setSearch] = React.useState<string | null>(
    searchParams.get("search")
  );


  const debounceFn = React.useCallback(debounce(handleDebounce, 500), []);

  function handleDebounce(inputValue: string) {
    let filter = JSON.parse(searchParams.get("filter") ?? "[]");
    let globalSearchFilter = {
      id: "global_search",
      type: "SEARCH",
      value: inputValue,
      columns: searchColumns,
    };
    if (filter.find((x: any) => x.id === "global_search")) {
      filter = filter.filter((x: any) => x.id !== "global_search");
    }
    if (inputValue) filter.push(globalSearchFilter);

    setSkip(1);
    const path = `${pathname}?skip=${1}&take=${itemCount}${searchParams.get("sort") ? `&sort=${searchParams.get("sort")}` : ""
      }${searchParams.get("status") ? `&status=${searchParams.get("status")}` : ""
      }${`&filter=${JSON.stringify(filter)}`}`;
    navigate(path);
  }

  const [itemCount, setItemCount] = React.useState(parseInt(searchParams.get("take") ?? "50"));

  function handleChangeItemCount(event: React.ChangeEvent<HTMLSelectElement>) {
    const path = `${pathname}?skip=${1}&take=${event.target.value}${searchParams.get("sort") ? `&sort=${searchParams.get("sort")}` : ""
      }${searchParams.get("filter") ? `&filter=${searchParams.get("filter")}` : ""
      }`;
    setSkip(1);
    setItemCount(parseInt(event.target.value));
    navigate(path);
  }

  //table skip change
  const handleChangePage = (newPage: number) => {
    const path = `${pathname}?${newPage ? `skip=${newPage}` : `skip=1`}${searchParams.get("take") ? `&take=${searchParams.get("take")}` : "&take=5"
      }${searchParams.get("sort") ? `&sort=${searchParams.get("sort")}` : ""}${searchParams.get("search") ? `&search=${searchParams.get("search")}` : ""
      }${searchParams.get("filter") ? `&filter=${searchParams.get("filter")}` : ""
      }`;

    navigate(path);
    setSkip(newPage);
  };

  //table sort change
  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: string
  ) => {
    if (property !== undefined) {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
      const path = `${pathname}?skip=${skip}${searchParams.get("take") ? `&take=${searchParams.get("take")}` : ""
        }&sort=${property},${order}${searchParams.get("search")
          ? `&search=${searchParams.get("search")}`
          : ""
        }${searchParams.get("status")
          ? `&status=${searchParams.get("status")}`
          : ""
        }${searchParams.get("filter")
          ? `&filter=${searchParams.get("filter")}`
          : ""
        }`;

      navigate(path);
    }
  };


  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow border border-gray-50">
        <div className="p-4 flex flex-wrap w-full items-center justify-between">
          <div className="flex flex-col">
            <h4 className="font-semibold text-black text-lg">{title}</h4>
          </div>
          <div className="flex flex-col md:flex-row justify-end">
            <div className="flex flex-col w-full md:w-1/3">
              <div className="">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Icon icon="mingcute:search-line" className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    onChange={(e: any) => {
                      setSearch(e.target.value);
                      debounceFn(e.target.value);
                    }}
                    placeholder={"Ara..."}
                    value={search ?? ""}
                    type="search"
                    id="default-search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div
              className="w-2/3 flex mt-2 lg:mt-0 md:mt-0 items-center md:justify-center justify-start gap-2 flex-wrap
"
            >
              {headerActionsComponent}
            </div>
          </div>
        </div>


        <div className="flex flex-wrap mx-auto pb-1 rounded-md bg-white">
          <div className="min-h-[500px] overflow-x-auto w-full fancy-scrollbar">
            <div className="flex flex-col">
              {loadStatus === FetchStatus.SUCCEEDED ? (
                <table className="items-center bg-transparent w-full border-collapse ">
                  <TableHead<T>
                    filterPath={filterPath}
                    order={order}
                    orderBy={orderBy}
                    headLabel={tableHeads}
                    onRequestSort={handleRequestSort}
                  />
                  {rows?.length ? (
                    <TableBody<T> tableHeads={tableHeads} rows={rows} />
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={tableHeads.length}>
                          <Empty />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              ) : (
                <TableLoader />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto pb-1 px-4 rounded-md bg-white border-t border-gray-50 pt-4">
          <div className="flex flex-col md:flex-row justify-between w-full gap-4 mb-4">
            {meta ? (
              <React.Fragment>
                <TableShowing
                  meta={meta}
                  handleChangeItemCount={handleChangeItemCount}
                />
                <Pagination
                  count={meta?.totalPages}
                  onChange={handleChangePage}
                  defaultPage={meta?.currentPage ? meta?.currentPage : 1}
                  totalPages={meta.totalPages}
                />
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DynamicTable;
