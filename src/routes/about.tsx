import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioQuery } from "@/lib/portfolio.queries";
import { experience, getAboutCopy } from "@/lib/home-content";
import { SiteFooter, SiteHeader } from "@/components/portfolio/SiteHeader";
import { useSectionReveal } from "@/hooks/use-section-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tatiana Kapkaeva" },
      {
        name: "description",
        content:
          "A Product Designer with 6 years of product experience and a background in graphic and brand design. Explore Tatiana Kapkaeva’s career and approach.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQuery),
  component: AboutPage,
});

function AboutPage() {
  const { data } = useSuspenseQuery(portfolioQuery);
  const mainRef = useRef<HTMLElement>(null);
  useSectionReveal(mainRef);
  return (
    <>
      <SiteHeader resumeUrl={data.resumeUrl} />
      <main id="main-content" tabIndex={-1} className="site-container about-page" ref={mainRef}>
        <section className="about-intro page-intro" aria-labelledby="about-title">
          <div>
            <h1 id="about-title">
              A bit
              <br />
              about me.
            </h1>
          </div>
          <p>{getAboutCopy(data.settings?.about)}</p>
        </section>
        <section className="experience-history" aria-labelledby="experience-title" data-reveal>
          <div className="experience-heading">
            <h2 id="experience-title">The path so far</h2>
            <p>
              From visual communication
              <br />
              to complex product systems.
            </p>
          </div>
          <ol>
            {[...experience].reverse().map((step) => (
              <li
                key={step.title}
                className={"experience-step" + (step.nested ? " experience-step--within" : "")}
              >
                <div className="experience-period">
                  <span>{step.period}</span>
                  {step.company && <span>{step.company}</span>}
                </div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <div className="about-next">
          <Link to="/" hash="contact" className="primary-action">
            Contact me
          </Link>
          <Link to="/work" className="secondary-action">
            View all work
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
