import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import { IBusinessLineResponseP } from "../../core/models/business-line.interface";

type Props = {
    handleEdit: (item: any) => void;
    handleDelete: (item: any) => void;
    handleVariable: (item: any) => void;
    handleCopy: (item: any) => void;
};
export const businessLineColumns = ({
    handleEdit,
    handleDelete,
    handleVariable,
    handleCopy,
}: Props): IColumn<IBusinessLineResponseP>[] => {
    return [
        {
            type: EColumnType.OPERATIONS,
            operations: [
                {
                    name: "edit",
                    icon: "bx:edit",
                    text: "Düzenle",
                    handle: handleEdit,
                    role: ERole.BusinessLineUpdate,
                },
                {
                    name: "edit",
                    icon: "fluent-mdl2:delete",
                    text: "Sil",
                    handle: handleDelete,
                    role: ERole.BusinessLineDelete,
                },
                {
                    name: "variable",
                    icon: "pepicons-pop:info-circle",
                    text: "Değişkenleri görüntüle",
                    handle: handleVariable,
                    role: ERole.BusinessLineUpdate,
                },
                {
                    name: "copy",
                    icon: "tabler:copy",
                    text: "Kopyala",
                    handle: handleCopy,
                    role: ERole.BusinessLineUpdate,
                },
            ],
            label: "İşlemler",
        },

        { id: "name", label: "Adı", alignRight: false, filterable: true, filterType: EFilterType.SELECT },
        { id: "business_line_code", label: "İş Kolu Kodu", alignRight: false, filterable: true, filterType: EFilterType.SELECT },
        { id: "description", label: "Açıklama", alignRight: false, filterable: true, filterType: EFilterType.SELECT },
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
