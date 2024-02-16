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
            "text-secondary":
              filterField.selecteds.length === 0 &&
              filterField.min === null &&
              filterField.max === null,
            "text-primary":
              filterField.selecteds.length > 0 ||
              filterField.min !== null ||
              filterField.max !== null,
          })}
        />
      </Dropdown.Toggle>
      {/* z-index: 1000; */}
      <Dropdown.Menu>
        {headCell.filterType === EFilterType.SELECT && (
          <>
            {!headCell.filterDropdownTypes ? (
              <>
                <div className="form-group dropdown-item">
                  <input
                    type="text"
                    className="form-control"
                    id={`search-${String(headCell.id)}`}
                    name={`search-${String(headCell.id)}`}
                    placeholder={
                      intl.formatMessage({
                        id: labelExists ? headCell.label : "",
                      }) +
                      " " +
                      intl.formatMessage({
                        id: "DYNAMICTABLE.DROPDOWN.SEARCH",
                      })
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Dropdown.Divider />
                {/* Select All */}
                <div className="form-group dropdown-item">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
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
                    />
                    <label
                      className="custom-control-label text-muted"
                      htmlFor={`select-all-${String(String(headCell.id))}`}
                    >
                      <FormattedMessage id="DYNAMICTABLE.DROPDOWN.ALL" />
                    </label>
                  </div>
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
                      <div className="form-group dropdown-item" key={index}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={String(item?.key)}
                            name={String(item?.key)}
                            value={item?.key}
                            checked={filterField.selecteds.includes(item?.key)}
                            onChange={handleInputChange}
                          />
                          <label
                            className="custom-control-label text-muted"
                            htmlFor={String(item?.key)}
                          >
                            {String(item?.key)}
                          </label>
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </>
            ) : (
              headCell.filterDropdownTypes.map(
                (item: FilterDropdownType, index: number) => (
                  <div className="form-group dropdown-item" key={index}>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={item?.name}
                        name={item?.name}
                        value={item?.value}
                        checked={filterField.selecteds.includes(item?.value)}
                        onChange={handleInputChange}
                      />
                      <label
                        className="custom-control-label text-muted"
                        htmlFor={item?.name}
                      >
                        {item?.label}
                      </label>
                    </div>
                  </div>
                )
              )
            )}
          </>
        )}
        {headCell.filterType === EFilterType.NUMBER && (
          <div className="form-group dropdown-item">
            <label className="mb-0" htmlFor={`max-${String(headCell.id)}`}>
              Min {headCell.label}
            </label>
            <input
              type="number"
              className="form-control"
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
            />
            <label className="mb-0 mt-4" htmlFor={`max-${String(headCell.id)}`}>
              Max {headCell.label}
            </label>
            <input
              type="number"
              className="form-control"
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
            />
          </div>
        )}
        {headCell.filterType === EFilterType.DATE && (
          <div className="form-group dropdown-item">
            <label
              className="mb-0 text-muted"
              htmlFor={`max-${String(headCell.id)}`}
            >
              {<FormattedMessage id="DYNAMICTABLE.DROPDOWN.STARTEDLABEL" />}{" "}
              {<FormattedMessage id="DYNAMICTABLE.DROPDOWN.DATE" />}
            </label>
            <input
              type="date"
              className="form-control"
              id={`min-${String(headCell.id)}`}
              name={`min-${String(headCell.id)}`}
              placeholder={`Min ${headCell.label}`}
              value={filterField.min}
              onChange={(e) =>
                setFilterField({ ...filterField, min: e.target.value })
              }
            />
            <label
              className="mb-0 mt-4 text-muted"
              htmlFor={`max-${String(headCell.id)}`}
            >
              {<FormattedMessage id="DYNAMICTABLE.DROPDOWN.CLOSEDLABEL" />}{" "}
              {<FormattedMessage id="DYNAMICTABLE.DROPDOWN.DATE" />}
            </label>
            <input
              type="date"
              className="form-control"
              id={`max-${String(headCell.id)}`}
              name={`max-${String(headCell.id)}`}
              placeholder={`Max ${headCell.label}`}
              value={filterField.max}
              onChange={(e) =>
                setFilterField({ ...filterField, max: e.target.value })
              }
            />
          </div>
        )}
        <Dropdown.Divider />
        <Dropdown.Item>
          <button className="btn btn-primary me-2" onClick={handleSubmit}>
            <FormattedMessage id="DYNAMICTABLE.DROPDOWN.SUBMİT" />
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            <FormattedMessage id="DYNAMICTABLE.DROPDOWN.CLEAR" />
          </button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DynamicTableDropdown;
