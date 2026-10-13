import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import type { PortfolioProject } from "@/lib/projects";
import { CaseHeroTags } from "./CaseHeroTags";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import "./oinkrypt-case-study.css";
import "./lingua-case-study.css";

const findings = [
  {
    title: "Faster vocabulary capture",
    text: "Paste a list or import a file instead of adding words one by one. The flow is designed to reduce the effort between a lesson and a usable vocabulary set.",
  },
  {
    title: "Flexible practice",
    text: "Flashcards, pronunciation, and filters let learners focus on the words they want to practise, on their own terms.",
  },
  {
    title: "User-driven iteration",
    text: "Early conversations highlighted the value of richer word context. Phonetic transcription, examples, and personal notes are planned improvements.",
  },
  {
    title: "From design to working product",
    text: "I designed the desktop and mobile experience, from information architecture and flows to visual design and prototypes, then used AI-assisted tools to build a working application connected to a backend.",
  },
];

const outcomes = [
  "Launched a working MVP at lingua.fyi",
  "Built a product I use regularly to learn English",
  "Received positive initial feedback on interaction mechanics and visual design",
  "Started early user testing and iterative product development",
  "Defined next improvements through conversations with potential users",
];

export function LinguaCaseStudy({ project }: { project: PortfolioProject }) {
  const mainRef = useRef<HTMLElement>(null);
  useSectionReveal(mainRef);

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="site-container oinkrypt-case lingua-case"
        ref={mainRef}
      >
        <header className="oinkrypt-intro">
          <Link to="/work" className="text-link oinkrypt-back">
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <CaseHeroTags tags={project.tags} />
          <h1>{project.title}</h1>
          <p className="oinkrypt-lead">
            A personal vocabulary app for collecting, organising, and practising new words.
          </p>
          <div className="oinkrypt-meta" aria-label="Project details">
            <span>Role: Independent Product Designer &amp; Builder</span>
            <span>Team: Solo project · Full-stack technical advisor</span>
            <span>Stage: Working MVP · Early user testing</span>
          </div>
        </header>

        <figure className="lingua-showcase" data-reveal>
          <img
            className="lingua-desktop-screen"
            src="/images/lingua-desktop.jpg"
            width={3454}
            height={1876}
            fetchPriority="high"
            alt="Lingua desktop home screen with a vocabulary learning illustration and word capture actions"
          />
          <div className="lingua-mobile-frame">
            <img
              className="lingua-mobile-screen"
              src="/images/lingua-mobile.jpg"
              width={553}
              height={1200}
              alt="Lingua mobile home screen with the same vocabulary capture options"
            />
          </div>
          <a
            className="lingua-image-link case-media-hover-link"
            href="https://lingua.fyi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Lingua product"
          >
            <span className="case-media-hover-action">
              Visit product <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </a>
          <figcaption className="case-media-caption">
            <a href="https://lingua.fyi/" target="_blank" rel="noopener noreferrer">
              Visit product <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </figcaption>
        </figure>

        <article className="oinkrypt-body lingua-body">
          <section aria-labelledby="lingua-overview" data-reveal>
            <h2 id="lingua-overview">Overview</h2>
            <div className="oinkrypt-copy">
              <p>
                Lingua is a personal vocabulary app I designed and built to make collecting and
                practising new words easier. After English lessons, I often had lists of new words
                in my notes, but adding them to vocabulary apps one by one felt tedious. Eventually,
                I would stop doing it.
              </p>
              <p>
                I wanted to remove that friction and make vocabulary practice easier to maintain. I
                owned the product concept, UX/UI, user flows, prototyping, and AI-assisted
                implementation, with technical guidance from a full-stack developer.
              </p>
            </div>
          </section>

          <section aria-labelledby="lingua-discovery" data-reveal>
            <h2 id="lingua-discovery">Discovery</h2>
            <div className="oinkrypt-copy">
              <p>
                The problem wasn’t just memorising words; it was getting them into a learning system
                in the first place. I focused on making vocabulary capture faster and giving
                learners more control over their practice.
              </p>
              <p>
                I shared an early MVP with a potential user from the English-learning community.
                They responded positively to the interaction mechanics and visual design compared
                with similar tools. Conversations with potential users also highlighted a need for
                richer word information and learning context.
              </p>
            </div>
          </section>

          <section aria-labelledby="lingua-findings" data-reveal>
            <h2 id="lingua-findings">Key Findings</h2>
            <div className="oinkrypt-findings lingua-findings">
              {findings.map((finding) => (
                <div key={finding.title}>
                  <h3>{finding.title}</h3>
                  <p>{finding.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="lingua-outcome" data-reveal>
            <h2 id="lingua-outcome">Outcome</h2>
            <div className="lingua-outcome-content">
              <ul className="oinkrypt-outcomes">
                {outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
              <p className="oinkrypt-outcome-note">
                Current stage: early user testing and iterative product development.
              </p>
            </div>
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
