import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import { IServiceGroupResponseP } from "../../core/models/service-group.interface";

type Props = {
    handleEdit: (item: any) => void;
    handleDelete: (item: any) => void;
    handleVariable: (item: any) => void;
    handleCopy: (item: any) => void;
};
export const serviceGroupColumns = ({
    handleEdit,
    handleDelete,
    handleVariable,
    handleCopy,
}: Props): IColumn<IServiceGroupResponseP>[] => {
    return [
        {
            type: EColumnType.OPERATIONS,
            operations: [
                {
                    name: "edit",
                    icon: "bx:edit",
                    text: "Düzenle",
                    handle: handleEdit,
                    role: ERole.ServiceGroupUpdate,
                },
                {
                    name: "edit",
                    icon: "fluent-mdl2:delete",
                    text: "Sil",
                    handle: handleDelete,
                    role: ERole.ServiceGroupDelete,
                },
                {
                    name: "variable",
                    icon: "pepicons-pop:info-circle",
                    text: "Değişkenleri görüntüle",
                    handle: handleVariable,
                    role: ERole.ServiceGroupUpdate,
                },
                {
                    name: "copy",
                    icon: "tabler:copy",
                    text: "Kopyala",
                    handle: handleCopy,
                    role: ERole.ServiceGroupUpdate,
                },
            ],
            label: "İşlemler",
        },

        { id: "name", label: "Adı", alignRight: false, filterable: true, filterType: EFilterType.SELECT },
        { id: "service_group_code", label: "Hizmet Grubu Kodu", alignRight: false, filterable: true, filterType: EFilterType.SELECT },
        { id: "description", label: "Açıklama", alignRight: false, filterable: true, filterType: EFilterType.SELECT },
        {
            id: "business_line.business_line_code",
            label: "İş Kolu Kodu",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.SELECT,
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
