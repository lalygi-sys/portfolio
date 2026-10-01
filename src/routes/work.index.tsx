import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioQuery } from "@/lib/portfolio.queries";
import { getPublicProjects, projectCategories } from "@/lib/projects";
import { SiteFooter, SiteHeader } from "@/components/portfolio/SiteHeader";
import { HomeCaseCard } from "@/components/portfolio/HomeCaseCard";
import { useSectionReveal } from "@/hooks/use-section-reveal";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Tatiana Kapkaeva" },
      {
        name: "description",
        content:
          "Product design, research and earlier UX/UI projects by Tatiana Kapkaeva. Explore the context, decisions and outcomes behind each project.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQuery),
  component: WorkPage,
});

function WorkPage() {
  const { data } = useSuspenseQuery(portfolioQuery);
  const mainRef = useRef<HTMLElement>(null);
  useSectionReveal(mainRef);
  const projects = getPublicProjects(data.cases);
  return (
    <>
      <SiteHeader resumeUrl={data.resumeUrl} />
      <main id="main-content" tabIndex={-1} className="site-container work-page" ref={mainRef}>
        <div className="page-intro">
          <h1>Selected projects, in detail.</h1>
          <p>Explore a project for its context, my contribution and what changed.</p>
        </div>
        {projectCategories.map((category) => {
          const group = projects.filter((project) => project.category === category);
          if (!group.length) return null;
          const id = "group-" + category.split(" ")[0]?.toLowerCase();
          return (
            <section className="work-group" key={category} aria-labelledby={id}>
              <div className="home-section-heading">
                <h2 id={id}>{category}</h2>
                <span className="project-count">
                  {String(group.length).padStart(2, "0")} projects
                </span>
              </div>
              <div className="home-case-list">
                {group.map((project) => (
                  <HomeCaseCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
