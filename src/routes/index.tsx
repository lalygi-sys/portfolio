import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { portfolioQuery } from "@/lib/portfolio.queries";
import { getPublicProjects } from "@/lib/projects";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { HomeCaseCard } from "@/components/portfolio/HomeCaseCard";
import { AnimatedHero } from "@/components/portfolio/AnimatedHero";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { useSectionReveal } from "@/hooks/use-section-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tatiana Kapkaeva — Product Designer" },
      {
        name: "description",
        content:
          "Product Designer with 6 years of experience turning complex workflows and regulated requirements into clear, human-friendly products.",
      },
      { property: "og:title", content: "Tatiana Kapkaeva — Product Designer" },
      {
        property: "og:description",
        content:
          "Selected product design work: onboarding, partner platforms, payments and research.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQuery),
  errorComponent: () => (
    <div className="site-container py-24">
      Portfolio is temporarily unavailable. Please try again shortly.
    </div>
  ),
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(portfolioQuery);
  const mainRef = useRef<HTMLElement>(null);
  useSectionReveal(mainRef);
  const featured = getPublicProjects(data.cases)
    .filter((project) => project.featured)
    .slice(0, 3);
  return (
    <>
      <SiteHeader resumeUrl={data.resumeUrl} />
      <main id="main-content" className="home-page" tabIndex={-1} ref={mainRef}>
        <AnimatedHero />
        <section id="work" className="site-container selected-work" aria-labelledby="work-title">
          <div className="home-section-heading">
            <h2 id="work-title">Selected work</h2>
            <Link to="/work" className="section-link">
              More projects <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="home-case-list">
            {featured.map((project) => (
              <HomeCaseCard key={project.slug} project={project} />
            ))}
          </div>
          <Link to="/work" className="all-projects-link focus-ring">
            <span className="all-projects-skeleton" aria-hidden="true">
              <span className="all-projects-skeleton-copy">
                <span className="all-projects-skeleton-tags"><i /><i /></span>
                <span className="all-projects-skeleton-lines"><i /><i /><i /></span>
                <span className="all-projects-skeleton-metrics" />
              </span>
              <span className="all-projects-skeleton-cover" />
            </span>
            <span className="all-projects-title">View all projects</span>
            <span className="all-projects-arrow">
              <ArrowUpRight size={32} strokeWidth={1.8} aria-hidden="true" />
            </span>
          </Link>
        </section>
        <ContactSection
          email={data.settings?.email || undefined}
          telegram={data.settings?.telegram || undefined}
        />
      </main>
    </>
  );
}
