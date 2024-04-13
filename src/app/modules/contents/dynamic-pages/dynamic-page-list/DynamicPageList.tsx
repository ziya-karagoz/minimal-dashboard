import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import Spinner from "@base/components/common/spinner/Spinner";
import { swal } from "@base/components/common/alerts/SwalAlert";
import { IDynamicPageResponse } from "../core/models/dynamic-page";
import {
  deleteDynamicPage,
  fetchDynamicPages,
} from "../core/api/dynamic-page.resuest";
import { dynamicPageColumns } from "./table/columns";
import DynamicPageListActions from "./table/actions";

const filterPath = "page";

const DynamicPageList = () => {
  const [dynamicPageListResponse, setDynamicPageListResponse] = React.useState<
    PageableResponseModel<IDynamicPageResponse> | undefined
  >();
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );
  const [optionAction, setOptionAction] = React.useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const skip = searchParams.get("skip");
  const take = searchParams.get("take");
  const sort = searchParams.get("sort");
  const filter = searchParams.get("filter") ?? undefined;

  React.useEffect(() => {
    setFetchStatus(FetchStatus.LOADING);
    fetchDynamicPages({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setDynamicPageListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams, optionAction]);
  const handleDelete = (id: number) => {
    swal
      .fire({
        title: "Emin misin?",
        text: "Sayfa Silinecek, Bunu geri alamazsınız",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteDynamicPage(id)
            .then(() => {
              swal
                .fire({
                  title: "Başarılı!",
                  text: "Sayfayı başarıyla sildiniz.",
                  icon: "success",
                  confirmButtonText: "Tamam",
                })
                .then(() => {
                  setOptionAction(`delete_${id}`);
                });
            })
            .catch(() => {
              swal.fire({
                title: "Hata!",
                text: "Sayfa silinirken bir hata oluştu.",
                icon: "error",
                confirmButtonText: "Tamam",
              });
            });
        }
      });
  };
  const handleEdit = (id: number) => {
    navigate(`/icerikler/sayfalar/duzenle/${id}`);
  };

  if (fetchStatus === FetchStatus.IDLE)
    return <Spinner color="red" size="xl" />;

  return (
    <DynamicTable<IDynamicPageResponse>
      title="Sayfalar"
      rows={dynamicPageListResponse?.items}
      meta={dynamicPageListResponse?.meta}
      filterPath={filterPath}
      tableHeads={dynamicPageColumns({
        handleEdit,
        handleDelete,
      })}
      loadStatus={fetchStatus}
      headerActionsComponent={<DynamicPageListActions />}
      searchColumns={[
        {
          id: "title",
          type: "string",
        },
      ]}
    />
  );
};

export default DynamicPageList;
