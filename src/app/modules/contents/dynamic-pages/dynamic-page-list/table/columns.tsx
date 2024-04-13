import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";

import { ERole } from "@base/enums/role.enum";
import { IDynamicPageResponse } from "../../core/models/dynamic-page";

type Props = {
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
};
export const dynamicPageColumns = ({
  handleEdit,
  handleDelete,
}: Props): IColumn<IDynamicPageResponse>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "ep:edit",
          text: "Düzenle",
          handle: handleEdit,
          role: ERole.DynamicPageUpdate,
        },
        {
          name: "delete",
          icon: "ep:delete",
          text: "Sil",
          handle: handleDelete,
          role: ERole.DynamicPageDelete,
        },
      ],
      label: "İşlemler",
    },
    {
      id: "title",
      label: "Başlık",
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
