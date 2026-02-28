interface TagProps {
  text: string;
  color?: string; // Tailwind bg color or CSS var
}

export default function Tag({ text, color }: TagProps) {
  return (
    <span
      className={`inline-block text-xs px-2 py-1 rounded-full font-medium`}
      style={{
        backgroundColor: color || "var(--neutrals-20)",
      }}
    >
      {text}
    </span>
  );
}