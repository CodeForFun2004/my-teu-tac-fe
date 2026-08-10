import paradeMarionettesRow from "@/assets/images/gallery-parade-marionettes-row.jpg";
import teuDrummer from "@/assets/images/gallery-teu-drummer.jpg";
import paradeFlag from "@/assets/images/gallery-parade-flag.jpg";
import workshopTable from "@/assets/images/news-workshop-table.jpg";
import teuLong2 from "@/assets/images/Tễu Long (2).png";

const GallerySection = () => {
  return (
    <section className="mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop">
      <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-secondary">Khoảnh khắc Tễu Tạc</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="ghost-border group relative col-span-2 row-span-2 h-96 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={paradeMarionettesRow}
            alt="Diễu hành rối truyền thống trong lễ hội văn hóa Việt Nam"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={teuDrummer}
            alt="Nghệ nhân biểu diễn rối Chú Tễu"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={paradeFlag}
            alt="Diễu hành rối cùng cờ Tổ quốc"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={teuLong2}
            alt="Chi tiết mô hình Tễu Long"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
        <div className="ghost-border group relative col-span-2 h-48 overflow-hidden rounded-lg bg-surface-container">
          <img
            src={workshopTable}
            alt="Không gian workshop lắp ráp thủ công"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-transparent" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
