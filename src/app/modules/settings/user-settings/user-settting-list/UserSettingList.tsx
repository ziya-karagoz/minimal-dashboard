import DynamicTable from '@base/components/common/dynamic-table/DynamicTable';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageableResponseModel } from '@base/components/common/dynamic-table/core/models';
import { FetchStatus } from '@base/enums/api.enum';

import BankListActions from './table/actions';
import Loader from '@base/layout/components/loader/Loader';
import { getUserSettings } from '../../core/api/settings.request';
import { IUserSettingResponseP } from '../../core/models/settings.interface';
import { userSettingColumns } from './table/columns';
const filterPath = "user-setting-item";

const UserSettingList = () => {
    const navigate = useNavigate();
    const [bankListResponse, setBankListResponse] = React.useState<PageableResponseModel<IUserSettingResponseP> | undefined>();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);
    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") ?? "1");
    const take = parseInt(searchParams.get("take") ?? "50");
    const sort = searchParams.get("sort") ?? "";
    const filter = searchParams.get("filter") ?? "[]";



    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        getUserSettings({
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
    }, [skip, take, sort, filter]);

    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />

    return (
        <DynamicTable<IUserSettingResponseP>
            title="Kullanıcı Ayarları"
            rows={bankListResponse?.items}
            meta={bankListResponse?.meta}
            filterPath={filterPath}
            tableHeads={userSettingColumns({
                handleEdit: (id: number) => {
                    navigate(`/ayarlar/kullanici/duzenle/${id}`);
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

export default UserSettingList