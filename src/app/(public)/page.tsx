import CategoriesSection from "@/components/CategoriesSection";
import CTASection from "@/components/CTASection";
import FeaturedJobs from "@/components/FeaturedJobs";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";

export default function Home() {
  return (
   <>
    <HeroSection />
    <CategoriesSection />
    <CTASection />
    <FeaturedJobs />
    <LatestJobs />
   </>
  );
}
