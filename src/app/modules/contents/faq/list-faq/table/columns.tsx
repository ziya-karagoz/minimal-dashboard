import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";

import { ERole } from "@base/enums/role.enum";
import { IFaqResponse } from "../../core/models/faq.interface";

type Props = {
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
};
export const faqColumns = ({
  handleEdit,
  handleDelete,
}: Props): IColumn<IFaqResponse>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "ep:edit",
          text: "Düzenle",
          handle: handleEdit,
          role: ERole.ArticleUpdate,
        },
        {
          name: "delete",
          icon: "ep:delete",
          text: "Sil",
          handle: handleDelete,
          role: ERole.ArticleDelete,
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
      id: "faq_category.title",
      label: "SSS Kategorisi",
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
