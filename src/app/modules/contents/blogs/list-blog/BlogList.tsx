import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { useNavigate, useSearchParams } from "react-router-dom";

import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";

import Spinner from "@base/components/common/spinner/Spinner";
import { swal } from "@base/components/common/alerts/SwalAlert";
import { IBlogResponse } from "../core/models/blog.interface";
import { deleteBlog, fetchBlogs } from "../core/api/blog.request";
import { blogColumns } from "./table/columns";
import BlogListActions from "./table/actions";

const filterPath = "blog";

const BlogList = () => {
  const [blogListResponse, setBlogListResponse] = React.useState<
    PageableResponseModel<IBlogResponse> | undefined
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
    fetchBlogs({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setBlogListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams, optionAction]);
  const handleDelete = (id: number) => {
    swal
      .fire({
        title: "Emin misin?",
        text: "Blok Silinecek, Bunu geri alamazsınız",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteBlog(id)
            .then(() => {
              swal
                .fire({
                  title: "Başarılı!",
                  text: "Bloğu başarıyla sildiniz.",
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
                text: "Blog silinirken bir hata oluştu.",
                icon: "error",
                confirmButtonText: "Tamam",
              });
            });
        }
      });
  };
  const handleEdit = (id: number) => {
    navigate(`/icerikler/bloglar/duzenle/${id}`);
  };

  if (fetchStatus === FetchStatus.IDLE)
    return <Spinner color="red" size="xl" />;

  return (
    <DynamicTable<IBlogResponse>
      title="Blog Kategorileri"
      rows={blogListResponse?.items}
      meta={blogListResponse?.meta}
      filterPath={filterPath}
      tableHeads={blogColumns({
        handleEdit,
        handleDelete,
      })}
      loadStatus={fetchStatus}
      headerActionsComponent={<BlogListActions />}
      searchColumns={[
        {
          id: "title",
          type: "string",
        },
        {
          id: "category.title",
          type: "string",
        },
      ]}
    />
  );
};

export default BlogList;
