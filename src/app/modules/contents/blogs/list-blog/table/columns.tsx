import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";

import { ERole } from "@base/enums/role.enum";
import { IBlogResponse } from "../../core/models/blog.interface";

type Props = {
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
};
export const blogColumns = ({
  handleEdit,
  handleDelete,
}: Props): IColumn<IBlogResponse>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "ep:edit",
          text: "Düzenle",
          handle: handleEdit,
          role: ERole.BlogUpdate,
        },
        {
          name: "delete",
          icon: "ep:delete",
          text: "Sil",
          handle: handleDelete,
          role: ERole.BlogDelete,
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
      id: "category.title",
      label: "Blog Kategorisi",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
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
