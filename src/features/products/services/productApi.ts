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
import teuQuy4 from "@/assets/images/Tễu Quy (4).png";

import teuPhung1 from "@/assets/images/Tễu Phụng (1).png";
import teuPhung2 from "@/assets/images/Tễu Phụng (2).png";
import teuPhung3 from "@/assets/images/Tễu Phụng (3).png";
import teuPhung4 from "@/assets/images/Tễu Phụng (4).png";

// Import QR images
import qrTeuOriginal from "@/assets/images/QR-Tễu Ori.png";
import qrTeuLong from "@/assets/images/QR-Tễu Long.png";
import qrTeuLan from "@/assets/images/QR-Tễu Lân.png";
import qrTeuQuy from "@/assets/images/QR-Tễu Quy.png";
import qrTeuPhung from "@/assets/images/QR-Tễu Phụng.png";

// Mock data — shape mirrors the future API response so swapping to axiosClient later is a one-file change.
const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "teu-original",
    name: "Tễu Original",
    description:
      "Mô hình DIY Chú Tễu lấy cảm hứng từ nghệ thuật múa rối nước Việt Nam. Tự tay lắp ráp, hoàn thiện và tạo chuyển động cho Tễu bằng hệ thống dây treo.",
    story:
      "Biểu tượng linh hồn của nghệ thuật múa rối nước Việt Nam. Với nụ cười hóm hỉnh và dáng vẻ gần gũi, Chú Tễu là nhân vật đầu tiên xuất hiện trên mặt nước, dẫn dắt khán giả bước vào thế giới đầy màu sắc của nghệ thuật dân gian Việt Nam. Không chỉ là người kể chuyện, Chú Tễu còn đại diện cho tinh thần lạc quan, thông minh và sự dí dỏm của người nông dân Việt qua bao thế hệ",
    price: 580000,
    category: "original",
    imageUrl: teuOriginal1,
    images: [teuOriginal1, teuOriginal2, teuOriginal3, teuOriginal4],
    qrCodeUrl: qrTeuOriginal,
  },
  {
    id: "2",
    slug: "teu-long",
    name: "Tễu Long",
    description:
      "Phiên bản thuộc bộ Tễu Trẩy Hội, lấy cảm hứng từ hình tượng Long trong Tứ Linh.",
    story:
      'Tễu Long không chỉ là một con rối, mà là hiện thân của sức mạnh và sự may mắn. Trong dân gian, Tễu thường mở màn các tích trò, mang lại tiếng cười phá bĩnh nhưng sâu sắc. Phiên bản "Long" khoác lên mình lớp áo hội, vảy rồng dát vàng mỏng, tượng trưng cho ước vọng mưa thuận gió hòa của nền văn minh lúa nước.',
    price: 685000,
    category: "tray-hoi",
    isNew: true,
    badges: ["Bán chạy", "Mô hình cao cấp"],
    imageUrl: teuLong1,
    images: [teuLong1, teuLong2, teuLong3, teuLong4],
    qrCodeUrl: qrTeuLong,
  },
  {
    id: "3",
    slug: "teu-lan",
    name: "Tễu Lân",
    description:
      "Tễu Lân thuộc bộ sưu tập Tễu Trẩy Hội, lấy cảm hứng từ hình tượng Lân – biểu tượng của niềm vui, may mắn và không khí lễ hội trong văn hóa Việt Nam.",
    story:
      "Sứ giả của may mắn, thịnh vượng và niềm vui. Lấy cảm hứng từ linh vật Lân trong văn hóa Á Đông, Tễu Lân mang theo nguồn năng lượng tích cực, tượng trưng cho sự may mắn, hạnh phúc và thành công. Hình ảnh vui tươi, sinh động của nhân vật giúp lan tỏa không khí lễ hội, đồng thời gửi gắm những lời chúc tốt đẹp đến mọi người.",
    price: 640000,
    category: "tray-hoi",
    imageUrl: teuLan1,
    images: [teuLan1, teuLan2, teuLan3, teuLan4],
    qrCodeUrl: qrTeuLan,
  },
  {
    id: "4",
    slug: "teu-quy",
    name: "Tễu Quy",
    description:
      "Lấy cảm hứng từ hình tượng Quy trong văn hóa Việt Nam, Tễu Quy tượng trưng cho sự bền vững, trí tuệ và trường tồn.",
    story:
      "Biểu tượng của trí tuệ, bền bỉ và bình an. Mang hình tượng Quy – linh vật gắn liền với sự trường tồn, trí tuệ và bình an, Tễu Quy đem đến cảm giác vững chãi, điềm tĩnh nhưng vẫn gần gũi và đáng yêu. Nhân vật là sự kết hợp giữa tinh thần hóm hỉnh của Chú Tễu và ý nghĩa sâu sắc của Rùa trong văn hóa Việt, gửi gắm thông điệp về sự kiên trì, bản lĩnh và những giá trị bền vững theo thời gian.",
    price: 640000,
    category: "tray-hoi",
    imageUrl: teuQuy1,
    images: [teuQuy1, teuQuy2, teuQuy3, teuQuy4],
    qrCodeUrl: qrTeuQuy,
  },
  {
    id: "5",
    slug: "teu-phung",
    name: "Tễu Phụng",
    description:
      "Lấy cảm hứng từ hình tượng Phụng trong văn hóa Việt Nam, Tễu Phụng tượng trưng cho vẻ đẹp, sự cao quý và tái sinh.",
    story:
      "Vẻ đẹp thanh cao và khát vọng vươn mình. Lấy cảm hứng từ hình tượng Phụng – linh vật tượng trưng cho sự cao quý, hòa hợp và thịnh vượng, Tễu Phụng mang đến vẻ đẹp mềm mại, rực rỡ nhưng vẫn đầy khí chất. Sự kết hợp giữa nét duyên dáng của Chú Tễu và hình ảnh Phụng bay cao tạo nên một nhân vật đại diện cho sự tái sinh, niềm hy vọng và khát vọng vươn tới những điều tốt đẹp.",
    price: 685000,
    category: "tray-hoi",
    imageUrl: teuPhung1,
    images: [teuPhung1, teuPhung2, teuPhung3, teuPhung4],
    qrCodeUrl: qrTeuPhung,
  },
];

export const getProducts = async (): Promise<Product[]> => {
  return PRODUCTS;
};
