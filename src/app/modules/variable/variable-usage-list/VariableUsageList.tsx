import DynamicTable from "@base/components/common/dynamic-table/DynamicTable";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { FetchStatus } from "@base/enums/api.enum";
import { fetchVariableUsage } from "../core/api/variable.requests";
import { IVariableResponseP } from "../core/models/variable.interface";
import VariableUsageListActions from "./table/actions";
import Loader from "@base/layout/components/loader/Loader";

import { variableUsageColumns } from "./table/columns";
const filterPath = "variable";

const VariableUsageList = () => {
    const { id: variableId } = useParams();
    const [variableListResponse, setVariableUsageListResponse] = React.useState<
        PageableResponseModel<IVariableResponseP> | undefined
    >();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";

    React.useEffect(() => {
        if (variableId) {

            setFetchStatus(FetchStatus.LOADING);
            fetchVariableUsage({
                variable_id: parseInt(variableId!),
                skip: skip,
                take: take,
                sort: sort,
                filter: filter,
            })
                .then((res) => {
                    setFetchStatus(FetchStatus.SUCCEEDED);
                    setVariableUsageListResponse(res);
                })
                .catch(() => {
                    setFetchStatus(FetchStatus.FAILED);
                });
        }
    }, [skip, take, sort, filter, variableId]);

    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;

    return (
        <DynamicTable<IVariableResponseP>
            title="Değişken Kullanım Listesi"
            rows={variableListResponse?.items}
            meta={variableListResponse?.meta}
            filterPath={filterPath}
            tableHeads={variableUsageColumns({
                handleForwardEntity: (_: number) => { },
            })}
            loadStatus={fetchStatus}
            headerActionsComponent={<VariableUsageListActions />}
            searchColumns={[
                {
                    id: "name",
                    type: "string",
                },
            ]}
        />
    );
};

export default VariableUsageList;
