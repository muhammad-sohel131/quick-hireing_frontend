import Tag from "./Tag";

interface JobListItemProps {
  logo: string;
  title: string;
  company: string;
  location: string;
  tags: { text: string; color: string }[];
}

export default function JobListItem({
  logo,
  title,
  company,
  location,
  tags,
}: JobListItemProps) {
  return (
    <div className="flex bg-white justify-between items-center p-4 border border-[var(--neutrals-20)] rounded-xl hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img src={logo} alt={company} className="w-8 h-8" />
        <div>
          <div>
            <h3 className="font-semibold text-[var(--neutrals-100)] text-sm">
              {title}
            </h3>
            <p className="text-xs text-[var(--neutrals-80)]">
              {company} • {location}
            </p>
          </div>
          <div className="flex gap-2 mt-5">
            {tags.map((tag) => (
              <Tag key={tag.text} {...tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
