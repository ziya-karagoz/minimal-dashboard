import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { businessLineColumns } from './table/columns';
import BusinessLineActions from './table/actions';
import { swal } from '@base/components/common/alerts/SwalAlert';
import toast from 'react-hot-toast';
import Loader from '@base/layout/components/loader/Loader';
import { copyBusinessLine, deleteBusinessLine, fetchBusinessLines } from '../core/api/business-line.requests';
import { IBusinessLineResponseP } from '../core/models/business-line.interface';
const filterPath = "businessLine";

const BusinessLine = () => {

    const [tableAction, setTableAction] = React.useState<string>("");
    const navigate = useNavigate();
    const [businessLineResponse, setBusinessLineResponse] = React.useState<PageableResponseModel<IBusinessLineResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchBusinessLines({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setBusinessLineResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter, tableAction]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <DynamicTable<IBusinessLineResponseP>
            title="İş Kolları"
            rows={businessLineResponse?.items}
            meta={businessLineResponse?.meta}
            filterPath={filterPath}
            tableHeads={businessLineColumns({
                handleEdit: (id: number) => {
                    navigate(`/is-kollari/detay/${id}/duzenle`);
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
                                deleteBusinessLine(id).then(() => {
                                    toast.success("Sektör başarıyla silindi");
                                    setTableAction(`delete_${id}`);
                                });
                            }
                        });
                },
                handleCopy: (id: number) => {
                    copyBusinessLine(id).then(() => {
                        toast.success("Sektör başarıyla kopyalandı");
                        setTableAction(`copy_${id}`);
                    });
                },
                handleVariable: (id: number) => {
                    navigate(`/is-kollari/detay/${id}/degiskenler`);
                }

            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <BusinessLineActions />
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

export default BusinessLine