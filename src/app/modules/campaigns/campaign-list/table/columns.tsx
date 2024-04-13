import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import { ICampaignResponse } from "../../core/models/campaign.interface";

type Props = {
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
};
export const campaignColumns = ({
  handleEdit,
  handleDelete,
}: Props): IColumn<ICampaignResponse>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "ep:edit",
          text: "Düzenle",
          handle: handleEdit,
          role: ERole.CampaignUpdate,
        },
        {
          name: "delete",
          icon: "ep:delete",
          text: "Sil",
          handle: handleDelete,
          role: ERole.CampaignDelete,
        },
      ],
      label: "İşlemler",
    },
    {
      id: "campaign_code",
      label: "Kampanya Kodu",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "campaign_name",
      label: "Kampanya Adı",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
    {
      id: "campaign_status",
      label: "Durum",
      alignRight: false,
      point: {
        bg: { active: "bg-success", draft: "bg-info", expired: "bg-danger" },
        text: { active: "Aktif", draft: "Taslak", expired: "Günü Geçmiş" },
      },
      type: EColumnType.POINT,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterDropdownTypes: [
        { value: "active", name: "active", label: "Aktif" },
        { value: "expired", name: "expired", label: "Günü Geçmiş" },
        { value: "draft", name: "draft", label: "Taslak" },
      ],
    },
    {
      id: "discount_type",
      label: "İndirim Tipi",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
      filterDropdownTypes: [
        { value: "percentage", name: "percentage", label: "Yüzde" },
        { value: "fixed", name: "fixed", label: "Miktar" },
      ],
      filterContent(item) {
        return item === "percentage" ? "Yüzde" : "Miktar";
      },
    },
    {
      id: "discount_value",
      label: "İndirim Değeri",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.NUMBER,
    },
    {
      id: "customer.company_name",
      label: "Müşteri",
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
