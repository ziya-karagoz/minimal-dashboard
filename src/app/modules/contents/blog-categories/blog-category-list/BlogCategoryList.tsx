import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { IBlogCategoryResponse } from "../core/models/blog-category.interface";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteBlogCategory,
  fetchBlogCategories,
} from "../core/api/blog-category.request";
import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import { blogCategoryColumns } from "./table/actions";
import BlogListActions from "./table/columns";
import Spinner from "@base/components/common/spinner/Spinner";
import { swal } from "@base/components/common/alerts/SwalAlert";

const filterPath = "blog/module/category";

const BlogCategoryList = () => {
  const [blogCategoryListResponse, setBlogCategoryListResponse] =
    React.useState<PageableResponseModel<IBlogCategoryResponse> | undefined>();
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
    fetchBlogCategories({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      sort: sort ? sort : undefined,
      filter: filter ? filter : undefined,
    })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setBlogCategoryListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [searchParams, optionAction]);
  const handleDelete = (id: number) => {
    swal
      .fire({
        title: "Emin misin?",
        text: "Blog Kategorisi Silinecek, Bunu geri alamazsınız",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteBlogCategory(id)
            .then(() => {
              swal
                .fire({
                  title: "Başarılı!",
                  text: "Blog kategorisini başarıyla sildiniz.",
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
                text: "Blog kategorisi silinirken bir hata oluştu.",
                icon: "error",
                confirmButtonText: "Tamam",
              });
            });
        }
      });
  };
  const handleEdit = (id: number) => {
    navigate(`/icerikler/blog-kategorileri/duzenle/${id}`);
  };

  if (fetchStatus === FetchStatus.IDLE)
    return <Spinner color="red" size="xl" />;

  return (
    <DynamicTable<IBlogCategoryResponse>
      title="Blog Kategorileri"
      rows={blogCategoryListResponse?.items}
      meta={blogCategoryListResponse?.meta}
      filterPath={filterPath}
      tableHeads={blogCategoryColumns({
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
      ]}
    />
  );
};

export default BlogCategoryList;
