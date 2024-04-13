export interface INotificationResponseP {
  id: number;
  title: string;
  content: string;
  is_readed: boolean;
  created_at: string;
  updated_at: string;
}

export interface INotificationCountResponse {
  all: number;
  not_read: number;
  read: number;
}

//! Development Purposes Only
//! For the sake of the Eldritch Gods, please don't use this in production
export interface INotificationCreateRequest {
  title: string;
  content: string;
}
