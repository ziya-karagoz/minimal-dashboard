import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { deleteUnit, fetchUnits } from '../core/api/unit.requests';
import { IUnitResponseP } from '../core/models/unit.interface';
import { unitColumns } from './table/columns';
import UnitListActions from './table/actions';
import { swal } from '@base/components/common/alerts/SwalAlert';
import toast from 'react-hot-toast';
import Loader from '@base/layout/components/loader/Loader';
const filterPath = "unit";

const UnitList = () => {
    const [tableAction, setTableAction] = React.useState<string>("");
    const navigate = useNavigate();
    const [unitListResponse, setUnitListResponse] = React.useState<PageableResponseModel<IUnitResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchUnits({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setUnitListResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <DynamicTable<IUnitResponseP>
            title="Birimler"
            rows={unitListResponse?.items}
            meta={unitListResponse?.meta}
            filterPath={filterPath}
            tableHeads={unitColumns({
                handleEdit: (id: number) => {
                    navigate(`/on-tanimlamalar/birimler/duzenle/${id}`);
                },
                handleDelete: (id: number) => {
                    swal
                        .fire({
                            title: "Birimü silmek istediğinize emin misiniz?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Evet",
                            cancelButtonText: "Hayır",
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                deleteUnit(id).then(() => {
                                    toast.success("Birim başarıyla silindi");
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                },
            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <UnitListActions />
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

export default UnitList