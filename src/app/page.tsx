import HeroSection from "@/components/home/HeroSection";
import StatsBanner from "@/components/home/StatsBanner";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import InteractiveStudyHub from "@/components/home/InteractiveStudyHub";
import InstructorsSection from "@/components/home/InstructorsSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBanner />
      <CategoriesSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <InteractiveStudyHub />
      <InstructorsSection />
      <GallerySection />
      <TestimonialsSection />
    </div>
  );
}
