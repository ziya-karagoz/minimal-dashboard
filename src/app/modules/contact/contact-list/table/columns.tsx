import {
  EColumnType,
  EFilterType,
  IColumn,
  IConditionLogic,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import { IContactResponseP } from "../../core/models/contact.interface";
import { EContactStatus, EContactStatusL } from "../../core/models/contact.enum";

type Props = {
  handleDetail: (item: any) => void;
  handleAssign: (item: any) => void;

};
export const customerColumns = ({
  handleDetail, handleAssign
}: Props): IColumn<IContactResponseP>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "bx:comment-detail",
          text: "Detay",
          handle: handleDetail,
          role: ERole.ContactView,
        },
        {
          name: "assign",
          icon: "fluent-mdl2:assign",
          text: "Bana Ata",
          handle: handleAssign,
          role: ERole.ContactAssign,
          conditions: [
            { key: "status", logic: IConditionLogic.INVERSE, value: EContactStatus.PENDING },
          ],
        },
      ],
      label: "İşlemler",
    },
    {
      id: "status",
      label: "Durum",
      alignRight: false,
      point: {
        bg: { [EContactStatus.COMPLETED]: "green", [EContactStatus.PENDING]: "yellow", [EContactStatus.PROCESS]: "blue" },
        text: { [EContactStatus.COMPLETED]: EContactStatusL[EContactStatus.COMPLETED], [EContactStatus.PENDING]: EContactStatusL[EContactStatus.PENDING], [EContactStatus.PROCESS]: EContactStatusL[EContactStatus.PROCESS] },
      },
      type: EColumnType.POINT,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterDropdownTypes: [
        { value: EContactStatus.COMPLETED, name: EContactStatus.COMPLETED, label: EContactStatusL[EContactStatus.COMPLETED] },
        { value: EContactStatus.PENDING, name: EContactStatus.PENDING, label: EContactStatusL[EContactStatus.PENDING] },
        { value: EContactStatus.PROCESS, name: EContactStatus.PROCESS, label: EContactStatusL[EContactStatus.PROCESS] },
      ],
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
      label: "Eposta Adresi",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "related_employee_name_surname",
      label: "İlgili Yetkili",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterContent: (item) => {
        if (!item) return "-";
        return item;
      }
    },
    {
      id: "message",
      label: "Mesaj",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterContent: (item) => {
        if (!item) return "-";
        return item;
      }
    },
    // {
    //   id: "account_status",
    //   label: "Durum",
    //   alignRight: false,
    //   point: {
    //     bg: { true: "green", false: "red" },
    //     text: { true: "Aktif", false: "Pasif" },
    //   },
    //   type: EColumnType.POINT,
    //   filterable: true,
    //   filterType: EFilterType.SELECT,
    //   filterDropdownTypes: [
    //     { value: true, name: "active", label: "Aktif" },
    //     { value: false, name: "passive", label: "Pasif" },
    //   ],
    // },
    {
      id: "phone",
      label: "Telefon Numarası",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterContent: (item) => {
        if (!item) return "-";
        return item;
      },
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
