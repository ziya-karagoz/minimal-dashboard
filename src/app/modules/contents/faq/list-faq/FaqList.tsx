import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { useNavigate, useSearchParams } from "react-router-dom";

import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import Spinner from "@base/components/common/spinner/Spinner";
import { swal } from "@base/components/common/alerts/SwalAlert";
import { IFaqResponse } from "../core/models/faq.interface";
import { deleteFaq, fetchFaqs } from "../core/api/faq.request";
import { faqColumns } from "./table/columns";
import FaqListActions from "./table/actions";

const filterPath = "faq";

const FaqList = () => {
  const [faqListResponse, setFaqListResponse] = React.useState<
    PageableResponseModel<IFaqResponse> | undefined
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
    fetchFaqs({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setFaqListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams, optionAction]);
  const handleDelete = (id: number) => {
    swal
      .fire({
        title: "Emin misin?",
        text: "SSS Silinecek, Bunu geri alamazsınız",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteFaq(id)
            .then(() => {
              swal
                .fire({
                  title: "Başarılı!",
                  text: "SSS'i  başarıyla sildiniz.",
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
                text: "SSS silinirken bir hata oluştu.",
                icon: "error",
                confirmButtonText: "Tamam",
              });
            });
        }
      });
  };
  const handleEdit = (id: number) => {
    navigate(`/icerikler/sorular/duzenle/${id}`);
  };

  if (fetchStatus === FetchStatus.IDLE)
    return <Spinner color="red" size="xl" />;

  return (
    <DynamicTable<IFaqResponse>
      title="SSS"
      rows={faqListResponse?.items}
      meta={faqListResponse?.meta}
      filterPath={filterPath}
      tableHeads={faqColumns({
        handleEdit,
        handleDelete,
      })}
      loadStatus={fetchStatus}
      headerActionsComponent={<FaqListActions />}
      searchColumns={[
        {
          id: "title",
          type: "string",
        },
      ]}
    />
  );
};

export default FaqList;
