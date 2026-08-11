import { useState } from "react";
import Icon from "@/components/common/Icon";
import YouTubeModal from "@/components/common/YouTubeModal";
import aboutImage from "@/assets/images/gallery-parade-marionette-woman.jpg";

const FEATURES = [
  { icon: "account_balance", title: "Văn hóa múa rối nước" },
  { icon: "construction", title: "Trải nghiệm DIY" },
  { icon: "animation", title: "Tương tác chuyển động" },
  { icon: "redeem", title: "Trưng bày & sưu tầm" },
];

const ABOUT_VIDEO_ID = "_jMsW14KDm4";

const AboutSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section
      id="about"
      className="mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop"
    >
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-headline-lg text-headline-lg text-secondary">
            Chạm vào văn hóa qua trải nghiệm Tễu Tạc
          </h2>
          <p className="mb-8 font-body-md text-body-md leading-relaxed text-on-surface-variant">
            Tễu Tạc phát triển Chú Tễu – hình tượng quen thuộc của nghệ thuật
            múa rối nước Việt Nam – thành bộ mô hình văn hóa DIY hiện đại. Người
            dùng không chỉ tự tay lắp ráp mà còn có thể điều khiển nhân vật bằng
            cơ chế dây treo, trưng bày và sưu tầm các phiên bản trong bộ sưu
            tập.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="ghost-border group relative overflow-hidden rounded-lg bg-surface-container-highest p-6"
              >
                <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-secondary opacity-50" />
                <Icon
                  name={feature.icon}
                  className="mb-4 text-3xl text-secondary"
                />
                <h3 className="font-headline-sm text-[18px] text-on-background transition-colors group-hover:text-secondary">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="ghost-border relative h-[600px] overflow-hidden rounded-lg bg-surface-container p-2">
          <button
            type="button"
            onClick={() => ABOUT_VIDEO_ID && setIsVideoOpen(true)}
            disabled={!ABOUT_VIDEO_ID}
            aria-label="Xem video giới thiệu Tễu Tạc"
            className="group relative block h-full w-full overflow-hidden rounded disabled:cursor-default"
          >
            <img
              src={aboutImage}
              alt="Nghệ nhân trình diễn rối tại lễ hội truyền thống Việt Nam"
              className="h-full w-full object-cover transition-transform duration-500 group-enabled:group-hover:scale-105"
            />
            {/* Overlay tối theo DESIGN.md để khung ảnh hài hòa với nền forest green xung quanh */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            {ABOUT_VIDEO_ID && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-secondary bg-background/60 shadow-[0_0_25px_rgba(233,195,73,0.5)] backdrop-blur transition-transform group-hover:scale-110">
                  <Icon name="play_arrow" className="text-4xl text-secondary" />
                </span>
              </div>
            )}
          </button>
        </div>
      </div>

      <YouTubeModal
        videoId={ABOUT_VIDEO_ID}
        open={isVideoOpen && !!ABOUT_VIDEO_ID}
        onClose={() => setIsVideoOpen(false)}
        title="Video giới thiệu Tễu Tạc"
      />
    </section>
  );
};

export default AboutSection;
