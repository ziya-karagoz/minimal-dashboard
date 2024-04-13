import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchStatus } from "@base/enums/api.enum";
import { adminColumns } from "./table/columns";
import { deleteAdmin, fetchAdmins } from "../core/api/admin.request";
import { IAdminResponseP } from "../core/models/admin.interface";
import AdminListActions from "./table/actions";
import Loader from "@base/layout/components/loader/Loader";
import toast from "react-hot-toast";
import { swal } from "@base/components/common/alerts/SwalAlert";
import UpdateAdminPassword from "./modals/UpdateAdminPassword";
import { exportExcel } from "@app/core/api/app.requests";
const filterPath = "admin";

const AdminList = () => {
    const [selectedAdminId, setSelectedAdminId] = React.useState<
        number | undefined
    >(undefined);
    const [passwordResetModal, setPasswordResetModal] =
        React.useState<boolean>(false);
    const [tableAction, setTableAction] = React.useState<string>("");
    const [adminListResponse, setAdminListResponse] = React.useState<
        PageableResponseModel<IAdminResponseP> | undefined
    >();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";

    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchAdmins({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        })
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setAdminListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <React.Fragment>
            <DynamicTable<IAdminResponseP>
                title="Yöneticiler"
                rows={adminListResponse?.items}
                meta={adminListResponse?.meta}
                filterPath={filterPath}
                tableHeads={adminColumns({
                    handleEdit: (id: number) => {
                        navigate(`/yoneticiler/duzenle/${id}`);
                    },
                    handleDelete: (id: number) => {
                        swal
                            .fire({
                                title: "Yöneticiyı silmek istediğinize emin misiniz?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Evet",
                                cancelButtonText: "Hayır",
                            })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    deleteAdmin(id).then(() => {
                                        toast.success("Yönetici başarıyla silindi");
                                        setTableAction(`delete_${id}`);
                                    });
                                }
                            });
                    },
                    handleUpdatePassword: (id: number) => {
                        setPasswordResetModal(true);
                        setSelectedAdminId(id);
                    },
                    handleAdminSetting: (id: number) => {
                        navigate(`/yoneticiler/yetki/${id}`);
                    },
                })}
                loadStatus={fetchStatus}
                headerActionsComponent={
                    <AdminListActions
                        handleExport={() => {
                            exportExcel({
                                prefix: filterPath,
                                fileName: "Yöneticiler",
                            });
                        }}
                    />
                }
                searchColumns={[
                    {
                        id: "first_name",
                        type: "string",
                    },
                    {
                        id: "last_name",
                        type: "string",
                    },
                ]}
            />

            <UpdateAdminPassword
                adminId={selectedAdminId}
                open={passwordResetModal}
                onClose={() => setPasswordResetModal(false)}
            />
        </React.Fragment>
    );
};

export default AdminList;
