import type { PortfolioProject } from "@/lib/projects";

export function ProjectCover({
  project,
  eager = false,
}: {
  project: PortfolioProject;
  eager?: boolean;
}) {
  return (
    <div className="project-cover">
      {project.coverImage ? (
        <img
          src={project.coverImage}
          srcSet={
            project.localCover
              ? project.coverImage.replace(".webp", "-640.webp") +
                " 640w, " +
                project.coverImage +
                " 1600w"
              : undefined
          }
          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 64px), 1160px"
          width={1600}
          height={1000}
          alt={project.coverAlt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <span className="project-cover-fallback">{project.product}</span>
      )}
    </div>
  );
}
