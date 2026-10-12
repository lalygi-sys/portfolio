import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import type { CaseWithMedia } from "@/lib/portfolio";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import "./oinkrypt-case-study.css";

const rootCauses = [
  "Unclear information hierarchy",
  "Hidden primary actions",
  "Expert-oriented terminology",
  "Inconsistent next-step guidance",
];

const outcomes = [
  "Defined audience hypotheses and a Now / Next / Later / Won't roadmap",
  "Reduced individual UX findings to four systemic root causes",
  "Prioritised three Must-have improvements using RICE and MoSCoW",
  "Established usability validation criteria",
  "Unified severity-colour logic and addressed accessibility inconsistencies",
];

export function OinkryptCaseStudy({ item }: { item: CaseWithMedia }) {
  const mainRef = useRef<HTMLElement>(null);
  useSectionReveal(mainRef);

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="site-container oinkrypt-case" ref={mainRef}>
        <header className="oinkrypt-intro">
          <Link to="/work" className="text-link oinkrypt-back">
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <p className="oinkrypt-kicker">
            Oinkrypt · Product Discovery · UX Audit · Design Systems
          </p>
          <h1>{item.title}</h1>
          <p className="oinkrypt-lead">
            Product discovery, UX audit, and MVP prioritisation for an early-stage web vulnerability
            scanner.
          </p>
          <div className="oinkrypt-meta" aria-label="Project details">
            <span>Role: Product Design &amp; Discovery</span>
            <span>Team: 2 people</span>
            <span>Stage: Early MVP</span>
          </div>
        </header>

        <figure className="oinkrypt-hero-screen" data-reveal tabIndex={0}>
          <img
            src="/images/oinkrypt-hero.png"
            width={3452}
            height={1868}
            alt="Oinkrypt landing page with its web vulnerability scanning prompt"
          />
          <figcaption>
            <LockKeyhole size={18} aria-hidden="true" />
            <span>View available on request</span>
          </figcaption>
        </figure>

        <article className="oinkrypt-body">
          <section aria-labelledby="oinkrypt-overview" data-reveal>
            <h2 id="oinkrypt-overview">Overview</h2>
            <div className="oinkrypt-copy">
              <p>
                Oinkrypt is a web vulnerability scanner built by a two-person team. The MVP was
                functional, but product decisions had not yet been validated with external users.
              </p>
              <p>
                The initial concern was that onboarding felt complicated. I led product discovery,
                UX and design-system audits to identify where users might struggle, trace root
                causes, and prioritise improvements before external testing.
              </p>
            </div>
          </section>

          <section aria-labelledby="oinkrypt-discovery" data-reveal>
            <h2 id="oinkrypt-discovery">Discovery</h2>
            <p className="oinkrypt-section-intro">
              I combined SWOT analysis, audience segmentation, competitive research, and an
              end-to-end product review. Five cybersecurity tools were benchmarked around the
              journey to the first meaningful scan result. RICE and MoSCoW turned the findings into
              an MVP sequence.
            </p>
            <ol className="oinkrypt-diagnostic-chain" aria-label="Discovery synthesis">
              <li>
                <strong>8</strong>
                <span>Journey steps</span>
              </li>
              <li>
                <strong>5</strong>
                <span>Friction points</span>
              </li>
              <li>
                <strong>4</strong>
                <span>Root causes</span>
              </li>
              <li>
                <strong>3</strong>
                <span>Priorities</span>
              </li>
            </ol>
            <ul className="oinkrypt-causes" aria-label="Systemic root causes">
              {rootCauses.map((cause, index) => (
                <li key={cause}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {cause}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="oinkrypt-findings" data-reveal>
            <h2 id="oinkrypt-findings">Key Findings</h2>
            <div className="oinkrypt-findings">
              <div>
                <h3>UX &amp; Product</h3>
                <p>
                  The audit found scan results spread across seven or more panels, hard-to-find
                  project creation, and terminology that assumed security expertise. I translated
                  these findings into three Must-have MVP priorities with measurable validation
                  criteria. Audience segments remained hypotheses pending real-user research.
                </p>
              </div>
              <div>
                <h3>Design System</h3>
                <p>
                  Severity colours came from CSS tokens, components, and PDF exports. The audit also
                  found four contrast failures, including a 1.79:1 ratio where 4.5:1 was required,
                  and 53 uses of secondary text with insufficient contrast. Severity logic was
                  consolidated in design tokens without rebuilding the component library.
                </p>
                <div
                  className="oinkrypt-token-flow"
                  aria-label="Three colour sources consolidated into one source of truth"
                >
                  <div>
                    <span aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <small>3 colour sources</small>
                  </div>
                  <b aria-hidden="true">→</b>
                  <div>
                    <span className="oinkrypt-token" aria-hidden="true">
                      severity.*
                    </span>
                    <small>1 source of truth</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="oinkrypt-outcome" data-reveal>
            <h2 id="oinkrypt-outcome">Outcome</h2>
            <ul className="oinkrypt-outcomes">
              {outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <aside className="oinkrypt-test-target">
              <span>Validation target</span>
              <p>
                3 of the first 5 users should identify a critical finding and locate the relevant
                action without assistance.
              </p>
            </aside>
            <p className="oinkrypt-outcome-note">
              The MVP is now being tested with its first external contacts. Validation results are
              still pending.
            </p>
          </section>
        </article>

        <footer className="oinkrypt-case-footer">
          <Link to="/work" className="text-link">
            <ArrowLeft size={16} aria-hidden="true" /> Back to all work
          </Link>
        </footer>
      </main>
      <SiteFooter />
    </>
  );
}
