import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchStatus } from "@base/enums/api.enum";
import { customerColumns } from "./table/columns";
import { deleteCustomer, fetchCustomers } from "../core/api/customer.request";
import { ICustomerResponseP } from "../core/models/customer.interface";
import CustomerListActions from "./table/actions";
import Loader from "@base/layout/components/loader/Loader";
import toast from "react-hot-toast";
import { swal } from "@base/components/common/alerts/SwalAlert";
import UpdateCustomerPassword from "./modals/UpdateCustomerPassword";
import { exportExcel } from "@app/core/api/app.requests";
const filterPath = "customer";

const CustomerList = () => {
    const [selectedCustomerId, setSelectedCustomerId] = React.useState<
        number | undefined
    >(undefined);
    const [passwordResetModal, setPasswordResetModal] =
        React.useState<boolean>(false);
    const [tableAction, setTableAction] = React.useState<string>("");
    const [customerListResponse, setCustomerListResponse] = React.useState<
        PageableResponseModel<ICustomerResponseP> | undefined
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
        fetchCustomers({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        })
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setCustomerListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <React.Fragment>
            <DynamicTable<ICustomerResponseP>
                title="Müşteriler"
                rows={customerListResponse?.items}
                meta={customerListResponse?.meta}
                filterPath={filterPath}
                tableHeads={customerColumns({
                    handleEdit: (id: number) => {
                        navigate(`/musteriler/duzenle/${id}`);
                    },
                    handleDelete: (id: number) => {
                        swal
                            .fire({
                                title: "Müşteriyı silmek istediğinize emin misiniz?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Evet",
                                cancelButtonText: "Hayır",
                            })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    deleteCustomer(id).then(() => {
                                        toast.success("Müşteri başarıyla silindi");
                                        setTableAction(`delete_${id}`);
                                    });
                                }
                            });
                    },
                    handleUpdatePassword: (id: number) => {
                        setPasswordResetModal(true);
                        setSelectedCustomerId(id);
                    },

                })}
                loadStatus={fetchStatus}
                headerActionsComponent={
                    <CustomerListActions
                        handleExport={() => {
                            exportExcel({
                                prefix: filterPath,
                                fileName: "Müşteriler",
                            });
                        }}
                    />
                }
                searchColumns={[
                    {
                        id: "company_name",
                        type: "string",
                    }
                ]}
            />

            <UpdateCustomerPassword
                customerId={selectedCustomerId}
                open={passwordResetModal}
                onClose={() => setPasswordResetModal(false)}
            />
        </React.Fragment>
    );
};

export default CustomerList;
