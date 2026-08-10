import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon";

interface FooterLink {
  label: string;
  href: string;
  /** Nếu set, điều hướng nội bộ tới section trên trang chủ (vd "about") thay vì 1 route riêng. */
  hash?: string;
}

const ABOUT_LINKS: FooterLink[] = [
  { label: "Về chúng tôi", href: "/", hash: "about" },
  { label: "Tin tức", href: "/", hash: "news" },
];

const EXPLORE_LINKS: FooterLink[] = [
  { label: "Bộ sưu tập", href: "/products" },
  { label: "Workshop", href: "/", hash: "workshop" },
];

const SUPPORT_LINKS: FooterLink[] = [
  { label: "Chính sách bảo mật", href: "#" },
  { label: "Điều khoản dịch vụ", href: "#" },
  { label: "Liên hệ", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "facebook", href: "#" },
  { label: "TikTok", icon: "video_library", href: "#" },
  { label: "Instagram", icon: "photo_camera", href: "#" },
];

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div>
    <h4 className="mb-4 font-label-lg text-label-lg font-semibold text-secondary">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.hash ? { pathname: link.href, hash: link.hash } : link.href}
            className="inline-block font-body-md text-on-surface-variant transition-colors duration-200 hover:translate-x-1 hover:text-secondary"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-secondary/20 bg-[#002114] pb-8 pt-16">
      <div className="mx-auto mb-12 grid max-w-container-max grid-cols-1 gap-gutter px-gutter sm:grid-cols-2 md:px-margin-desktop lg:grid-cols-4">
        <div>
          <Link
            to="/"
            className="mb-4 block font-headline-sm text-headline-sm text-secondary"
          >
            Tễu Tạc
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Mô hình DIY văn hóa lấy cảm hứng từ nghệ thuật múa rối nước Việt
            Nam.
          </p>
          <div className="mt-6 flex gap-4">
            {SOCIAL_LINKS.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-secondary transition-all duration-300 hover:scale-110"
              >
                <Icon name={icon} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Về Tễu Tạc" links={ABOUT_LINKS} />
        <FooterColumn title="Khám phá" links={EXPLORE_LINKS} />
        <FooterColumn title="Hỗ trợ" links={SUPPORT_LINKS} />
      </div>

      <div className="mx-auto max-w-container-max border-t border-secondary/10 px-gutter pt-8 text-center font-body-md text-on-surface-variant/70 md:px-margin-desktop">
        © 2026 Tễu Tạc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
