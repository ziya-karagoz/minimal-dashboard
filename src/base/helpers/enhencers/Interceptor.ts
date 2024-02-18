import { swal } from "@base/components/common/alerts/SwalAlert";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const I18N_CONFIG_KEY = import.meta.env.VITE_I18N_CONFIG_KEY || "i18n";

const AUTH_LOCAL_STORAGE_KEY =
  import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY || "accessToken";
const api = axios.create();

api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const accessToken =
    localStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    "";
  if (accessToken) {
    if (!request.headers) {
      request.headers = {} as any;
    }
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  let { selectedLang }: any = JSON.parse(
    localStorage.getItem(I18N_CONFIG_KEY) ?? "{}"
  );

  if (selectedLang) {
    if (!request.headers) {
      request.headers = {} as any;
    }
    request.headers["Accept-Language"] = selectedLang;
  } else {
    request.headers["Accept-Language"] = navigator.language.split("-")[0];
  }

  return request;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // Client Errors
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
        sessionStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
        swal
          .fire({
            title: "Yetkiniz Yok",
            text: "Oturum Süreniz dolmuş ya da Yetkinleriniz düzenlenmiş olabilir. Lütfen tekrar giriş yapınız.",
            icon: "error",
            confirmButtonText: "Ok",
          })
          .then(() => {
            window.location.href = "/auth";
          });
      }
      console.error("ERROR::::", error.response);

      return Promise.reject(error);
    }
  }
);

export default api;
