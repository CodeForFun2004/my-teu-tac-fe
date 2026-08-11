import moment0 from "@/assets/images/khoảnh khắc Tễu Tạc.jpg";
import moment1 from "@/assets/images/khoảnh khắc Tễu Tạc (1).jpg";
import moment2 from "@/assets/images/khoảnh khắc Tễu Tạc (2).jpg";
import moment3 from "@/assets/images/khoảnh khắc Tễu Tạc (3).jpg";
import moment4 from "@/assets/images/khoảnh khắc Tễu Tạc (4).jpg";

const GallerySection = () => {
  return (
    <section className="mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop">
      <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-secondary">Khoảnh khắc Tễu Tạc</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="ghost-border group relative col-span-2 row-span-2 h-96 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={moment0}
            alt="Khoảnh khắc Tễu Tạc"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={moment1}
            alt="Khoảnh khắc Tễu Tạc 1"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={moment4}
            alt="Khoảnh khắc Tễu Tạc 2"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={moment3}
            alt="Khoảnh khắc Tễu Tạc 3"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative col-span-2 h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={moment2}
            alt="Khoảnh khắc Tễu Tạc 4"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
