import Icon from "@/components/common/Icon";
import workshopImage from "@/assets/images/news-workshop-craft.jpg";
import fairImage from "@/assets/images/news-craft-fair.jpg";
import collectionImage from "@/assets/images/Background Image.png";

interface NewsItem {
  category: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  image: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    category: "Workshop",
    title: "Workshop Lắp Ráp Tễu Cuối Tuần",
    description:
      "Cùng gia đình tận hưởng cuối tuần sáng tạo với mô hình Tễu Tạc.",
    date: "15/10/2026",
    location: "Tễu Tạc Studio, Đà Nẵng",
    image: workshopImage,
  },
  {
    category: "Sự kiện",
    title: "Tễu Tạc tại Hội Chợ Thủ Công Mỹ Nghệ",
    description:
      "Gặp gỡ và trải nghiệm các sản phẩm mới nhất của Tễu Tạc tại sự kiện thường niên.",
    date: "20/10 - 22/10/2026",
    location: "Cung Triển Lãm Kiến Trúc, Đà Nẵng",
    image: fairImage,
  },
  {
    category: "Sản phẩm mới",
    title: "Ra mắt Bộ Sưu Tập Tễu Trẩy Hội",
    description:
      "Khám phá ý nghĩa văn hóa đằng sau bộ sưu tập Long - Lân - Quy - Phụng.",
    date: "01/11/2026",
    location: "Tễu Tạc Studio, Đà Nẵng",
    image: collectionImage,
  },
];

const NewsSection = () => {
  return (
    <section
      id="news"
      className="bg-surface-container-low px-gutter py-section-gap md:px-margin-desktop"
    >
      <div className="mx-auto max-w-container-max">
        <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-secondary">
          Tin tức & Workshop sắp tới
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.title}
              className="ghost-border group flex h-full flex-col overflow-hidden rounded-lg bg-surface-container-highest"
            >
              <div className="h-48 overflow-hidden bg-surface-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-grow p-6">
                <span className="mb-2 block font-label-md text-xs uppercase tracking-wider text-secondary">
                  {item.category}
                </span>
                <h3 className="mb-3 font-headline-sm text-[20px] text-on-background transition-colors group-hover:text-secondary">
                  {item.title}
                </h3>
                <p className="mb-4 font-body-md text-sm text-on-surface-variant">
                  {item.description}
                </p>
                <div className="mt-auto flex flex-col gap-1 text-sm text-on-surface-variant/70">
                  <span className="flex items-center gap-2">
                    <Icon name="calendar_month" className="text-[16px]" />
                    {item.date}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-2">
                      <Icon name="location_on" className="text-[16px]" />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
