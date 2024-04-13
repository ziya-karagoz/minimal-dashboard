import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { deleteSector, fetchSectors } from '../core/api/sector.requests';
import { ISectorResponseP } from '../core/models/sector.interface';
import { sectorColumns } from './table/columns';
import SectorListActions from './table/actions';
import { swal } from '@base/components/common/alerts/SwalAlert';
import toast from 'react-hot-toast';
import Loader from '@base/layout/components/loader/Loader';
const filterPath = "sector";

const SectorList = () => {
    const [tableAction, setTableAction] = React.useState<string>("");
    const navigate = useNavigate();
    const [sectorListResponse, setSectorListResponse] = React.useState<PageableResponseModel<ISectorResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchSectors({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setSectorListResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <DynamicTable<ISectorResponseP>
            title="Sektörler"
            rows={sectorListResponse?.items}
            meta={sectorListResponse?.meta}
            filterPath={filterPath}
            tableHeads={sectorColumns({
                handleEdit: (id: number) => {
                    navigate(`/on-tanimlamalar/sektorler/duzenle/${id}`);
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
                                deleteSector(id).then(() => {
                                    toast.success("Sektör başarıyla silindi");
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                },
            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <SectorListActions />
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

export default SectorList