import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { deleteVariable, fetchVariables } from '../core/api/variable.requests';
import { IVariableResponseP } from '../core/models/variable.interface';
import { variableColumns } from './table/columns';
import VariableListActions from './table/actions';
import Loader from '@base/layout/components/loader/Loader';
import { swal } from '@base/components/common/alerts/SwalAlert';
import toast from 'react-hot-toast';
const filterPath = "variable";

const VariableList = () => {
    const navigate = useNavigate();
    const [tableAction, setTableAction] = React.useState<string>("");
    const [variableListResponse, setVariableListResponse] = React.useState<PageableResponseModel<IVariableResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchVariables({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setVariableListResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />

    return (
        <DynamicTable<IVariableResponseP>
            title="Değişkenler"
            rows={variableListResponse?.items}
            meta={variableListResponse?.meta}
            filterPath={filterPath}
            tableHeads={variableColumns({
                handleEdit: (id: number) => {
                    navigate(`/degiskenler/duzenle/${id}`);
                },
                handleUsage: (id: number) => {
                    navigate(`/degiskenler/kullanim-alanlari/${id}`);
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
                                deleteVariable(id).then(() => {
                                    toast.success("Variablea başarıyla silindi");
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                },
            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <VariableListActions />
            }
            searchColumns={[
                {
                    id: "name",
                    type: "string",
                },
            ]}
        />
    )
}

export default VariableList