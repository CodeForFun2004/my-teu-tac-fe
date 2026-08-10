import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon";
import { useAppSelector } from "@/hooks/useRedux";

const PRODUCT_CATEGORIES = [
  "Tễu Original",
  "Tễu Long",
  "Tễu Lân",
  "Tễu Quy",
  "Tễu Phụng",
];

const navLinkClass =
  "rounded px-3 py-2 font-label-lg text-label-lg text-on-surface-variant transition-all hover:bg-surface-variant/20 hover:text-secondary";

interface NavLinksProps {
  onNavigate?: () => void;
}

const NavLinks = ({ onNavigate }: NavLinksProps) => (
  <>
    <Link to={{ pathname: "/", hash: "about" }} className={navLinkClass} onClick={onNavigate}>
      Giới thiệu
    </Link>

    <div className="group relative">
      <button
        type="button"
        className={`flex items-center gap-1 ${navLinkClass}`}
      >
        Sản phẩm
        <Icon name="expand_more" className="text-[18px]" />
      </button>
      <div className="invisible absolute left-0 top-full w-48 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded border border-secondary/30 bg-surface shadow-xl">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category}
              to="/products"
              onClick={onNavigate}
              className="block border-b border-secondary/10 px-4 py-3 font-label-lg text-label-lg text-secondary transition-colors last:border-b-0 hover:bg-secondary/10"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>

    <Link to={{ pathname: "/", hash: "workshop" }} className={navLinkClass} onClick={onNavigate}>
      Workshop
    </Link>
    <Link to={{ pathname: "/", hash: "news" }} className={navLinkClass} onClick={onNavigate}>
      Tin tức
    </Link>
  </>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-secondary/30 bg-[#002114] shadow-sm">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-gutter md:px-margin-desktop">
        <Link
          to="/"
          className="font-headline-sm text-headline-sm text-secondary"
        >
          Tễu Tạc
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <span className="hidden cursor-pointer rounded px-2 py-1 font-label-lg text-label-lg text-on-surface-variant transition-all hover:bg-surface-variant/20 hover:text-secondary md:inline">
            VI/EN
          </span>
          <Link
            to="/cart"
            aria-label="Giỏ hàng"
            className="relative text-on-surface-variant transition-colors hover:text-secondary"
          >
            <Icon name="shopping_cart" />
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-deep-red px-1 text-[10px] font-label-md text-inverse-surface">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            to="/products"
            className="ghost-border rounded bg-deep-red px-6 py-2 font-label-lg text-label-lg text-inverse-surface transition-all hover:border-secondary"
          >
            Mua Ngay
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            className="text-on-surface-variant md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-1 border-t border-secondary/20 bg-[#002114] px-gutter py-4 md:hidden">
          <NavLinks onNavigate={() => setIsMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
