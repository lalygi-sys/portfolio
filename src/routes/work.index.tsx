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
          const group = projects
            .filter((project) => project.category === category)
            .sort((a, b) => {
              if (category === "Freelance & pet projects") {
                if (a.slug === "pizza-ordering-experience") return -1;
                if (b.slug === "pizza-ordering-experience") return 1;
              }
              if (category !== "Product work") return a.sortOrder - b.sortOrder;
              if (a.slug === "standalone-partner-portal") return -1;
              if (b.slug === "standalone-partner-portal") return 1;
              return a.sortOrder - b.sortOrder;
            });
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
        <section className="work-coming-soon" aria-labelledby="more-case-studies">
          <span className="work-coming-soon-label">In progress</span>
          <h2 id="more-case-studies">More case studies are on the way.</h2>
          <p>
            I’m preparing more projects to share. Want to see another case?
            <br />
            Get in touch with me.
          </p>
          <div className="work-coming-soon-actions">
            <a className="primary-action work-coming-soon-contact" href="/contact">
              Contact me
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
