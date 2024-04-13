import {
    EColumnType,
    EFilterType,
    IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { IStepResponseP } from "../../core/models/step.interface";
import { ERole } from "@base/enums/role.enum";

type Props = {
    handleEdit: (item: any) => void;
};
export const stepColumns = ({
    handleEdit,
}: Props): IColumn<IStepResponseP>[] => {
    return [
        {
            type: EColumnType.OPERATIONS,
            operations: [
                {
                    name: "edit",
                    icon: "bx:edit",
                    text: "Düzenle",
                    handle: handleEdit,
                    role: ERole.StepUpdate,
                },
            ],
            label: "İşlemler",
        },

        {
            id: "name",
            label: "Adım Adı",
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
    ];
};
