import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import {
  INotificationCountResponse,
  INotificationCreateRequest,
  INotificationResponseP,
} from "../models/notification.interface";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "admin-notification";

// Get Pageable Users
export function fetchNotifications({
  skip,
  take,
  sort,
  filter,
  status,
}: FetchListParams & { status: string }): Promise<
  PageableResponseModel<INotificationResponseP>
> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
      status,
    },
  });
}

// Get Notification Count
export function fetchNotificationCount(): Promise<INotificationCountResponse> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/count`);
}

// Get Single Notification
export function readSingleNotification(
  id: number
): Promise<INotificationResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

//! Create Notification
//! Development Purposes Only
//! For the sake of the Eldritch Gods, please don't use this in production
export function createNotification(
  data: INotificationCreateRequest
): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}
