import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamic-table/core/models";
import { ERole } from "@base/enums/role.enum";
import { ILogResponse } from "../../core/models/log.interface";

type Props = {
  handleDetail: (id: number) => void;
};
export const logColumns = ({
  handleDetail,
}: Props): IColumn<ILogResponse>[] => {
  return [
    {
      type: EColumnType.OPERATIONS,
      operations: [
        {
          name: "edit",
          icon: "bx:comment-detail",
          text: "Detay",
          handle: handleDetail,
          role: ERole.LogView,
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
      id: "type",
      label: "Log Tipi",
      alignRight: false,
      filterable: true,
      filterType: EFilterType.SELECT,
    },
  ];
};
