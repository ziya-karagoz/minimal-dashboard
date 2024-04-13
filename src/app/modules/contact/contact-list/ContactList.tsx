import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchStatus } from "@base/enums/api.enum";
import { customerColumns } from "./table/columns";
import ContactListActions from "./table/actions";
import Loader from "@base/layout/components/loader/Loader";
import { exportExcel } from "@app/core/api/app.requests";
import { IContactResponseP } from "../core/models/contact.interface";
import { assignContactToAdmin, fetchContacts } from "../core/api/contact.requests";
import toast from "react-hot-toast";
const filterPath = "customer";

const ContactList = () => {
    const [tableAction, setTableAction] = React.useState<string>("");
    const [contactListResponse, setContactListResponse] = React.useState<
        PageableResponseModel<IContactResponseP> | undefined
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
        fetchContacts({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        })
            .then((res) => {
                setFetchStatus(FetchStatus.SUCCEEDED);
                setContactListResponse(res);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <React.Fragment>
            <DynamicTable<IContactResponseP>
                title="Müşteriler"
                rows={contactListResponse?.items}
                meta={contactListResponse?.meta}
                filterPath={filterPath}
                tableHeads={customerColumns({
                    handleDetail: (id: number) => {
                        navigate(`/istekler/detay/${id}`);
                    },
                    handleAssign: (id: number) => {
                        assignContactToAdmin(id).then(() => {
                            setTableAction(`asing_${id}`);
                            toast.success("İletişim isteği size atandı.");
                        }
                        );

                    }


                })}
                loadStatus={fetchStatus}
                headerActionsComponent={
                    <ContactListActions
                        handleExport={() => {
                            exportExcel({
                                prefix: filterPath,
                                fileName: "İletişim İstekleri",
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


        </React.Fragment>
    );
};

export default ContactList;
