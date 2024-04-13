import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { ICampaignResponse } from "../core/models/campaign.interface";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { useNavigate, useSearchParams } from "react-router-dom";

import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import CampaignListActions from "./table/actions";
import { campaignColumns } from "./table/columns";
import { swal } from "@base/components/common/alerts/SwalAlert";
import { deleteCampaign, fetchCampaigns } from "../core/api/campaign.request";
import Loader from "@base/layout/components/loader/Loader";

const filterPath = "campaign";

const CampaignList = () => {
  const [campaignListResponse, setCampaignListResponse] = React.useState<
    PageableResponseModel<ICampaignResponse> | undefined
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
    fetchCampaigns({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setCampaignListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams, optionAction]);
  const handleDelete = (id: number) => {
    swal
      .fire({
        title: "Emin misin?",
        text: "Kampanya Silinecek, Bunu geri alamazsınız",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCampaign(id)
            .then(() => {
              swal
                .fire({
                  title: "Başarılı!",
                  text: "Kampanyayı başarıyla sildiniz.",
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
                text: "Kampanya silinirken bir hata oluştu.",
                icon: "error",
                confirmButtonText: "Tamam",
              });
            });
        }
      });
  };
  const handleEdit = (id: number) => {
    navigate(`/kampanyalar/duzenle/${id}`);
  };

  if (fetchStatus !== FetchStatus.SUCCEEDED)
    return <Loader isComponent />;

  return (
    <DynamicTable<ICampaignResponse>
      title="Kampanyalar"
      rows={campaignListResponse?.items}
      meta={campaignListResponse?.meta}
      filterPath={filterPath}
      tableHeads={campaignColumns({
        handleEdit,
        handleDelete,
      })}
      loadStatus={fetchStatus}
      headerActionsComponent={<CampaignListActions />}
      searchColumns={[
        {
          id: "title",
          type: "string",
        },
      ]}
    />
  );
};

export default CampaignList;
