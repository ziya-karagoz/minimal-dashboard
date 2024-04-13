import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { useNavigate, useSearchParams } from "react-router-dom";

import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import Spinner from "@base/components/common/spinner/Spinner";
import { swal } from "@base/components/common/alerts/SwalAlert";
import { IContractResponse } from "../core/models/contract.interface";
import { deleteContract, fetchContracts } from "../core/api/contract.request";
import { contractColumns } from "./table/columns";
import ContractListActions from "./table/actions";

const filterPath = "contract";

const ContractList = () => {
  const [contractListResponse, setContractListResponse] = React.useState<
    PageableResponseModel<IContractResponse> | undefined
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
    fetchContracts({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setContractListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams, optionAction]);
  const handleDelete = (id: number) => {
    swal
      .fire({
        title: "Emin misin?",
        text: "Sözleşme Silinecek, Bunu geri alamazsınız",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteContract(id)
            .then(() => {
              swal
                .fire({
                  title: "Başarılı!",
                  text: "Sözleşmeyi başarıyla sildiniz.",
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
                text: "Sözleşme silinirken bir hata oluştu.",
                icon: "error",
                confirmButtonText: "Tamam",
              });
            });
        }
      });
  };
  const handleEdit = (id: number) => {
    navigate(`/icerikler/sozlesmeler/duzenle/${id}`);
  };

  if (fetchStatus === FetchStatus.IDLE)
    return <Spinner color="red" size="xl" />;

  return (
    <DynamicTable<IContractResponse>
      title="Sözleşmeler"
      rows={contractListResponse?.items}
      meta={contractListResponse?.meta}
      filterPath={filterPath}
      tableHeads={contractColumns({
        handleEdit,
        handleDelete,
      })}
      loadStatus={fetchStatus}
      headerActionsComponent={<ContractListActions />}
      searchColumns={[
        {
          id: "title",
          type: "string",
        },
      ]}
    />
  );
};

export default ContractList;
