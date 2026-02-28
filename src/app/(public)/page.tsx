import CategoriesSection from "@/components/CategoriesSection";
import Companies from "@/components/Companies";
import CTASection from "@/components/CTASection";
import FeaturedJobs from "@/components/FeaturedJobs";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Companies />
      <CategoriesSection />
      <CTASection />
      <FeaturedJobs />
      <LatestJobs />
    </>
  );
}
