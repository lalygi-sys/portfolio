import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";
import { ProjectCover } from "./ProjectCover";
import { Metrics } from "./Metric";

export function WorkCard({ project }: { project: PortfolioProject }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return (
    <article
      className={"work-card" + (expanded ? " is-expanded" : "")}
      data-reveal
      aria-labelledby={id + "-title"}
    >
      <div className="work-card-summary">
        <ProjectCover project={project} />
        <div className="work-card-copy">
          <p className="project-byline">
            {project.role}
            {project.period && <span> · {project.period}</span>}
          </p>
          <h3 id={id + "-title"}>
            <button
              type="button"
              className="work-card-toggle"
              aria-expanded={expanded}
              aria-controls={id + "-details"}
              onClick={() => setExpanded(!expanded)}
            >
              {project.title}
              <Plus className="work-card-plus" size={24} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </h3>
          <p className="project-summary">{project.summary}</p>
          <Metrics metrics={project.metrics} />
          <span className="work-card-hint" aria-hidden="true">
            {expanded ? "Close project" : "Explore project"}
          </span>
        </div>
      </div>
      <div id={id + "-details"} className="work-card-details" hidden={!expanded}>
        <div>
          <h4>Context & contribution</h4>
          <p>{project.context}</p>
        </div>
        {project.outcome && (
          <div>
            <h4>Outcome</h4>
            <p>{project.outcome}</p>
          </div>
        )}
        <div className="work-card-links">
          {project.caseStudyPath && (
            <Link to="/work/$slug" params={{ slug: project.slug }} className="case-read-link">
              Read full case study <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          )}
          {project.prototypeUrl && (
            <a
              className="case-read-link"
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View prototype <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
          {project.externalLinks.map((link) => (
            <a
              key={link.url}
              className="case-read-link"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label || "View project"} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
