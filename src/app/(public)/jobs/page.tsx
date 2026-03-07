import { BASE } from "@/app/lib/jobApi";
import { Job } from "@/app/types/jobs";
import JobCard from "@/components/ui/JobCard";
import Search from "@/components/ui/Search";
import Link from "next/link";

type Props = {
  searchParams: {
    search?: string;
    location?: string;
    category?: string;
  };
};

export default async function JobPage({ searchParams }: Props) {
  const params = await searchParams;

  const res = await fetch(`${BASE}/api/jobs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();
  const jobs: Job[] = Array.isArray(data?.data) ? data.data : [];

  const search = params?.search?.toLowerCase() || "";
  const location = params?.location?.toLowerCase() || "";
  const category = params?.category?.toLowerCase() || "";

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = search
      ? job.title.toLowerCase().includes(search)
      : true;

    const categoryMatch = category
      ? job.category.some((cat) =>
          cat.toLowerCase().includes(category)
        )
      : true;

    const locationMatch = location
      ? job.location.toLowerCase().includes(location)
      : true;

    return titleMatch && categoryMatch && locationMatch;
  });

  const isFilterActive = search || location || category;

  return (
    <>
      <div className="bg-[var(--brandColor)] h-[30vh] flex items-center justify-center">
        <Search />
      </div>

      <div className="cs-container pt-12 lg:pt-20">

        {/* Clear Filter Button */}
        {isFilterActive && (
          <div className="flex justify-end mb-4">
            <Link
              href="/jobs"
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Clear Filters
            </Link>
          </div>
        )}

        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No jobs found</p>
        )}

        <div className="grid grid-cols-4 gap-5 my-10">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} {...job} link={true} />
          ))}
        </div>
      </div>
    </>
  );
}