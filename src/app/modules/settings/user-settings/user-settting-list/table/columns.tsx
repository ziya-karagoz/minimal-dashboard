import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";

import { IUserSettingResponseP } from "@app/modules/settings/core/models/settings.interface";

type Props = {
  handleEdit: (item: any) => void;
};
export const userSettingColumns = ({
  handleEdit,
}: Props): IColumn<IUserSettingResponseP>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "fluent:edit-48-filled",
          text: "Düzenle",
          handle: handleEdit,
          role: ERole.CustomerUpdate,
        },
      ],
      label: "İşlemler",
    },
    {
      id: "title",
      label: "Adı",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "description",
      label: "Açıklaması",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },

    {
      id: "is_new",
      label: "Yenilik Durumu",
      alignRight: false,
      badge: {
        bg: {
          true: "green",
          false: "red",
        },
        text: {
          true: "Yeni",
          false: "Eski",
        },
      },
      type: EColumnType.BADGE,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterDropdownTypes: [
        {
          value: true,
          name: "true",
          label: "Yeni",
        },
        {
          value: false,
          name: "false",
          label: "Eski",
        },
      ],
    },
  ];
};
