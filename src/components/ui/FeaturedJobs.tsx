"use client";
import { useJob } from "@/app/hooks/useJob";
import JobCard from "./JobCard";
import { useMemo } from "react";
import Link from "next/link";

export default function FeaturedJobs() {
  const { jobs } = useJob();

  const featuredJobs = useMemo(() => {
    return jobs?.filter((job) => job.isFeatured) || [];
  }, [jobs]);

  return (
    <section className="cs-container py-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-5xl font-bold text-[var(--neutrals-100)]">
          Featured <span className="text-[var(--accentColor)]">jobs</span>
        </h2>
        <Link
          href="/jobs"
          className="text-[var(--brandColor)] text-sm flex items-center gap-1"
        >
          Show all jobs →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredJobs.map((job) => (
          <JobCard key={job.title} {...job} />
        ))}
      </div>
    </section>
  );
}
