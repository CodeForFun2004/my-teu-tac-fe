import axios, { type AxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

console.log("[axiosClient] VITE_API_BASE_URL =", baseURL);

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log(
      `[axiosClient] → ${config.method?.toUpperCase()} ${config.baseURL ?? ""}${config.url}`,
      config.data ?? "",
    );
    return config;
  },
  (error) => {
    console.error("[axiosClient] request setup error:", error);
    return Promise.reject(error);
  },
);

// Interceptor trả thẳng response.data — các hàm gọi API nhận về đúng shape mong muốn
// thay vì phải tự unwrap AxiosResponse mỗi lần gọi.
instance.interceptors.response.use(
  (response) => {
    console.log(
      `[axiosClient] ← ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.data,
    );
    return response.data;
  },
  (error) => {
    // Log toàn bộ chi tiết lỗi gốc trước khi bọc lại thành Error(message) —
    // request lỗi CORS/network sẽ không có error.response, chỉ có error.request.
    console.error("[axiosClient] request failed:", {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      method: error.config?.method,
      status: error.response?.status,
      responseData: error.response?.data,
      code: error.code,
      message: error.message,
      isNetworkOrCorsError: !error.response && !!error.request,
    });
    const message = error.response?.data?.error ?? error.message ?? "Đã có lỗi xảy ra";
    return Promise.reject(new Error(message));
  },
);

// Ép lại kiểu trả về cho khớp với hành vi thật của interceptor ở trên (trả T thay vì AxiosResponse<T>).
const axiosClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance.get(url, config) as unknown as Promise<T>,
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    instance.post(url, data, config) as unknown as Promise<T>,
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    instance.put(url, data, config) as unknown as Promise<T>,
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance.delete(url, config) as unknown as Promise<T>,
};

export default axiosClient;
