import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchStatus } from "@base/enums/api.enum";
import { ILogResponse } from "../core/models/log.interface";
import { fetchLogs } from "../core/api/log.request";
import { logColumns } from "./table/columns";
import LogListActions from "./table/actions";
import LogDetail from "../log-detail/LogDetail";
import { hasPermission } from "@base/helpers/permissions/permission.helper";
import { ERole } from "@base/enums/role.enum";
import Loader from "@base/layout/components/loader/Loader";
import { exportExcel } from "@app/core/api/app.requests";

const filterPath = "log";

const LogList = () => {
  const [logListResponse, setLogListResponse] = React.useState<
    PageableResponseModel<ILogResponse> | undefined
  >();
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState<number | null>(null);

  const [searchParams] = useSearchParams();
  const skip = searchParams.get("skip");
  const take = searchParams.get("take");
  const sort = searchParams.get("sort");
  const filter = searchParams.get("filter") ?? undefined;

  const handleDetail = (id: number) => {
    setSelect(id);
    setShow(true);
  };
  React.useEffect(() => {
    setFetchStatus(FetchStatus.LOADING);
    fetchLogs({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setLogListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams]);

  if (fetchStatus === FetchStatus.IDLE)
    return <Loader isComponent />;

  return (
    <>
      <DynamicTable<ILogResponse>
        title="Loglar"
        rows={logListResponse?.items}
        meta={logListResponse?.meta}
        filterPath={filterPath}
        tableHeads={logColumns({
          handleDetail,
        })}
        loadStatus={fetchStatus}
        headerActionsComponent={
          <LogListActions
            handleExport={() => {
              exportExcel({
                prefix: filterPath,
                fileName: "Log Kayıtları",
              });
            }}
          />
        }
        searchColumns={[
          {
            id: "title",
            type: "string",
          },
        ]}
      />
      {hasPermission(ERole.LogView) ? (
        <>
          {select !== null && (
            <LogDetail
              select={select}
              show={show}
              handleClose={() => {
                setSelect(null);
                setShow(false);
              }}
            ></LogDetail>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LogList;
