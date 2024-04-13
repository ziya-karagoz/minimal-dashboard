import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { EEntityItemType, EEntityItemTypeL } from "../../core/models/entity-variable.enums";



type Props = {
    handleForwardEntity: (id: number) => void;
};
export const variableUsageColumns = ({
}: Props): IColumn<any>[] => {
    return [
        // {
        //     type: EColumnType.OPERATIONS,
        //     operations: [
        //         {
        //             name: "edit",
        //             icon: "fluent:edit-48-filled",
        //             text: "Düzenle",
        //             handle: handleForwardEntity,
        //             role: ERole.VariableView,
        //         },
        //     ],
        //     label: "İşlemler",
        // },
        {
            id: "usage_name",
            label: "Kullanım Adı",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.SELECT,
        },
        {
            id: "usage_code",
            label: "Kullanım Kodu",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.SELECT
        },
        {
            id: "usage_type",
            label: "Kullanım Tipi",
            alignRight: false,
            badge: {
                bg: {
                    [EEntityItemType.BUSINESS_LINE]: "pink",
                    [EEntityItemType.SERVICE_GROUP]: "blue",
                    [EEntityItemType.SERVICE]: "green",
                    [EEntityItemType.PACKAGE]: "purple",
                    [EEntityItemType.AGREEMENT]: "yellow",
                },
                text: {
                    [EEntityItemType.BUSINESS_LINE]: EEntityItemTypeL[EEntityItemType.BUSINESS_LINE],
                    [EEntityItemType.SERVICE_GROUP]: EEntityItemTypeL[EEntityItemType.SERVICE_GROUP],
                    [EEntityItemType.SERVICE]: EEntityItemTypeL[EEntityItemType.SERVICE],
                    [EEntityItemType.PACKAGE]: EEntityItemTypeL[EEntityItemType.PACKAGE],
                    [EEntityItemType.AGREEMENT]: EEntityItemTypeL[EEntityItemType.AGREEMENT],
                },
            },
            type: EColumnType.BADGE,
            filterable: true,
            filterType: EFilterType.SELECT,
            filterDropdownTypes: [
                {
                    value: EEntityItemType.BUSINESS_LINE,
                    name: EEntityItemType.BUSINESS_LINE,
                    label: EEntityItemTypeL[EEntityItemType.BUSINESS_LINE],
                },
                {
                    value: EEntityItemType.SERVICE_GROUP,
                    name: EEntityItemType.SERVICE_GROUP,
                    label: EEntityItemTypeL[EEntityItemType.SERVICE_GROUP],
                },
                {
                    value: EEntityItemType.SERVICE,
                    name: EEntityItemType.SERVICE,
                    label: EEntityItemTypeL[EEntityItemType.SERVICE],
                },
                {
                    value: EEntityItemType.PACKAGE,
                    name: EEntityItemType.PACKAGE,
                    label: EEntityItemTypeL[EEntityItemType.PACKAGE],
                },
                {
                    value: EEntityItemType.AGREEMENT,
                    name: EEntityItemType.AGREEMENT,
                    label: EEntityItemTypeL[EEntityItemType.AGREEMENT],
                },
            ],
        },
        {
            id: "created_at",
            label: "Oluşturulma Tarihi",
            type: EColumnType.DATE,
            alignRight: false,
            filterable: true,
            filterType: EFilterType.DATE,
        },
    ];
};
