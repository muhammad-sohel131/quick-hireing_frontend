"use client"
import Image from "next/image";
import JobListItem from "./JobListItem";
import { useJob } from "@/app/hooks/useJob";
import Loading from "./Loading";
import Link from "next/link";

export default function LatestJobs() {
  const {jobs: latestJobs, jobsLoading} = useJob()
  if(jobsLoading){
    return <Loading />
  }
  return (
    <section className="bg-[url('/images/latest-bg.png')] bg-no-repeat bg-cover relative">
      <div className="flex justify-between cs-container pt-14 items-center mb-6">
        <h2 className="text-xl lg:text-5xl font-bold text-[var(--neutrals-100)]">
          Latest <span className="text-[var(--accentColor)]">jobs open</span>
        </h2>
        <Link href="/jobs" className="text-[var(--brandColor)] cursor-pointer text-sm flex items-center gap-1">
          Show all jobs →
        </Link>
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