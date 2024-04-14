// @ts-nocheck
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useDebounce } from "@uidotdev/usehooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import {
  EFilterType,
  FilterDropdownType,
  IColumn,
  IFilterField,
  IFilterResponseData,
} from "../core/models";
import { fetchColumnFilter } from "../core/requests";
import { tryParseInt } from "../../../../helpers/methods/methods";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "../../buttons/Button";

type DynamicTableDropdownProps<T> = {
  headCell: IColumn<T>;
  filterPath: string;
  filterField: any;
  setFilterField: any;
  specialFilter?: any;
};

function DynamicTableDropdown<T>({
  headCell,
  filterPath,
  filterField,
  setFilterField,
  specialFilter = null,
}: DynamicTableDropdownProps<T>) {
  const intl = useIntl();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = React.useState<IFilterResponseData[]>([]);
  const [skip, setSkip] = React.useState(1);
  const [take, setTake] = React.useState(20);
  const [hasMore, setHasMore] = React.useState(true);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);
  const labelExists = intl.messages[headCell.label] !== undefined;

  function handleDropdownToggle(isOpen: boolean) {
    setIsDropdownOpen(isOpen);
    if (isOpen || items.length === 0) {
      setHasMore(true);
      fetchColumnFilter({
        path: filterPath,
        skip,
        take,
        sort: undefined,
        status: undefined,
        group: JSON.stringify([
          {
            selector: String(headCell.id),
            search: debouncedSearch,
            filter: specialFilter,
          },
        ]),
      }).then((response: any) => {
        setItems(response.data);
        setTotalCount(response.totalCount);
      });
    } else {
      setItems([]);
      setSkip(1);
      setHasMore(false);
      setTotalCount(0);
    }
  }

  function fetchMoreData() {
    if (items.length >= totalCount) {
      setHasMore(false);
      return;
    } else {
      setSkip(skip + 1);
      fetchColumnFilter({
        path: filterPath,
        skip: skip + 1,
        take,
        sort: undefined,
        status: undefined,
        group: JSON.stringify([
          {
            selector: String(headCell.id),
            search: debouncedSearch,
            filter: specialFilter,
          },
        ]),
      }).then((response: any) => {
        setItems([...items, ...response.data]);
        setTotalCount(response.totalCount);
        if (items.length >= totalCount) {
          setHasMore(false);
        }
      });
    }
  }

  function handleSubmit() {
    // Parse the existing filter parameter from the URL
    let parsedFilter = JSON.parse(searchParams.get("filter")!) ?? [];

    // Check if a filter with the same ID already exists
    const existingFilterIndex = parsedFilter.findIndex(
      (x: IFilterField) => x.id === filterField.id
    );

    if (existingFilterIndex !== -1) {
      // If the filter already exists, update it
      parsedFilter[existingFilterIndex] = filterField;
    } else {
      // If the filter doesn't exist, add it
      parsedFilter.push(filterField);
    }

    const pSearch = searchParams.get("search");

    // Update the search parameters
    //@ts-ignore
    setSearchParams({
      search: pSearch ? pSearch : undefined,
      filter: JSON.stringify(parsedFilter),
    });
  }

  function handleClear() {
    let filter = JSON.parse(searchParams.get("filter")!) ?? [];
    if (filter.length > 0) {
      filter = filter.filter((x: IFilterField) => x.id !== filterField.id);
    }
    const pSearch = searchParams.get("search");
    //@ts-ignore
    setSearchParams({
      search: pSearch ? pSearch : undefined,
      filter: JSON.stringify(filter),
    });
    setFilterField({
      ...filterField,
      selecteds: [],
      min: null,
      max: null,
    });
  }
  // ! Data tarafinda keys.type diye bir ozellik gelmesi gerekiyor tryParseInt hic saglikli degil
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setFilterField({
        ...filterField,
        selecteds: [
          ...filterField.selecteds,
          e.target.value === "true"
            ? true
            : e.target.value === "false"
              ? false
              : tryParseInt(e.target.value),
        ],
      });
    } else {
      setFilterField({
        ...filterField,
        selecteds: filterField.selecteds.filter(
          (x: string | number | boolean) => x.toString() !== e.target.value
        ),
      });
    }
  }

  // select filter search logic
  useEffect(() => {
    if (headCell.filterType === EFilterType.SELECT && isDropdownOpen) {
      setSkip(1);
      setHasMore(true);
      fetchColumnFilter({
        path: filterPath,
        skip: 1,
        take,
        sort: undefined,
        status: undefined,
        group: JSON.stringify([
          {
            selector: String(headCell.id),
            search: debouncedSearch,
            filter: specialFilter,
          },
        ]),
      }).then((response: any) => {
        setItems(response.data);
        setTotalCount(response.totalCount);
      });
    }
  }, [debouncedSearch]);

  return (
    <Dropdown autoClose="outside" onToggle={handleDropdownToggle}>
      <Dropdown.Toggle
        id={`dropdown-${String(headCell.id)}`}
        className="table-dropdown"
      >
        <Icon
          icon="bi:filter"
          className={clsx({
            "text-gray-500":
              filterField.selecteds.length === 0 &&
              filterField.min === null &&
              filterField.max === null,
            "text-primary-500":
              filterField.selecteds.length > 0 ||
              filterField.min !== null ||
              filterField.max !== null,
          })}
        />
      </Dropdown.Toggle>
      {/* z-index: 1000; */}
      <Dropdown.Menu
        className={clsx(
          "bg-white shadow-md rounded-lg p-4 min-w-52 overflow-y-auto max-h-96",
          {
            hidden: !isDropdownOpen,
          }
        )}
      >
        {headCell.filterType === EFilterType.SELECT && (
          <>
            {!headCell.filterDropdownTypes ? (
              <>
                <div className="relative w-full mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Icon
                      icon="ri:search-line"
                      className="w-4 h-4 text-gray-500"
                    />
                  </div>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5"
                    id={`search-${String(headCell.id)}`}
                    name={`search-${String(headCell.id)}`}
                    placeholder={headCell.label}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Select All */}
                <div className="flex items-center mb-4">
                  <input
                    id={`select-all-${String(headCell.id)}`}
                    name={`select-all-${String(headCell.id)}`}
                    value={`select-all-${String(headCell.id)}`}
                    checked={filterField.selecteds.length === items.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilterField({
                          ...filterField,
                          selecteds: items.map((x) => x.key),
                        });
                      } else {
                        setFilterField({
                          ...filterField,
                          selecteds: [],
                        });
                      }
                    }}

                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 accent-primary-500"
                  />
                  <label

                    htmlFor={`select-all-${String(String(headCell.id))}`}
                    className="ms-2 text-sm font-medium text-gray-900 "
                  >
                    Tümünü Seç
                  </label>
                </div>

                <Dropdown.Divider />
                <div id="parent" style={{ height: "200px", overflow: "auto" }}>
                  <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                      <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="primary" />
                      </div>
                    }
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <small> {items.length} kayıt listelendi.</small>
                      </p>
                    }
                    scrollableTarget="parent"
                  >
                    {items.map((item, index) => (
                      <div className="flex items-center mb-4" key={index}>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 accent-primary-500"
                          id={String(item?.key)}
                          name={String(item?.key)}
                          value={item?.key}
                          checked={filterField.selecteds.includes(item?.key)}
                          onChange={handleInputChange}
                        />
                        <label
                          className="ms-2 text-sm font-medium text-gray-900"
                          htmlFor={String(item?.key)}
                        >
                          {String(item?.key)}
                        </label>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </>
            ) : (
              headCell.filterDropdownTypes.map(
                (item: FilterDropdownType, index: number) => (
                  <div className="flex items-center mb-4" key={index}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 accent-primary-500"
                      id={item?.name}
                      name={item?.name}
                      value={item?.value}
                      checked={filterField.selecteds.includes(item?.value)}
                      onChange={handleInputChange}
                    />
                    <label
                      className="ms-2 text-sm font-medium text-gray-900"
                      htmlFor={item?.name}
                    >
                      {item?.label}
                    </label>
                  </div>
                )
              )
            )}
          </>
        )}
        {headCell.filterType === EFilterType.NUMBER && (
          <div className="flex flex-col gap-2">
            <div className="max-w-sm">
              <label className="mb-0" htmlFor={`max-${String(headCell.id)}`}>
                Min {headCell.label}
              </label>
              <input
                id={`min-${String(headCell.id)}`}
                name={`min-${String(headCell.id)}`}
                placeholder={`Min ${headCell.label}`}
                value={filterField.min}
                onChange={(e) =>
                  setFilterField({
                    ...filterField,
                    min: parseInt(e.target.value),
                  })
                }
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"

              />
            </div>
            <div className="max-w-sm">
              <label className="mb-0" htmlFor={`max-${String(headCell.id)}`}>
                Max {headCell.label}
              </label>
              <input
                id={`max-${String(headCell.id)}`}
                name={`max-${String(headCell.id)}`}
                placeholder={`Max ${headCell.label}`}
                value={filterField.max}
                onChange={(e) =>
                  setFilterField({
                    ...filterField,
                    max: parseInt(e.target.value),
                  })
                }
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"

              />
            </div>
          </div>
        )}
        {headCell.filterType === EFilterType.DATE && (
          <div className="flex flex-col gap-2">
            <div className="max-w-sm">
              <label className="mb-0" htmlFor={`min-${String(headCell.id)}`}>
                Başlangıç
              </label>
              <input
                id={`min-${String(headCell.id)}`}
                name={`min-${String(headCell.id)}`}
                placeholder={`Min ${headCell.label}`}
                value={filterField.min}
                onChange={(e) =>
                  setFilterField({ ...filterField, min: e.target.value })
                }
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
            </div>
            <div className="max-w-sm">
              <label className="mb-0" htmlFor={`max-${String(headCell.id)}`}>
                Bitiş
              </label>
              <input
                id={`max-${String(headCell.id)}`}
                name={`max-${String(headCell.id)}`}
                placeholder={`Max ${headCell.label}`}
                value={filterField.max}
                onChange={(e) =>
                  setFilterField({ ...filterField, max: e.target.value })
                }
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
            </div>
          </div>
        )}
        <Dropdown.Divider />
        <Dropdown.Item className="flex justify-start items-center gap-2 mt-2">
          <Button color="red" size="sm" onClick={handleSubmit}>
            Tamam
          </Button>
          <Button color="gray" size="xs" onClick={handleClear}>
            Temizle
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DynamicTableDropdown;
