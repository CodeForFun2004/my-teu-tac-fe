export type OrderStatus = "pending" | "paid" | "expired" | "failed";

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  addressDetail: string;
  note?: string;
}

export interface OrderLineItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrderPayload {
  shippingInfo: ShippingInfo;
  items: OrderLineItem[];
}

export interface PaymentOrder {
  orderId: string;
  status: OrderStatus;
  totalAmount: number;
  /** VietQR payload string returned by the backend, render bằng qrcode.react thành ảnh QR. */
  qrCodeText: string;
  /** Trang thanh toán PayOS host sẵn — dùng làm link dự phòng khi khách không quét được QR. */
  checkoutUrl?: string;
  expiresAt: string;
  items: OrderLineItem[];
}
