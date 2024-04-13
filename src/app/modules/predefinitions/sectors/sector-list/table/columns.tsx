import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ISectorResponseP } from "../../core/models/sector.interface";
import { ERole } from "@base/enums/role.enum";

type Props = {
    handleEdit: (item: any) => void;
    handleDelete: (item: any) => void;
};
export const sectorColumns = ({
    handleEdit,
    handleDelete,
}: Props): IColumn<ISectorResponseP>[] => {
    return [
        {
            type: EColumnType.OPERATIONS,
            operations: [
                {
                    name: "edit",
                    icon: "bx:edit",
                    text: "Düzenle",
                    handle: handleEdit,
                    role: ERole.SectorUpdate,
                },
                {
                    name: "edit",
                    icon: "fluent-mdl2:delete",
                    text: "Sil",
                    handle: handleDelete,
                    role: ERole.SectorDelete,
                },
            ],
            label: "İşlemler",
        },

        {
            id: "name",
            label: "Sektör Adı",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.SELECT,
        },
        {
            id: "sector_code",
            label: "Sektör Kodu",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.SELECT,
        },
        {
            id: "description",
            label: "Açıklama",
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
