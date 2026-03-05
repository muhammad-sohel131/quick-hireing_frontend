import Image from "next/image";
import Tag from "./Tag";
import { Job } from "@/app/types/jobs";
import Link from "next/link";
interface JobCardProps extends Job {
  link?: boolean;
}
export default function JobCard({
  _id,
  companyImageUrl,
  title,
  company,
  location,
  description,
  category,
  link,
}: JobCardProps) {
  return (
    <div className="border border-[var(--neutrals-20)] rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <Image
          width={200}
          height={200}
          src={companyImageUrl}
          alt={company}
          className="w-8 h-8"
        />
        <span className="text-[var(--brandColor)] text-xs border border-[var(--brandColor)] px-2 py-1 rounded">
          Full Time
        </span>
      </div>

      <h3 className="font-semibold text-[var(--neutrals-100)] text-sm">
        {title}
      </h3>
      <p className="text-xs text-[var(--neutrals-80)]">
        {company} &bull; {location}
      </p>

      <p className="text-xs text-[var(--neutrals-80)]">
        {description.slice(0, 100)}...
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {category.map((c) => (
          <Tag key={c} text={c} color="#C2F0E9" />
        ))}
      </div>
      {link && (
        <Link
          href={`/jobs/${_id}`}
          className="bg-[var(--brandColor)] text-white px-5 py-2 text-center my-5 rounded"
        >
          See Details
        </Link>
      )}
    </div>
  );
}
