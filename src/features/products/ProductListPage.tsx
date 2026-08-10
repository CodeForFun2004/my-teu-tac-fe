import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchProducts } from "@/features/products/productSlice";
import ProductCard from "@/features/products/components/ProductCard";
import Icon from "@/components/common/Icon";
import type { ProductCategory } from "@/types/product.types";

type ActiveFilter = "all" | ProductCategory;
type SortOrder = "default" | "price-asc" | "price-desc";

const FILTERS: { label: string; value: ActiveFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Tễu Original", value: "original" },
  { label: "Tễu Trẩy Hội", value: "tray-hoi" },
];

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: "Mặc định", value: "default" },
  { label: "Giá: thấp đến cao", value: "price-asc" },
  { label: "Giá: cao đến thấp", value: "price-desc" },
];

const filterButtonClass = (isActive: boolean) =>
  `rounded-full border px-6 py-2 font-label-lg text-label-lg transition-all ${
    isActive
      ? "border-secondary bg-secondary/10 text-secondary"
      : "border-outline text-on-surface-variant hover:border-secondary hover:text-secondary"
  }`;

const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const visibleProducts = useMemo(() => {
    const filtered = activeFilter === "all" ? items : items.filter((product) => product.category === activeFilter);
    if (sortOrder === "default") return filtered;
    const sorted = [...filtered];
    sorted.sort((a, b) => (sortOrder === "price-asc" ? a.price - b.price : b.price - a.price));
    return sorted;
  }, [items, activeFilter, sortOrder]);

  return (
    <div className="relative mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop">
      <div className="relative mb-16 text-center">
        <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
        <h1 className="mb-4 mt-8 font-headline-lg text-headline-lg text-secondary">Các sản phẩm Tễu Tạc</h1>
        <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Chọn một Tễu để bắt đầu hành trình lắp ráp và khám phá câu chuyện văn hóa phía sau mỗi nhân vật.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-4 border-b border-secondary/20 pb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={filterButtonClass(activeFilter === filter.value)}
          >
            {filter.label}
          </button>
        ))}
        <div className="relative">
          <select
            aria-label="Sắp xếp theo giá"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            className="appearance-none rounded-full border border-outline bg-transparent py-2 pl-6 pr-10 font-label-lg text-label-lg text-on-surface-variant transition-all hover:border-secondary hover:text-secondary focus:border-secondary focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface text-on-background">
                {option.label}
              </option>
            ))}
          </select>
          <Icon
            name="expand_more"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[16px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} variant="detailed" />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
