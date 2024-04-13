import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import { IUserResponseP } from "../../core/models/user.interface";

type Props = {
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
  handleUpdatePassword: (item: any) => void;
  handleUserSetting: (item: any) => void;
};
export const userColumns = ({
  handleEdit,
  handleDelete,
  handleUpdatePassword,
  handleUserSetting,
}: Props): IColumn<IUserResponseP>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "fluent:edit-48-filled",
          text: "Düzenle",
          handle: handleEdit,
          role: ERole.UserUpdate,
        },
        {
          name: "delete",
          icon: "ic:round-delete",
          text: "Sil",
          handle: handleDelete,
          role: ERole.UserDelete,
        },
        {
          name: "password",
          icon: "heroicons:key-solid",
          text: "Şifre Güncelle",
          handle: handleUpdatePassword,
          role: ERole.UserUpdate,
        },
        {
          name: "userSettings",
          icon: "fa-solid:users-cog",
          text: "Kullanıcı Ayarları",
          handle: handleUserSetting,
          role: ERole.UserUpdate,
        },
      ],
      label: "İşlemler",
    },
    {
      id: "image",
      label: "",
      alignRight: false,
      filterable: false,
      type: EColumnType.PROFILE,
    },

    {
      id: "first_name",
      label: "Adı",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "last_name",
      label: "Soyadı",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "email",
      label: "Email Adresi",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "account_status",
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
      id: "phone",
      label: "Telefon Numarası",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "birthday",
      label: "Doğum Tarihi",
      type: EColumnType.DATE,
      alignRight: false,
      filterable: true,
      filterType: EFilterType.DATE,
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
