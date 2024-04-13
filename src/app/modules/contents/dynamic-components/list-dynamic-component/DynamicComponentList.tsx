import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import Spinner from "@base/components/common/spinner/Spinner";
import { IDynamicComponentResponse } from "../core/models/dynamic-component.interface";
import { fetchDynamicComponents } from "../core/api/dynamic-component.request";
import { dynamicComponentColumns } from "./table/columns";
import DynamicComponentListActions from "./table/actions";

const filterPath = "component";

const DynamicComponentList = () => {
  const [dynamicComponentListResponse, setDynamicComponentListResponse] =
    React.useState<
      PageableResponseModel<IDynamicComponentResponse> | undefined
    >();
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const skip = searchParams.get("skip");
  const take = searchParams.get("take");
  const sort = searchParams.get("sort");
  const filter = searchParams.get("filter") ?? undefined;

  React.useEffect(() => {
    setFetchStatus(FetchStatus.LOADING);
    fetchDynamicComponents({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setDynamicComponentListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams]);

  const handleEdit = (id: number) => {
    navigate(`/icerikler/bilesenler/duzenle/${id}`);
  };

  if (fetchStatus === FetchStatus.IDLE)
    return <Spinner color="red" size="xl" />;

  return (
    <DynamicTable<IDynamicComponentResponse>
      title="Blog Kategorileri"
      rows={dynamicComponentListResponse?.items}
      meta={dynamicComponentListResponse?.meta}
      filterPath={filterPath}
      tableHeads={dynamicComponentColumns({
        handleEdit,
      })}
      loadStatus={fetchStatus}
      headerActionsComponent={<DynamicComponentListActions />}
      searchColumns={[
        {
          id: "title",
          type: "string",
        },
      ]}
    />
  );
};

export default DynamicComponentList;
