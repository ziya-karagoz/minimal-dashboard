import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import {
  IContactResponseD,
  IContactResponseP,
  ICreateContactMessageRequest,
} from "../models/contact.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "contact";

// Get Pageable Contacts
export function fetchContacts({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IContactResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Get Single Contact
export function getContact(id: number): Promise<IContactResponseD> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Create Contact Message
export function createContactMessage(
  data: ICreateContactMessageRequest
): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}/message`, data);
}

// Assign Contact to Authed Admin (A.K.A. Me)
export function assignContactToAdmin(contactId: number): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${contactId}/assign`);
}

// Complete Contact
export function completeContact(contactId: number): Promise<any> {
  // TODO[ziya-karagoz] there is typo in the endpoint name, it should be complete instead of complate
  // TODO[ziya-karagoz] we should fix it in the backend
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${contactId}/complate`);
}
