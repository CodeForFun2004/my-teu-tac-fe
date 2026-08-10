import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import WorkshopSection from "./components/WorkshopSection";
import NewsSection from "./components/NewsSection";
import GallerySection from "./components/GallerySection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="gold-gradient-divider mx-auto max-w-container-max opacity-50" />
      <AboutSection />
      <ProductsSection />
      <div className="gold-gradient-divider mx-auto max-w-container-max opacity-50" />
      <WorkshopSection />
      <NewsSection />
      <div className="gold-gradient-divider mx-auto max-w-container-max opacity-50" />
      <GallerySection />
    </>
  );
};

export default HomePage;
