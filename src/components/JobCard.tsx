import Tag from "./Tag";

interface JobCardProps {
  logo: string; // image src
  title: string;
  company: string;
  location: string;
  type: string;
  tags: { text: string; color: string }[];
}

export default function JobCard({ logo, title, company, location, type, tags }: JobCardProps) {
  return (
    <div className="border border-[var(--neutrals-20)] rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <img src={logo} alt={company} className="w-8 h-8" />
        <span className="text-[var(--brandColor)] text-xs border border-[var(--brandColor)] px-2 py-1 rounded">
          {type}
        </span>
      </div>

      <h3 className="font-semibold text-[var(--neutrals-100)] text-sm">{title}</h3>
      <p className="text-xs text-[var(--neutrals-80)]">
        {company} &bull; {location}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Tag key={tag.text} text={tag.text} color={tag.color} />
        ))}
      </div>
    </div>
  );
}