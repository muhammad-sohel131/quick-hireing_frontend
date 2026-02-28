import Image from "next/image";
import JobListItem from "./JobListItem";


const latestJobs = [
  {
    logo: "/logos/nomad.png",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: [
      { text: "Full-Time", color: "#C2F0E9" },
      { text: "Marketing", color: "#FEC89A" },
      { text: "Design", color: "#C7C9FF" },
    ],
  },
  {
    logo: "/logos/netlify.png",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: [
      { text: "Full-Time", color: "#C2F0E9" },
      { text: "Marketing", color: "#FEC89A" },
      { text: "Design", color: "#C7C9FF" },
    ],
  },
  {
    logo: "/logos/nomad.png",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: [
      { text: "Full-Time", color: "#C2F0E9" },
      { text: "Marketing", color: "#FEC89A" },
      { text: "Design", color: "#C7C9FF" },
    ],
  },
  {
    logo: "/logos/netlify.png",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: [
      { text: "Full-Time", color: "#C2F0E9" },
      { text: "Marketing", color: "#FEC89A" },
      { text: "Design", color: "#C7C9FF" },
    ],
  },
  {
    logo: "/logos/nomad.png",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: [
      { text: "Full-Time", color: "#C2F0E9" },
      { text: "Marketing", color: "#FEC89A" },
      { text: "Design", color: "#C7C9FF" },
    ],
  },
  {
    logo: "/logos/netlify.png",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: [
      { text: "Full-Time", color: "#C2F0E9" },
      { text: "Marketing", color: "#FEC89A" },
      { text: "Design", color: "#C7C9FF" },
    ],
  },
];

export default function LatestJobs() {
  return (
    <section className="bg-[url('/images/latest-bg.png')] bg-no-repeat bg-cover relative">
      <div className="flex justify-between cs-container pt-14 items-center mb-6">
        <h2 className="text-xl lg:text-5xl font-bold text-[var(--neutrals-100)]">
          Latest <span className="text-[var(--accentColor)]">jobs open</span>
        </h2>
        <a href="#" className="text-[var(--brandColor)] text-sm flex items-center gap-1">
          Show all jobs →
        </a>
      </div>

      <div className="grid cs-container pb-14 grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {latestJobs.map((job) => (
          <JobListItem key={job.title + job.company} {...job} />
        ))}
      </div>
      <Image src="/images/latestPattern.png" width={1000} height={400} alt="latestPattern" className="absolute right-0 top-0 bottom-0 h-full"/>
    </section>
  );
}