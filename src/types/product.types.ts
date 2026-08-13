export type ProductCategory = "original" | "tray-hoi";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  /** Longer character-story copy for the detail page. Falls back to `description` when absent. */
  story?: string;
  price: number;
  imageUrl?: string;
  /** Toàn bộ ảnh sản phẩm (nhiều góc), dùng cho dải thumbnail ở trang chi tiết. images[0] === imageUrl. */
  images?: string[];
  category: ProductCategory;
  isNew?: boolean;
  badges?: string[];
  /** QR code image for the product, used in the product detail page. */
  qrCodeUrl?: string;
}
