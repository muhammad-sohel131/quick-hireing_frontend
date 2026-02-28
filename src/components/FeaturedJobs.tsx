import JobCard from "./JobCard";


const featuredJobs = [
  {
    logo: "/logos/revolt.png",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    tags: [
      { text: "Marketing", color: "#FEC89A" },
      { text: "Design", color: "#C2F0E9" },
    ],
  },
  {
    logo: "/logos/dropbox.png",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    type: "Full Time",
    tags: [
      { text: "Design", color: "#C2F0E9" },
      { text: "Business", color: "#C7C9FF" },
    ],
  },
  // Add remaining 6 jobs...
];

export default function FeaturedJobs() {
  return (
    <section className="cs-container py-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-5xl font-bold text-[var(--neutrals-100)]">
          Featured <span className="text-[var(--accentColor)]">jobs</span>
        </h2>
        <a href="#" className="text-[var(--brandColor)] text-sm flex items-center gap-1">
          Show all jobs →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredJobs.map((job) => (
          <JobCard key={job.title} {...job} />
        ))}
      </div>
    </section>
  );
}