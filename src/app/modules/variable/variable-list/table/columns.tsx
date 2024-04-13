import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import {
    EVariableType,
    EVariableTypeL,
} from "../../core/models/variable.enums";

type Props = {
    handleEdit: (item: any) => void;
    handleDelete: (item: any) => void;
    handleUsage: (item: any) => void;
};
export const variableColumns = ({
    handleEdit,
    handleDelete,
    handleUsage,
}: Props): IColumn<any>[] => {
    return [
        {
            type: EColumnType.OPERATIONS,
            operations: [
                {
                    name: "edit",
                    icon: "bx:edit",
                    text: "Düzenle",
                    handle: handleEdit,
                    role: ERole.BankUpdate,
                },
                {
                    name: "edit",
                    icon: "fluent-mdl2:delete",
                    text: "Sil",
                    handle: handleDelete,
                    role: ERole.BankDelete,
                },
                {
                    name: "edit",
                    icon: "gravity-ui:circles-4-square",
                    text: "Kullanım Alanları",
                    handle: handleUsage,
                    role: ERole.BankDelete,
                },
            ],
            label: "İşlemler",
        },

        {
            id: "name",
            label: "Değişken adı",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.SELECT,
        },
        {
            id: "type",
            label: "Değişken tipi",
            alignRight: false,
            badge: {
                bg: {
                    [EVariableType.CHECKBOX]: "pink",
                    [EVariableType.SELECTBOX]: "blue",
                    [EVariableType.MULTIPLE_CHECKBOX]: "green",
                    [EVariableType.MULTIPLE_SELECTBOX]: "orange",
                },
                text: {
                    [EVariableType.CHECKBOX]: EVariableTypeL[EVariableType.CHECKBOX],
                    [EVariableType.SELECTBOX]: EVariableTypeL[EVariableType.SELECTBOX],
                    [EVariableType.MULTIPLE_CHECKBOX]:
                        EVariableTypeL[EVariableType.MULTIPLE_CHECKBOX],
                    [EVariableType.MULTIPLE_SELECTBOX]:
                        EVariableTypeL[EVariableType.MULTIPLE_SELECTBOX],
                },
            },
            type: EColumnType.BADGE,
            filterable: true,
            filterType: EFilterType.SELECT,
            filterDropdownTypes: [
                {
                    value: EVariableType.CHECKBOX,
                    name: EVariableType.CHECKBOX,
                    label: EVariableTypeL[EVariableType.CHECKBOX],
                },
                {
                    value: EVariableType.SELECTBOX,
                    name: EVariableType.SELECTBOX,
                    label: EVariableTypeL[EVariableType.SELECTBOX],
                },
                {
                    value: EVariableType.MULTIPLE_CHECKBOX,
                    name: EVariableType.MULTIPLE_CHECKBOX,
                    label: EVariableTypeL[EVariableType.MULTIPLE_CHECKBOX],
                },
                {
                    value: EVariableType.MULTIPLE_SELECTBOX,
                    name: EVariableType.MULTIPLE_SELECTBOX,
                    label: EVariableTypeL[EVariableType.MULTIPLE_SELECTBOX],
                },
            ],
        },
        {
            id: "usage_count",
            label: "Kullanım sayısı",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.NUMBER,
        },
        {
            id: "active",
            label: "Durum",
            alignRight: false,
            point: {
                bg: { true: "green", false: "red" },
                text: { true: "Aktif", false: "Pasif" },
            },
            type: EColumnType.POINT,
            filterable: true,
            filterType: EFilterType.SELECT,
            filterDropdownTypes: [
                { value: true, name: "active", label: "Aktif" },
                { value: false, name: "passive", label: "Pasif" },
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
