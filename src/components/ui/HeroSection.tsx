import Image from "next/image";
import Search from "./Search";

export default function HeroSection() {
  return (
    <section className="bg-[#F8F8FD] relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center cs-container pt-12 lg:pt-20">
        {/* Text */}
        <div className="pb-12">
          <h1 className="text-[72px] lg:text-[72px] font-bold leading-tight text-[var(--neutrals-100)]">
            Discover <br />
            more than <br />
            <span className="text-[var(--accentColor)]">5000+ Jobs</span>
          </h1>
          <Image
            src="/images/underLine.png"
            className=""
            width={500}
            height={100}
            alt="banner_pattern"
          />
          <p className="mt-4 text-xl lg:text-base text-[var(--neutrals-80)] max-w-md">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search */}
          <Search />
          <p className="text-[16px] text-[var(--neutrals-80)]">Popular : UI Designer, UX Researcher, Android, Admin</p>
        </div>

        {/* Image */}
        <div className="lg:flex hidden justify-center lg:justify-end relative mt-[30px]">
          <Image
            src="/images/bannerPeople.png"
            className="w-[260px] h-[340px] lg:w-[420px] lg:h-[520px] relative z-10"
            width={500}
            height={500}
            alt="banner_people"
          />

          <Image
            src="/images/banner_pattern.png"
            className="absolute  scale-150 -top-10"
            width={2000}
            height={2000}
            alt="banner_pattern"
          />
        </div>
      </div>
      <Image src='/images/heroShape.png' alt="heroshape" width={600} height={200} className="absolute hidden lg:block bottom-0 right-0 z-20" />
    </section>
  );
}
