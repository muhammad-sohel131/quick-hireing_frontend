import Image from "next/image";
import { BASE } from "@/app/lib/jobApi";
import { Job } from "@/app/types/jobs";
import Tag from "@/components/ui/Tag";
import ApplyJobForm from "@/components/ui/ApplyJobForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function JobDetailsPage({ params }: PageProps) {
  const paramsObj = await params
  const res = await fetch(`${BASE}/api/jobs/${paramsObj.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch job details");
  }

  const data = await res.json();
  const job: Job = data?.data;

  return (
    <div className="cs-container pt-12 lg:pt-20 max-w-4xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <Image
          src={job.companyImageUrl}
          alt={job.company}
          width={80}
          height={80}
          className="rounded-xl border border-[var(--neutrals-20)]"
        />

        <div>
          <h1 className="text-2xl font-semibold text-[var(--neutrals-100)]">
            {job.title}
          </h1>
          <p className="text-[var(--neutrals-80)] text-sm mt-1">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.category.map((cat) => (
          <Tag key={cat} text={cat} color="#C2F0E9" />
        ))}
      </div>

      {/* Description */}
      <div className="bg-white border border-[var(--neutrals-20)] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--neutrals-100)] mb-3">
          Job Description
        </h2>
        <p className="text-sm text-[var(--neutrals-80)] leading-relaxed whitespace-pre-line">
          {job.description}
        </p>
      </div>

      {/* Apply Form */}
      <ApplyJobForm jobId={job._id} />
    </div>
  );
}