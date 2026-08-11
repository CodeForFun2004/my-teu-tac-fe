import { Link } from "react-router-dom";
import heroBackground from "@/assets/images/Background Image.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden md:min-h-[820px]">
      <div className="absolute inset-0 z-0 bg-primary-container">
        <img
          src={heroBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        {/* Overlay tối theo DESIGN.md: giữ chữ Warm Cream/Gold dễ đọc trên nền ảnh sáng */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-deep-red/20" />
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-3xl px-gutter text-center">
        <h1 className="mb-6 font-display-lg text-display-lg text-secondary drop-shadow-lg">
          Tạc Nét Xưa, Lắp Hình Mới
        </h1>
        <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg text-inverse-surface opacity-90">
          Tễu Tạc mang nghệ thuật múa rối nước đến gần hơn với thế hệ trẻ, kết
          hợp giữa di sản truyền thống và trải nghiệm lắp ráp thủ công tinh tế.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to={{ pathname: "/", hash: "about" }}
            className="rounded border border-secondary bg-surface-container-highest/50 px-8 py-3 font-label-lg text-label-lg text-secondary backdrop-blur transition-colors hover:bg-secondary/10"
          >
            Khám phá ngay
          </Link>
          <Link
            to="/products"
            className="rounded bg-deep-red px-8 py-3 font-label-lg text-label-lg text-inverse-surface shadow-[0_0_15px_rgba(233,195,73,0.3)] transition-all hover:shadow-[0_0_25px_rgba(233,195,73,0.6)]"
          >
            Mua Tễu
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 h-32 w-full bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
