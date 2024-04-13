import api from "@base/helpers/enhencers/Interceptor";
import download from "downloadjs";
import toast from "react-hot-toast";
import { IAdminRole } from "../models/app.models";
import { ERole } from "@base/enums/role.enum";

const API_URL = import.meta.env.VITE_API_URL;

// Export excelable data
const headers = {
  Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export async function exportExcel({
  prefix,
  fileName,
  sort = undefined,
}: {
  prefix: string;
  fileName: string;
  sort?: string | undefined;
}): Promise<void> {
  return api
    .get(`${API_URL}/api/backoffice/${prefix}/export`, {
      responseType: "blob",
      headers,
      params: {
        sort: sort,
      },
    })
    .then(async (response) => {
      download(
        // @ts-ignore
        response,
        fileName + ".xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      toast.success("Başarıyla indirildi");
    });
}

export function getAllAdminRoles({
  search,
}: {
  search: string | undefined;
}): Promise<IAdminRole[]> {
  return api.get(`${API_URL}/api/backoffice/admin/module/role`, {
    params: {
      search,
    },
  });
}

// Get Single Admin Roles
export function getAdminRoles(id: number): Promise<IAdminRole[]> {
  return api.get(`${API_URL}/api/backoffice/admin/module/role/${id}`);
}

// Update Single Admin Roles
export function updateAdminRoles({
  id,
  data,
}: {
  id: number;
  data: {
    roles: ERole[];
  };
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/admin/module/role/${id}`, data);
}
