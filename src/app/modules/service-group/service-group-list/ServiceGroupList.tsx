import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { serviceGroupColumns } from './table/columns';
import ServiceGroupActions from './table/actions';
import { swal } from '@base/components/common/alerts/SwalAlert';
import toast from 'react-hot-toast';
import Loader from '@base/layout/components/loader/Loader';
import { copyServiceGroup, deleteServiceGroup, fetchServiceGroups } from '../core/api/service-group.requests';
import { IServiceGroupResponseP } from '../core/models/service-group.interface';
const filterPath = "serviceGroup";

const ServiceGroup = () => {

    const [tableAction, setTableAction] = React.useState<string>("");
    const navigate = useNavigate();
    const [serviceGroupResponse, setServiceGroupResponse] = React.useState<PageableResponseModel<IServiceGroupResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchServiceGroups({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setServiceGroupResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <DynamicTable<IServiceGroupResponseP>
            title="Hizmet Grupları"
            rows={serviceGroupResponse?.items}
            meta={serviceGroupResponse?.meta}
            filterPath={filterPath}
            tableHeads={serviceGroupColumns({
                handleEdit: (id: number) => {
                    navigate(`/hizmet-gruplari/detay/${id}/duzenle`);
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
                                deleteServiceGroup(id).then(() => {
                                    toast.success("Sektör başarıyla silindi");
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                },
                handleCopy: (id: number) => {
                    copyServiceGroup(id).then(() => {
                        toast.success("Sektör başarıyla kopyalandı");
                        setTableAction(`copy_${id}`);
                    });
                },
                handleVariable: (id: number) => {
                    navigate(`/hizmet-gruplari/detay/${id}/degiskenler`);
                }

            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <ServiceGroupActions />
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

export default ServiceGroup