import axiosClient from "@/config/axiosClient";
import type { CreateOrderPayload, OrderStatus, PaymentOrder } from "@/features/checkout/types/checkout.types";

export const createOrder = async (payload: CreateOrderPayload): Promise<PaymentOrder> => {
  return axiosClient.post<PaymentOrder>("/orders", payload);
};

export const getOrder = async (orderId: string): Promise<PaymentOrder> => {
  return axiosClient.get<PaymentOrder>(`/orders/${orderId}`);
};

export const getOrderStatus = async (orderId: string): Promise<OrderStatus> => {
  const { status } = await axiosClient.get<{ status: OrderStatus }>(`/orders/${orderId}/status`);
  return status;
};
