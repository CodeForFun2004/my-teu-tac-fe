import axios, { type AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor trả thẳng response.data — các hàm gọi API nhận về đúng shape mong muốn
// thay vì phải tự unwrap AxiosResponse mỗi lần gọi.
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
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
