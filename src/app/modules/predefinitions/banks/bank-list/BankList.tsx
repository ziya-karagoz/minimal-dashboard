import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { deleteBank, fetchBanks } from '../core/api/bank.requests';
import { IBankResponseP } from '../core/models/bank.interface';
import { bankColumns } from './table/columns';
import BankListActions from './table/actions';
import Loader from '@base/layout/components/loader/Loader';
import { swal } from '@base/components/common/alerts/SwalAlert';
import toast from 'react-hot-toast';
const filterPath = "bank";

const BankList = () => {
    const navigate = useNavigate();
    const [tableAction, setTableAction] = React.useState<string>("");
    const [bankListResponse, setBankListResponse] = React.useState<PageableResponseModel<IBankResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchBanks({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setBankListResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />

    return (
        <DynamicTable<IBankResponseP>
            title="Bankalar"
            rows={bankListResponse?.items}
            meta={bankListResponse?.meta}
            filterPath={filterPath}
            tableHeads={bankColumns({
                handleEdit: (id: number) => {
                    navigate(`/on-tanimlamalar/bankalar/duzenle/${id}`);
                },
                handleDelete: (id: number) => {
                    swal
                        .fire({
                            title: "Sektörü silmek istediğinize emin misiniz?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Evet",
                            cancelButtonText: "Hayır",
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                deleteBank(id).then(() => {
                                    toast.success("Banka başarıyla silindi");
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                },
            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <BankListActions />
            }
            searchColumns={[
                {
                    id: "name",
                    type: "string",
                },
                {
                    id: "description",
                    type: "string",
                },
            ]}
        />
    )
}

export default BankList