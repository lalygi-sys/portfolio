import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioQuery } from "@/lib/portfolio.queries";
import { getPublicProjects } from "@/lib/projects";
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

const listingSummaries: Record<string, string> = {
  "standalone-partner-portal": "Designing a standalone partner portal through a company and licensing transition.",
  "kyc-kyb-onboarding": "Earlier portal access, with verification required for withdrawals.",
  "b2b-rebates-payouts": "Redesigning partner-to-client payouts for changing regulatory requirements.",
  "new-b2b-business-model": "Validating new partner terms and adapting the portal to a more complex model.",
  "research-recruitment": "Recruiting B2B research participants through targeted invitations and in-product surveys.",
  "copy-trading": "Making copy trading subscriptions and investment requirements clear before users commit.",
  oinkrypt: "Co-founded a cybersecurity MVP and designed its core UX and design system.",
  lingua: "Designed and built a vocabulary app, from concept to live MVP.",
  "window-configurator": "A guided mobile flow for configuring windows and their components.",
  "pizza-ordering-experience": "A mobile journey from pizza customisation to checkout.",
};

function WorkPage() {
  const { data } = useSuspenseQuery(portfolioQuery);
  const mainRef = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<"product" | "independent">("product");
  useSectionReveal(mainRef);
  const projects = getPublicProjects(data.cases);
  const groups = [
    {
      id: "product",
      label: "Product work",
      projects: projects.filter((project) => project.category === "Product work"),
    },
    {
      id: "independent",
      label: "Personal projects",
      projects: projects.filter((project) => project.category !== "Product work"),
    },
  ] as const;
  const currentGroup = groups.find((group) => group.id === activeGroup)!;
  const sortedProjects = [...currentGroup.projects].sort((a, b) => {
    if (activeGroup === "independent") {
      if (a.slug === "oinkrypt") return -1;
      if (b.slug === "oinkrypt") return 1;
      if (a.slug === "lingua") return -1;
      if (b.slug === "lingua") return 1;
      if (a.slug === "pizza-ordering-experience") return -1;
      if (b.slug === "pizza-ordering-experience") return 1;
    }
    if (a.slug === "kyc-kyb-onboarding") return -1;
    if (b.slug === "kyc-kyb-onboarding") return 1;
    if (a.slug === "standalone-partner-portal") return -1;
    if (b.slug === "standalone-partner-portal") return 1;
    if (a.slug === "copy-trading") return 1;
    if (b.slug === "copy-trading") return -1;
    return a.sortOrder - b.sortOrder;
  });
  return (
    <>
      <SiteHeader resumeUrl={data.resumeUrl} />
      <main id="main-content" tabIndex={-1} className="site-container work-page" ref={mainRef}>
        <div className="page-intro">
          <h1>Selected projects, in detail.</h1>
          <p>Explore a project for its context, my contribution and what changed.</p>
        </div>
        <div className="work-toolbar">
        <div className="work-tabs" role="tablist" aria-label="Project groups">
          {groups.map((group) => (
            <button
              className="work-tab"
              type="button"
              key={group.id}
              role="tab"
              aria-selected={activeGroup === group.id}
              aria-controls="work-project-list"
              id={`work-tab-${group.id}`}
              onClick={() => setActiveGroup(group.id)}
            >
              {group.label}
            </button>
          ))}
        </div>
        <span className="project-count" aria-live="polite">
          {String(sortedProjects.length).padStart(2, "0")} projects
        </span>
        </div>
        <section
          className="work-group"
          id="work-project-list"
          role="tabpanel"
          aria-labelledby={`work-tab-${activeGroup}`}
        >
          <div className="home-case-list">
            {sortedProjects.map((project) => (
              <HomeCaseCard key={project.slug} project={{ ...project, summary: listingSummaries[project.slug] ?? project.summary }} />
            ))}
          </div>
        </section>
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
