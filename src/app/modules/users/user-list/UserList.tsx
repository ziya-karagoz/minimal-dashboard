import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchStatus } from "@base/enums/api.enum";
import { userColumns } from "./table/columns";
import { deleteUser, fetchUsers } from "../core/api/user.request";
import { IUserResponseP } from "../core/models/user.interface";
import UserListActions from "./table/actions";
import Loader from "@base/layout/components/loader/Loader";
import toast from "react-hot-toast";
import { swal } from "@base/components/common/alerts/SwalAlert";
import UpdateUserPassword from "./modals/UpdateUserPassword";
import { exportExcel } from "@app/core/api/app.requests";
const filterPath = "user";

const UserList = () => {
    const [selectedUserId, setSelectedUserId] = React.useState<
        number | undefined
    >(undefined);
    const [passwordResetModal, setPasswordResetModal] =
        React.useState<boolean>(false);
    const [tableAction, setTableAction] = React.useState<string>("");
    const [userListResponse, setUserListResponse] = React.useState<
        PageableResponseModel<IUserResponseP> | undefined
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
        fetchUsers({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        })
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setUserListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <React.Fragment>
            <DynamicTable<IUserResponseP>
                title="Üyeler"
                rows={userListResponse?.items}
                meta={userListResponse?.meta}
                filterPath={filterPath}
                tableHeads={userColumns({
                    handleEdit: (id: number) => {
                        navigate(`/kullanicilar/duzenle/${id}`);
                    },
                    handleDelete: (id: number) => {
                        swal
                            .fire({
                                title: "Kullanıcıyı silmek istediğinize emin misiniz?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Evet",
                                cancelButtonText: "Hayır",
                            })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    deleteUser(id).then(() => {
                                        toast.success("Kullanıcı başarıyla silindi");
                                        setTableAction(`delete_${id}`);
                                    });
                                }
                            });
                    },
                    handleUpdatePassword: (id: number) => {
                        setPasswordResetModal(true);
                        setSelectedUserId(id);
                    },
                    handleUserSetting: (id: number) => {
                        navigate(`/kullanicilar/yetki/${id}`);
                    },
                })}
                loadStatus={fetchStatus}
                headerActionsComponent={
                    <UserListActions
                        handleExport={() => {
                            exportExcel({
                                prefix: filterPath,
                                fileName: "Üyeler",
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

            <UpdateUserPassword
                userId={selectedUserId}
                open={passwordResetModal}
                onClose={() => setPasswordResetModal(false)}
            />
        </React.Fragment>
    );
};

export default UserList;
