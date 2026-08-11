import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon";
import { formatCurrency } from "@/utils/formatCurrency";
import { useAppDispatch } from "@/hooks/useRedux";
import { addItem } from "@/features/cart/cartSlice";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  variant?: "compact" | "detailed" | "related";
}

const ProductCard = ({ product, variant = "compact" }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const detailHref = `/products/${product.slug}`;
  const handleAddToCart = () => dispatch(addItem({ product, quantity: 1 }));

  if (variant === "related") {
    return (
      <Link to={detailHref} className="ghost-border group block bg-surface-container-low">
        <div className="flex aspect-square items-center justify-center overflow-hidden bg-surface-dim p-4">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          ) : (
            <Icon name="image" className="text-4xl text-on-surface-variant/40" />
          )}
        </div>
        <div className="border-t border-outline-variant p-4">
          <h3 className="mb-1 font-label-lg text-label-lg text-inverse-surface">{product.name}</h3>
          <p className="font-body-md text-body-md text-secondary">{formatCurrency(product.price)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "detailed") {
    return (
      <div className="group relative flex h-full flex-col overflow-hidden rounded border border-secondary/30 bg-surface-container-low p-4 transition-all duration-300 hover:border-secondary hover:shadow-[0_0_15px_rgba(233,195,73,0.1)]">
        <div className="pointer-events-none absolute left-0 top-0 m-2 h-6 w-6 border-l border-t border-secondary opacity-50" />
        <div className="pointer-events-none absolute right-0 top-0 m-2 h-6 w-6 border-r border-t border-secondary opacity-50" />

        <Link
          to={detailHref}
          className="relative mb-6 flex aspect-square items-center justify-center overflow-hidden rounded border border-secondary/20 bg-surface-container p-4"
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Icon name="image" className="text-5xl text-on-surface-variant/40" />
          )}
        </Link>

        <div className="flex flex-grow flex-col">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-headline-sm text-headline-sm text-secondary">{product.name}</h3>
            {product.isNew && (
              <span className="whitespace-nowrap rounded-full bg-deep-red px-2 py-1 text-xs font-label-md text-inverse-surface">
                Mới
              </span>
            )}
          </div>
          {product.description && (
            <p className="mb-4 flex-grow font-body-md text-body-md text-on-surface-variant">
              {product.description}
            </p>
          )}
          <div className="mb-6 font-headline-sm text-headline-sm text-on-surface">
            {formatCurrency(product.price)}
          </div>
          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
              className="flex-1 rounded bg-deep-red py-3 font-label-lg text-label-lg text-inverse-surface transition-opacity hover:opacity-90"
            >
              Thêm vào giỏ
            </button>
            <Link
              to={detailHref}
              className="flex-1 rounded border border-secondary py-3 text-center font-label-lg text-label-lg text-secondary transition-colors hover:bg-secondary/10"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ghost-border group overflow-hidden rounded-lg bg-surface-container-highest">
      <Link to={detailHref} className="block">
        <div className="relative h-64 bg-surface-container p-4">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          ) : null}
          <div className="absolute inset-0 z-10 bg-secondary/10 transition-colors group-hover:bg-transparent" />
        </div>
      </Link>
      <div className="p-6">
        <Link to={detailHref}>
          <h3 className="mb-2 font-headline-sm text-[24px] text-secondary">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-on-background">{formatCurrency(product.price)}</span>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Thêm ${product.name} vào giỏ hàng`}
            className="rounded-full p-2 text-secondary transition-colors hover:bg-secondary/10"
          >
            <Icon name="add_shopping_cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
