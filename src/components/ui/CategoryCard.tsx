import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface Props {
  title: string;
  jobs: number;
  Icon: string;
  active?: boolean;
}

export default function CategoryCard({ title, jobs, Icon, active }: Props) {
  return (
    <Link href={`/jobs?category=${title.toLowerCase()}`}
      className={`p-4 rounded-lg border flex items-center justify-between ${
        active
          ? "bg-[var(--brandColor)] text-[var(--color-white)]"
          : "bg-[var(--color-white)] border-[var(--neutrals-20)]"
      }`}
    >
      <div className="flex flex-row gap-5 lg:flex-col justify-center">
        <Image src={Icon} alt="icon" width={48} height={48} className="mb-5" />
        <div>
          <h3
            className={`font-semibold font-clash lg:text-2xl text-xl ${active ? "text-white" : "text-[var(--neutrals-100)]"}`}
          >
            {title}
          </h3>
          <div className="flex gap-5 items-center">
            <p
              className={`text-lg ${active ? "text-white" : "text-[#7C8493]"} mt-1`}
            >
              {jobs} jobs available
            </p>
            <FaArrowRightLong />
          </div>
        </div>
      </div>
    </Link>
  );
}
