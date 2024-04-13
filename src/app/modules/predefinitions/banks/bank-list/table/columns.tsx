import { EColumnType, EFilterType, IColumn } from "@base/components/common/dynamic-table/core/models";
import { IBankResponseP } from "../../core/models/bank.interface";
import { ERole } from "@base/enums/role.enum";

type Props = {
    handleEdit: (item: any) => void;
    handleDelete: (item: any) => void;
};
export const bankColumns = ({
    handleEdit,
    handleDelete,
}: Props): IColumn<IBankResponseP>[] => {
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

            ],
            label: "İşlemler",
        },

        {
            id: "name",
            label: "Banka Adı",
            alignRight: false,
            filterable: true,
            filterType: EFilterType.SELECT,
        },

    ];
};
