import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";
import { ProjectCover } from "./ProjectCover";
import { Metrics } from "./Metric";

export function HomeCaseCard({ project }: { project: PortfolioProject }) {
  const isKyc = project.slug === "kyc-kyb-onboarding";
  return (
    <article
      className={`home-case home-case-featured home-case-${project.slug}`}
      aria-labelledby={"case-" + project.slug}
      data-reveal
    >
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="case-cover-link"
        aria-label={"Read case study: " + project.title}
      >
        {isKyc ? (
          <>
            <div className="project-cover">
              <img
                src="/images/projects/kyc-kyb-preview.png"
                width={1536}
                height={1000}
                alt="Identity verification dashboard with individual verification steps and document upload"
                loading="lazy"
                decoding="async"
              />
            </div>
          </>
        ) : project.slug === "b2b-rebates-payouts" ? (
          <div className="project-cover">
            <img
              src="/images/projects/b2b-rebates-main.png"
              width={1774}
              height={887}
              alt="Rebate sharing dashboard with client payout settings and payment statuses, shown as layered interface panels"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : project.slug === "standalone-partner-portal" ? (
          <div className="project-cover">
            <img
              src="/images/projects/standalone-partner-portal-preview-v2.png"
              width={1774}
              height={887}
              alt="Partner portal dashboard with referral sharing, revenue statistics, and client overview"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <ProjectCover project={project} />
        )}
        <span className="case-cover-arrow" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </Link>
      <div className="home-case-content">
        <div className="home-case-story">
          <ul className="project-tags" aria-label="Project focus">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h3 id={"case-" + project.slug}>
            <Link to="/work/$slug" params={{ slug: project.slug }}>
              {project.title}
            </Link>
          </h3>
          <p className="project-summary">{project.summary}</p>
        </div>
        <div className="home-case-results">
          <Metrics
            metrics={
              isKyc
                ? [
                    {
                      value: "10–20%",
                      label: "of IB profit from smaller partners",
                    },
                    {
                      value: "Early access",
                      label: "before verification is complete",
                    },
                  ]
                : project.slug === "b2b-rebates-payouts"
                  ? [
                      {
                        value: "$900k+",
                        label: "revenue losses prevented",
                      },
                      {
                        value: "Automation",
                        label: "compliant automated payouts",
                      },
                    ]
                  : project.slug === "standalone-partner-portal"
                    ? [
                        { value: "≈7,000", label: "partners kept access" },
                        {
                          value: "Standalone",
                          label: "product ready for development",
                        },
                      ]
                    : project.metrics
            }
          />
          {!project.metrics.length && project.outcome && (
            <p className="project-summary">{project.outcome}</p>
          )}
        </div>
      </div>
    </article>
  );
}
