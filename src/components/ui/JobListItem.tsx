import Image from "next/image";
import Tag from "./Tag";
import { Job } from "@/app/types/jobs";
import Link from "next/link";

const color = {
  Marketing: "#FEC89A",
  Design: "#C7C9FF",
  Business: "",
  Technology: "",
  Engineering: "",
  Finance: "",
  "Human Resource": "",
};
export default function JobListItem({
  _id,
  companyImageUrl,
  category,
  title,
  company,
  location,
}: Job) {
  return (
    <Link href={`/jobs/${_id}`}>
      <div className="flex bg-white justify-between items-center p-4 border border-[var(--neutrals-20)] rounded-xl hover:shadow-md transition">
        <div className="flex items-center gap-4">
          <Image
            width={200}
            height={200}
            src={companyImageUrl}
            alt={company}
            className="w-8 h-8"
          />
          <div>
            <div>
              <h3 className="font-semibold text-[var(--neutrals-100)] text-xl">
                {title}
              </h3>
              <p className="text-[16px] text-[var(--neutrals-80)]">
                {company} • {location}
              </p>
            </div>
            <div className="flex gap-2 mt-5">
              {category.map((c) => (
                <Tag key={c} text={c} color={color[c]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
