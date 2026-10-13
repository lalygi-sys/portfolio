export function CaseHeroTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <ul className="case-hero-tags" aria-label="Project focus">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
