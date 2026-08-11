import axiosClient from "@/config/axiosClient";
import type { CreateOrderPayload, OrderStatus, PaymentOrder } from "@/features/checkout/types/checkout.types";

export const createOrder = async (payload: CreateOrderPayload): Promise<PaymentOrder> => {
  console.log("[checkoutApi] createOrder payload:", payload);
  try {
    const order = await axiosClient.post<PaymentOrder>("/orders", payload);
    console.log("[checkoutApi] createOrder success:", order);
    return order;
  } catch (error) {
    console.error("[checkoutApi] createOrder failed:", error);
    throw error;
  }
};

export const getOrder = async (orderId: string): Promise<PaymentOrder> => {
  return axiosClient.get<PaymentOrder>(`/orders/${orderId}`);
};

export const getOrderStatus = async (orderId: string): Promise<OrderStatus> => {
  const { status } = await axiosClient.get<{ status: OrderStatus }>(`/orders/${orderId}/status`);
  return status;
};
