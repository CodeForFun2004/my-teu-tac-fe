import type { Product } from "@/types/product.types";

import teuOriginal1 from "@/assets/images/Tễu Original (1).png";
import teuOriginal2 from "@/assets/images/Tễu Original (2).png";
import teuOriginal3 from "@/assets/images/Tễu Original (3).png";
import teuOriginal4 from "@/assets/images/Tễu Original (4).png";

import teuLong1 from "@/assets/images/Tễu Long (1).png";
import teuLong2 from "@/assets/images/Tễu Long (2).png";
import teuLong3 from "@/assets/images/Tễu Long (3).png";
import teuLong4 from "@/assets/images/Tễu Long (4).png";

import teuLan1 from "@/assets/images/Tễu Lân (1).png";
import teuLan2 from "@/assets/images/Tễu Lân (2).png";
import teuLan3 from "@/assets/images/Tễu Lân (3).png";
import teuLan4 from "@/assets/images/Tễu Lân (4).png";

import teuQuy1 from "@/assets/images/Tễu Quy (1).png";
import teuQuy2 from "@/assets/images/Tễu Quy (2).png";
import teuQuy3 from "@/assets/images/Tễu Quy (3).png";

import teuPhung1 from "@/assets/images/Tễu Phụng (1).png";
import teuPhung2 from "@/assets/images/Tễu Phụng (2).png";
import teuPhung3 from "@/assets/images/Tễu Phụng (3).png";

// Mock data — shape mirrors the future API response so swapping to axiosClient later is a one-file change.
const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "teu-original",
    name: "Tễu Original",
    description:
      "Phiên bản Chú Tễu nguyên bản, lấy cảm hứng từ nghệ thuật múa rối nước Việt Nam.",
    price: 5800,
    category: "original",
    imageUrl: teuOriginal1,
    images: [teuOriginal1, teuOriginal2, teuOriginal3, teuOriginal4],
  },
  {
    id: "2",
    slug: "teu-long",
    name: "Tễu Long",
    description:
      "Phiên bản thuộc bộ Tễu Trẩy Hội, lấy cảm hứng từ hình tượng Long trong Tứ Linh.",
    story:
      'Tễu Long không chỉ là một con rối, mà là hiện thân của sức mạnh và sự may mắn. Trong dân gian, Tễu thường mở màn các tích trò, mang lại tiếng cười phá bĩnh nhưng sâu sắc. Phiên bản "Long" khoác lên mình lớp áo hội, vảy rồng dát vàng mỏng, tượng trưng cho ước vọng mưa thuận gió hòa của nền văn minh lúa nước.',
    price: 6850,
    category: "tray-hoi",
    isNew: true,
    badges: ["Bán chạy", "Mô hình cao cấp"],
    imageUrl: teuLong1,
    images: [teuLong1, teuLong2, teuLong3, teuLong4],
  },
  {
    id: "3",
    slug: "teu-lan",
    name: "Tễu Lân",
    description:
      "Phiên bản thuộc bộ Tễu Trẩy Hội, lấy cảm hứng từ hình tượng Lân trong Tứ Linh.",
    price: 6400,
    category: "tray-hoi",
    imageUrl: teuLan1,
    images: [teuLan1, teuLan2, teuLan3, teuLan4],
  },
  {
    id: "4",
    slug: "teu-quy",
    name: "Tễu Quy",
    description:
      "Phiên bản thuộc bộ Tễu Trẩy Hội, lấy cảm hứng từ hình tượng Quy trong Tứ Linh.",
    price: 6400,
    category: "tray-hoi",
    imageUrl: teuQuy1,
    images: [teuQuy1, teuQuy2, teuQuy3],
  },
  {
    id: "5",
    slug: "teu-phung",
    name: "Tễu Phụng",
    description:
      "Phiên bản thuộc bộ Tễu Trẩy Hội, lấy cảm hứng từ hình tượng Phụng trong Tứ Linh.",
    price: 6850,
    category: "tray-hoi",
    imageUrl: teuPhung1,
    images: [teuPhung1, teuPhung2, teuPhung3],
  },
];

export const getProducts = async (): Promise<Product[]> => {
  return PRODUCTS;
};
