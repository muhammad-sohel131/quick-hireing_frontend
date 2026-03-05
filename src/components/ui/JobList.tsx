import { useJob } from "@/app/hooks/useJob";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";

export default function JobList() {
  const { jobs, jobsLoading, deleteJob } = useJob();
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[var(--neutrals-20)] overflow-hidden">
      <div className="bg-gradient-to-r from-[var(--neutrals-100)] to-[var(--color-black)] px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <BiPlus />
          All Job Postings ({jobs?.length || 0})
        </h2>
      </div>

      {jobsLoading ? (
        <div className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--neutrals-20)] border-t-[var(--brandColor)] mb-4"></div>
          <p className="text-[var(--neutrals-80)]">Loading jobs...</p>
        </div>
      ) : jobs?.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-[var(--neutrals-20)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-[var(--neutrals-80)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[var(--neutrals-100)] mb-2">
            No jobs yet
          </h3>
          <p className="text-[var(--neutrals-80)]">
            Create your first job posting above
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--neutrals-20)]">
          {jobs.map((job, index) => (
            <div
              key={job._id}
              className="p-6 flex justify-between items-center hover:bg-[var(--neutrals-20)]/20 transition-colors group"
            >
              <div className="flex items-start gap-4">
                {job.companyImageUrl ? (
                  <Image
                    width={200}
                    height={200}
                    src={job.companyImageUrl}
                    alt={job.company}
                    className="w-12 h-12 rounded-xl object-cover border border-[var(--neutrals-20)]"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--brandColor)] to-[var(--accentColor)] rounded-xl flex items-center justify-center text-white font-semibold text-lg">
                    {job.company?.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-[var(--neutrals-100)] group-hover:text-[var(--brandColor)] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-[var(--neutrals-80)] mt-1">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {job?.category?.map((c) => (
                      <span
                        key={c}
                        className="text-xs bg-[var(--neutrals-20)] text-[var(--neutrals-80)] px-3 py-1 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteJob.mutate(job._id)}
                className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <FiDelete />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
