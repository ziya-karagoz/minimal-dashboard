import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { serviceColumns } from './table/columns';
import ServiceActions from './table/actions';
import { swal } from '@base/components/common/alerts/SwalAlert';
import toast from 'react-hot-toast';
import Loader from '@base/layout/components/loader/Loader';
import { copyService, deleteService, fetchServices } from '../core/api/service.requests';
import { IServiceResponseP } from '../core/models/service.interface';
const filterPath = "service";

const Service = () => {

    const [tableAction, setTableAction] = React.useState<string>("");
    const navigate = useNavigate();
    const [serviceResponse, setServiceResponse] = React.useState<PageableResponseModel<IServiceResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchServices({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setServiceResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <DynamicTable<IServiceResponseP>
            title="Hizmetler"
            rows={serviceResponse?.items}
            meta={serviceResponse?.meta}
            filterPath={filterPath}
            tableHeads={serviceColumns({
                handleEdit: (id: number) => {
                    navigate(`/hizmetler/detay/${id}/duzenle`);
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
                                deleteService(id).then(() => {
                                    toast.success("Sektör başarıyla silindi");
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                },
                handleCopy: (id: number) => {
                    copyService(id).then(() => {
                        toast.success("Sektör başarıyla kopyalandı");
                        setTableAction(`copy_${id}`);
                    });
                },
                handleVariable: (id: number) => {
                    navigate(`/hizmetler/detay/${id}/degiskenler`);
                }

            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <ServiceActions />
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

export default Service