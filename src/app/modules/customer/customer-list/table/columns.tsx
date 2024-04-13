import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import { ICustomerResponseP } from "../../core/models/customer.interface";
import {
  ECustomerType,
  ECustomerTypeL,
  EPartnerScope,
  EPartnerScopeL,
} from "../../core/models/customer.enum";
import Badge from "@base/components/common/badge/Badge";

type Props = {
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
  handleUpdatePassword: (item: any) => void;
};
export const customerColumns = ({
  handleEdit,
  handleDelete,
  handleUpdatePassword,
}: Props): IColumn<ICustomerResponseP>[] => {
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
        {
          name: "delete",
          icon: "ic:round-delete",
          text: "Sil",
          handle: handleDelete,
          role: ERole.CustomerDelete,
        },
        {
          name: "password",
          icon: "heroicons:key-solid",
          text: "Şifre Güncelle",
          handle: handleUpdatePassword,
          role: ERole.CustomerUpdate,
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
      id: "company_name",
      label: "Şirket Adı",
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
      id: "type",
      label: "Müşteri Tipi",
      alignRight: false,
      badge: {
        bg: {
          corporate: "pink",
          individual: "blue",
        },
        text: {
          corporate: ECustomerTypeL[ECustomerType.CORPORATE],
          individual: ECustomerTypeL[ECustomerType.INDIVIDUAL],
        },
      },
      type: EColumnType.BADGE,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterDropdownTypes: [
        {
          value: ECustomerType.CORPORATE,
          name: ECustomerType.CORPORATE,
          label: ECustomerTypeL[ECustomerType.CORPORATE],
        },
        {
          value: ECustomerType.INDIVIDUAL,
          name: ECustomerType.INDIVIDUAL,
          label: ECustomerTypeL[ECustomerType.INDIVIDUAL],
        },
      ],
    },
    {
      id: "sector.name",
      label: "Sektör",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterContent: (item) => {
        if (!item) return "-";
        return item;
      },
    },
    // {
    //   id: "partner_type",
    //   label: "Bayi Tipi",
    //   alignRight: false,
    //   badge: {
    //     bg: {
    //       point_sale: "yellow",
    //       sub: "purple",
    //       main: "red",
    //     },
    //     text: {
    //       point_sale: EPartnerTypeL[EPartnerType.POINT_SALE],
    //       sub: EPartnerTypeL[EPartnerType.SUB],
    //       main: EPartnerTypeL[EPartnerType.MAIN],
    //     },
    //   },
    //   type: EColumnType.BADGE,
    //   filterable: true,
    //   filterType: EFilterType.SELECT,
    //   filterDropdownTypes: [
    //     {
    //       value: EPartnerType.MAIN,
    //       name: EPartnerType.MAIN,
    //       label: EPartnerTypeL[EPartnerType.MAIN],
    //     },
    //     {
    //       value: EPartnerType.SUB,
    //       name: EPartnerType.SUB,
    //       label: EPartnerTypeL[EPartnerType.SUB],
    //     },
    //     {
    //       value: EPartnerType.POINT_SALE,
    //       name: EPartnerType.POINT_SALE,
    //       label: EPartnerTypeL[EPartnerType.POINT_SALE],
    //     },
    //   ],
    // },
    {
      id: "partner_scopes",
      label: "Kapsam",
      filterable: true,
      filterType: EFilterType.SELECT,
      filterDropdownTypes: [
        {
          value: EPartnerScope.DASHBOARD,
          name: EPartnerScope.DASHBOARD,
          label: EPartnerScopeL[EPartnerScope.DASHBOARD],
        },
        {
          value: EPartnerScope.API,
          name: EPartnerScope.API,
          label: EPartnerScopeL[EPartnerScope.API],
        },
        {
          value: EPartnerScope.COUPON,
          name: EPartnerScope.COUPON,
          label: EPartnerScopeL[EPartnerScope.COUPON],
        },
      ],
      filterContent: (item) => {
        if (!item) return "-";
        return (
          <div className="flex flex-wrap gap-1">
            {item.map((scope: EPartnerScope) => (
              <Badge
                pill
                bordered
                color={
                  scope === EPartnerScope.DASHBOARD
                    ? "red"
                    : scope === EPartnerScope.API
                      ? "indigo"
                      : scope === EPartnerScope.COUPON
                        ? "green"
                        : "gray"
                }
              >
                {EPartnerScopeL[scope]}
              </Badge>
            ))}
          </div>
        );
      },
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
