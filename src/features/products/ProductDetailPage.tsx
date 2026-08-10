import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchProducts } from "@/features/products/productSlice";
import { addItem } from "@/features/cart/cartSlice";
import ProductCard from "@/features/products/components/ProductCard";
import Icon from "@/components/common/Icon";
import { formatCurrency } from "@/utils/formatCurrency";

const SPECS = [
  { label: "Loại sản phẩm", value: "Mô hình DIY văn hóa" },
  { label: "Chất liệu chính", value: "PETG" },
  { label: "Cơ chế tương tác", value: "Dây treo" },
  { label: "Hình thức", value: "Tự lắp ráp" },
  { label: "Công dụng", value: "Lắp ráp – tương tác – trưng bày – sưu tầm" },
];

const ASSEMBLY_STEPS = [
  "Chuẩn bị linh kiện",
  "Lắp các bộ phận",
  "Luồn & kết nối dây",
  "Kiểm tra & hoàn thiện",
];

const SUPPORT_ITEMS = [
  {
    icon: "build",
    title: "Thiếu/Hỏng linh kiện?",
    description: "Liên hệ Tễu Tạc để được kiểm tra và hỗ trợ bổ sung hoặc thay thế linh kiện theo chính sách.",
  },
  {
    icon: "support_agent",
    title: "Cần hỗ trợ lắp ráp?",
    description: "Xem hướng dẫn qua QR/video hoặc liên hệ các kênh hỗ trợ khách hàng của Tễu Tạc.",
  },
];

const getBoxContents = (productName: string) => [
  `01 bộ chi tiết mô hình ${productName}`,
  "Phụ kiện dây treo và vòng gỗ",
  "Đế trưng bày họa tiết sóng nước",
  "Thẻ nhân vật",
  "Tờ hướng dẫn lắp ráp",
  "Phụ kiện và vật liệu bảo vệ đi kèm",
];

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const product = items.find((item) => item.slug === slug);
  const relatedProducts = product
    ? items.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
    : [];

  // Đổi sản phẩm (điều hướng qua "Cùng bộ sưu tập") thì quay lại ảnh đầu tiên thay vì giữ index cũ.
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [slug]);

  const gallery = product?.images && product.images.length > 0 ? product.images : product?.imageUrl ? [product.imageUrl] : [];
  const activeImage = gallery[selectedImageIndex] ?? gallery[0];

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ product, quantity }));
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addItem({ product, quantity }));
      navigate("/cart");
    }
  };

  if (status === "loading" || status === "idle") {
    return (
      <div className="mx-auto max-w-container-max px-gutter py-section-gap text-center font-body-md text-on-surface-variant md:px-margin-desktop">
        Đang tải...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-container-max px-gutter py-section-gap text-center md:px-margin-desktop">
        <p className="font-body-lg text-body-lg text-on-surface-variant">Không tìm thấy sản phẩm.</p>
        <Link to="/products" className="mt-4 inline-block font-label-lg text-label-lg text-secondary underline">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop">
      {/* Product Hero */}
      <div className="mb-section-gap grid grid-cols-1 gap-gutter md:grid-cols-2">
        <div>
          <div className="ghost-border relative flex aspect-square items-center justify-center overflow-hidden bg-surface-container-low p-2">
            {activeImage ? (
              <img src={activeImage} alt={product.name} className="relative z-10 h-full w-full object-contain" />
            ) : (
              <Icon name="image" className="text-6xl text-on-surface-variant/40" />
            )}
            <div className="absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-secondary" />
            <div className="absolute right-0 top-0 z-20 h-8 w-8 border-r-2 border-t-2 border-secondary" />
            <div className="absolute bottom-0 left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-secondary" />
          </div>

          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`Xem ảnh ${index + 1} của ${product.name}`}
                  aria-pressed={index === selectedImageIndex}
                  className={`aspect-square overflow-hidden rounded border bg-surface-container-low transition-colors ${
                    index === selectedImageIndex ? "border-secondary" : "border-secondary/20 hover:border-secondary/60"
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {product.badges && product.badges.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="ghost-border inline-block rounded-full px-3 py-1 font-label-md text-label-md text-secondary"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          <h1 className="mb-4 font-headline-lg text-headline-lg text-secondary">{product.name}</h1>
          <p className="mb-6 font-headline-sm text-headline-sm text-inverse-surface">
            {formatCurrency(product.price)}
          </p>
          <div className="gold-gradient-divider mb-6" />
          <p className="mb-8 font-body-lg text-body-lg text-on-surface-variant">
            {product.story ?? product.description}
          </p>

          <div className="mb-8 flex items-center gap-6">
            <div className="ghost-border flex items-center rounded bg-surface-container-low">
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
                className="px-4 py-2 text-secondary transition-colors hover:bg-surface-variant/20"
              >
                <Icon name="remove" className="text-sm" />
              </button>
              <span className="px-4 font-body-md text-body-md text-on-surface">{quantity}</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={() => setQuantity((qty) => qty + 1)}
                className="px-4 py-2 text-secondary transition-colors hover:bg-surface-variant/20"
              >
                <Icon name="add" className="text-sm" />
              </button>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant">Còn hàng</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded border border-secondary py-4 font-label-lg text-label-lg text-secondary transition-all hover:bg-secondary/10"
            >
              <Icon name="add_shopping_cart" />
              Thêm vào giỏ
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 rounded bg-deep-red py-4 font-label-lg text-label-lg text-inverse-surface transition-all hover:shadow-[0_0_15px_rgba(233,195,73,0.4)]"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Detail bento grid */}
      <div className="mb-section-gap grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="ghost-border bg-surface-container-low p-8 md:col-span-2">
          <h2 className="mb-4 font-headline-sm text-headline-sm text-secondary">Câu chuyện nhân vật</h2>
          <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
            {product.story ?? product.description}
          </p>
        </div>

        <div className="ghost-border bg-surface-container-low p-8">
          <h2 className="mb-4 font-headline-sm text-headline-sm text-secondary">Trong hộp có gì?</h2>
          <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
            {getBoxContents(product.name).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon name="check_circle" className="text-lg text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ghost-border flex flex-col justify-between bg-surface-container-low p-8">
          <div>
            <h2 className="mb-4 font-headline-sm text-headline-sm text-secondary">Cách Tễu chuyển động</h2>
            <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
              Điều khiển Tễu bằng cơ chế dây treo và chuyển động tay đơn giản sau khi hoàn thành lắp ráp.
            </p>
          </div>
          <div className="ghost-border relative flex aspect-video items-center justify-center overflow-hidden rounded bg-surface-dim">
            <Icon name="play_circle" className="text-5xl text-secondary" />
          </div>
        </div>

        <div className="ghost-border bg-surface-container-low p-8">
          <h2 className="mb-4 font-headline-sm text-headline-sm text-secondary">Thông tin sản phẩm</h2>
          <div className="space-y-4">
            {SPECS.map((spec) => (
              <div key={spec.label} className="flex justify-between border-b border-outline-variant pb-2">
                <span className="font-label-lg text-label-lg text-on-surface-variant">{spec.label}</span>
                <span className="font-body-md text-body-md text-inverse-surface">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ghost-border bg-surface-container-low p-8">
          <h2 className="mb-4 font-headline-sm text-headline-sm text-secondary">Hỗ trợ sau mua</h2>
          <div className="space-y-4">
            {SUPPORT_ITEMS.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-variant text-secondary">
                  <Icon name={item.icon} />
                </div>
                <div>
                  <h3 className="font-label-lg text-label-lg text-inverse-surface">{item.title}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assembly guide */}
      <div className="ghost-border mb-section-gap bg-surface-container-low p-8">
        <h2 className="mb-6 text-center font-headline-md text-headline-md text-secondary">Hướng dẫn lắp ráp</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {ASSEMBLY_STEPS.map((title, index) => (
            <div key={title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-secondary font-headline-sm text-secondary">
                {index + 1}
              </div>
              <h3 className="font-label-lg text-label-lg text-inverse-surface">{title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-headline-md text-headline-md text-secondary">Cùng bộ sưu tập</h2>
            <Link
              to="/products"
              className="flex items-center gap-1 font-label-lg text-label-lg text-secondary transition-colors hover:text-secondary-fixed"
            >
              Xem tất cả
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 md:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} variant="related" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
