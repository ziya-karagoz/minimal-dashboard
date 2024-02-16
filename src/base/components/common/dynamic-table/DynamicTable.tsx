import React from "react";
import { Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FetchStatus } from "../../../enums/api.enum";
import TableShowing from "./components/TableShowing";
import { useDebounce } from "@uidotdev/usehooks";
import Pagination from "./components/Pagination";
import Empty from "./components/Empty";
import TableLoader from "./components/Loader";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import { IColumn, TableMeta } from "./core/models";
import { FormattedMessage, useIntl } from "react-intl";
import Form from "react-bootstrap/Form";

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
  const intl = useIntl();

  const debouncedSearch = useDebounce(search, 500);

  const [itemCount, setItemCount] = React.useState(5);

  function handleChangeItemCount(event: React.ChangeEvent<HTMLSelectElement>) {
    const path = `${pathname}?skip=${1}&take=${event.target.value}${
      searchParams.get("sort") ? `&sort=${searchParams.get("sort")}` : ""
    }${
      searchParams.get("filter") ? `&filter=${searchParams.get("filter")}` : ""
    }`;
    setSkip(1);
    setItemCount(parseInt(event.target.value));
    navigate(path);
  }

  //table skip change
  const handleChangePage = (newPage: number) => {
    const path = `${pathname}?${newPage ? `skip=${newPage}` : `skip=1`}${
      searchParams.get("take") ? `&take=${searchParams.get("take")}` : "&take=5"
    }${searchParams.get("sort") ? `&sort=${searchParams.get("sort")}` : ""}${
      searchParams.get("search") ? `&search=${searchParams.get("search")}` : ""
    }${
      searchParams.get("filter") ? `&filter=${searchParams.get("filter")}` : ""
    }`;

    navigate(path);
    setSkip(newPage);
  };

  //table sort change
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    if (property !== undefined) {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
      const path = `${pathname}?skip=${skip}${
        searchParams.get("take") ? `&take=${searchParams.get("take")}` : ""
      }&sort=${property},${order}${
        searchParams.get("search")
          ? `&search=${searchParams.get("search")}`
          : ""
      }${
        searchParams.get("status")
          ? `&status=${searchParams.get("status")}`
          : ""
      }${
        searchParams.get("filter")
          ? `&filter=${searchParams.get("filter")}`
          : ""
      }`;

      navigate(path);
    }
  };

  return (
    <Container>
      <Row className="mt-4 mx-auto">
        <Col>
          <h4>
            {" "}
            <FormattedMessage id={title} />
          </h4>
        </Col>
      </Row>
      <Row className="mt-4 mx-auto">
        <Col xs={12} md={6} lg={3} className="wv-50">
          <InputGroup className="wv-50">
            <InputGroup.Text style={{ fontSize: "12px" }}>
              <i className="tio-search" />
            </InputGroup.Text>
            <Form.Control
              type="search"
              value={search ?? ""}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder={intl.formatMessage({
                id: "DYNAMICTABLE.ACTIONS.SEARCH",
              })}
              aria-label="Arama Yap"
            />
          </InputGroup>
        </Col>
        <Col
          xs={12}
          md={6}
          lg={9}
          className="wv-50 d-flex mt-2 mt-lg-0 mt-md-0 align-items-center justify-content-lg-end justify-content-md-end justify-content-between gap-2"
        >
          {headerActionsComponent}
        </Col>
      </Row>
      <Row className="mt-4 mx-auto pb-1 rounded-3 bg-soft">
        <Col>
          {loadStatus === FetchStatus.SUCCEEDED ? (
            <div className="table-responsive rounded-4 p-4">
              <table className="table">
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
            </div>
          ) : (
            <TableLoader />
          )}
        </Col>
      </Row>
      <Row className="mt-4 mx-auto">
        <Col className="d-flex justify-content-between">
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
        </Col>
      </Row>
    </Container>
  );
}

export default DynamicTable;
