import { BASE } from "@/app/lib/jobApi";
import { Job } from "@/app/types/jobs";
import JobCard from "@/components/ui/JobCard";
import Search from "@/components/ui/Search";

export default async function JobPage() {
  const res = await fetch(`${BASE}/api/jobs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();
  const jobs: Job[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="cs-container pt-12 lg:pt-20">
      <Search />

      {jobs.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No jobs found</p>
      )}

      <div className="grid grid-cols-4 gap-5 my-10">
        {jobs.map((job) => (
          <JobCard key={job._id} {...job} link={true} />
        ))}
      </div>
    </div>
  );
}
