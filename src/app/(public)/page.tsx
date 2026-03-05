import CategoriesSection from "@/components/ui/CategoriesSection";
import Companies from "@/components/ui/Companies";
import CTASection from "@/components/ui/CTASection";
import FeaturedJobs from "@/components/ui/FeaturedJobs";
import HeroSection from "@/components/ui/HeroSection";
import LatestJobs from "@/components/ui/LatestJobs";

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
