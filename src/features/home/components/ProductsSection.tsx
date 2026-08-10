import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchProducts } from "@/features/products/productSlice";
import ProductCard from "@/features/products/components/ProductCard";
import { formatCurrency } from "@/utils/formatCurrency";

const COMBO_PRICE = 2890000;
const COMBO_ORIGINAL_PRICE = 3230000;

const ProductsSection = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <section id="products" className="bg-surface-container-low px-gutter py-section-gap md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-secondary">Bộ sưu tập Tễu Tạc</h2>

        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-secondary/50 bg-primary-container p-8">
          <div className="absolute inset-0 z-0 bg-secondary/5 opacity-50" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h3 className="mb-4 font-headline-lg text-[32px] text-secondary">Bộ sưu tập Tễu Trẩy Hội</h3>
              <p className="mb-2 font-body-lg text-on-surface">
                Sở hữu trọn bộ 5 mô hình Tễu Tạc với ưu đãi đặc biệt.
              </p>
              <p className="font-body-md text-on-surface-variant">Tặng kèm đế trưng bày và hộp quà cao cấp.</p>
            </div>
            <div className="text-right">
              <div className="mb-4 font-headline-lg text-secondary">
                {formatCurrency(COMBO_PRICE)}{" "}
                <span className="ml-2 text-lg text-on-surface-variant line-through">
                  {formatCurrency(COMBO_ORIGINAL_PRICE)}
                </span>
              </div>
              <Link
                to="/products"
                className="ghost-border inline-block rounded bg-deep-red px-8 py-3 font-label-lg text-label-lg text-inverse-surface shadow-[0_0_15px_rgba(233,195,73,0.2)] transition-all hover:shadow-[0_0_20px_rgba(233,195,73,0.4)]"
              >
                Mua Trọn Bộ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
