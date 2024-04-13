import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';
import { fetchSteps } from '../core/api/step.requests';
import { IStepResponseP } from '../core/models/step.interface';
import { stepColumns } from './table/columns';
import StepListActions from './table/actions';
import Loader from '@base/layout/components/loader/Loader';
import { exportExcel } from '@app/core/api/app.requests';
const filterPath = "step";

const StepList = () => {
    const navigate = useNavigate();
    const [stepListResponse, setStepListResponse] = React.useState<PageableResponseModel<IStepResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        fetchSteps({
            skip: skip,
            take: take,
            sort: sort,
            filter: filter,
        }).then((res) => {
            setFetchStatus(FetchStatus.SUCCEEDED);
            setStepListResponse(res);
        }
        ).catch(() => {
            setFetchStatus(FetchStatus.FAILED);
        }
        );
    }, [skip, take, sort, filter]);

    if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />

    return (
        <DynamicTable<IStepResponseP>
            title="Adımlar"
            rows={stepListResponse?.items}
            meta={stepListResponse?.meta}
            filterPath={filterPath}
            tableHeads={stepColumns({
                handleEdit: (id: number) => {
                    navigate(`/on-tanimlamalar/adimlar/duzenle/${id}`);
                },
            })}
            loadStatus={fetchStatus}
            headerActionsComponent={
                <StepListActions handleExport={() => {
                    exportExcel({
                        prefix: filterPath,
                        fileName: "Adımlar",
                    });
                }} />
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

export default StepList