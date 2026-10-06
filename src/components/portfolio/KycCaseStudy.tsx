import { useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, LockKeyhole } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { CaseWithMedia } from "@/lib/portfolio";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import "./kyc-case-study.css";

const chapters = [
  ["challenge", "The challenge"],
  ["journey", "Before & after"],
  ["ownership", "My role"],
  ["access", "Access & verification"],
  ["experience", "The experience"],
  ["migration", "Existing partners"],
  ["delivery", "Delivery & scope"],
  ["outcome", "Outcome & learnings"],
] as const;

const screens = {
  registration: {
    file: "registration",
    title: "A dedicated entry to the IB program",
    caption:
      "Registration and email verification establish the account before the partner completes the full application.",
    height: 832,
  },
  profile: {
    file: "profile",
    title: "Account creation and legal acknowledgement",
    caption:
      "The wizard collects personal details and makes a key distinction explicit: creating an account does not yet grant approved IB status.",
    height: 1132,
  },
  experience: {
    file: "experience",
    title: "An application that branches by experience",
    caption:
      "The first question separates new and experienced partners, so the following questions can reflect their background.",
    height: 832,
  },
  channels: {
    file: "acquisition-channels",
    title: "Information the review team can use",
    caption:
      "Acquisition channels become structured answers in the application, alongside experience and market information.",
    height: 832,
  },
  verification: {
    file: "verification",
    title: "A clear handoff into document verification",
    caption:
      "The designed verification entry explains the required declaration before continuing to the provider’s document checks.",
    height: 832,
  },
  rejection: {
    file: "rejection",
    title: "A defined outcome when approval is declined",
    caption:
      "Rejection is a designed state with an explanation and a reference to the agreement, rather than a missing or inaccessible account area.",
    height: 832,
  },
  dashboard: {
    file: "dashboard",
    title: "Inside the portal, before approval",
    caption:
      "Working design: a visible application status, a way to continue, and an explanation that rewards cannot be withdrawn before completion. Individual permissions remained subject to compliance review.",
    height: 1828,
  },
  migrationNotice: {
    file: "migration-notice",
    title: "Consent to move the existing IB relationship",
    caption:
      "The existing IB area introduces the move, explains the transfer of data and asks the partner to accept the updated agreements before a sign-in link is sent.",
    height: 832,
  },
  migrationLogin: {
    file: "migration-login",
    title: "Sign in to the new IB program",
    caption:
      "The transition link opens a familiar sign-in state, with password recovery and account creation available from the same entry point.",
    height: 832,
  },
  migrationConfirmation: {
    file: "migration-confirm",
    title: "A linked account can continue the transition",
    caption:
      "An account-recognition state confirms the partner’s credentials and continues the route into the new program.",
    height: 832,
  },
  migrationAgreement: {
    file: "migration-dashboard",
    title: "Accept agreements inside the new portal",
    caption:
      "The first portal state makes the migration explicit: data and statistics have moved, and the partner accepts the renewed IB agreement before continuing.",
    height: 832,
  },
  migrationMap: {
    file: "migration-flow-map",
    title: "Migration flow — working map",
    caption:
      "The full design frame shows the main route, its screens and the alternate recovery paths used during migration.",
    height: 3834,
  },
};
type Screen = (typeof screens)[keyof typeof screens];
const imagePath = (screen: Screen) =>
  `/images/projects/kyc/${screen.file}.${screen.file === "dashboard" ? "jpg" : "png"}`;

function Journey({ after = false }: { after?: boolean }) {
  const steps = after
    ? [
        "Partner website",
        "Register / log in",
        "Enter the portal",
        "Request withdrawal",
        "Application + verification",
        "Approval → withdrawal",
      ]
    : [
        "Partner website",
        "Broker registration",
        "Application",
        "Wait for review",
        "Manager interview",
        "Approval → portal access",
      ];
  return (
    <div className={`kyc-journey ${after ? "kyc-journey-after" : ""}`}>
      <div className="kyc-journey-label">
        <span>{after ? "After · designed journey" : "Before"}</span>
        <p>
          {after
            ? "Explore first. Verify for withdrawal."
            : "Prove eligibility before seeing the product."}
        </p>
      </div>
      <ol>
        {steps.map((step, i) => (
          <li
            key={step}
            className={(after && i === 2) || (!after && i === 5) ? "kyc-access-step" : ""}
          >
            <span className="kyc-step-number">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
            {i < steps.length - 1 && <ArrowRight aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ScreenFigure({
  screen,
  hero = false,
  onOpen,
}: {
  screen: Screen;
  hero?: boolean;
  onOpen: (screen: Screen, button: HTMLButtonElement) => void;
}) {
  return (
    <figure className={`kyc-screen ${hero ? "kyc-screen-hero" : ""}`}>
      <button
        className="kyc-screen-button focus-ring"
        aria-label={`Enlarge: ${screen.title}`}
        onClick={(event) => onOpen(screen, event.currentTarget)}
      >
        <img
          src={imagePath(screen)}
          alt={screen.title}
          width={1280}
          height={screen.height}
          loading={hero ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="kyc-expand">
          <Expand size={16} aria-hidden="true" />
          <span>View screen</span>
        </span>
      </button>
      <figcaption>
        <strong>{screen.title}</strong>
        <span>{screen.caption}</span>
      </figcaption>
    </figure>
  );
}

function revisitSection(event: MouseEvent<HTMLAnchorElement>) {
  if (window.location.hash !== event.currentTarget.hash) return;
  event.preventDefault();
  document.getElementById(event.currentTarget.hash.slice(1))?.scrollIntoView({ block: "start" });
}

export function KycCaseStudy({ item }: { item: CaseWithMedia }) {
  const [zoom, setZoom] = useState<Screen | null>(null);
  const [actualSize, setActualSize] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  function openScreen(screen: Screen, button: HTMLButtonElement) {
    opener.current = button;
    setActualSize(false);
    setZoom(screen);
  }
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="site-container kyc-case">
        <header className="kyc-hero">
          <Link to="/work" className="text-link kyc-back">
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <p className="kyc-eyebrow">KYC / KYB · Partner onboarding</p>
          <h1>
            Access first.
            <br />
            <span>Verify before withdrawal.</span>
          </h1>
          <p className="kyc-hero-summary">
            Redesigning onboarding for individuals and businesses so partners could start using the
            portal earlier, with verification protecting access to payouts.
          </p>
          <dl className="kyc-meta">
            <div>
              <dt>My role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{item.period}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Product strategy, service design, UX/UI & delivery</dd>
            </div>
          </dl>
          <div className="kyc-hero-visual">
            <div className="kyc-hero-principle">
              <p className="kyc-eyebrow">The key shift</p>
              <h2>Product access and partner approval became separate milestones.</h2>
              <p>
                I led the change across the customer journey, legal requirements and operational
                processes — through design handoff and implementation oversight.
              </p>
              <a href="#journey" className="text-link" onClick={revisitSection}>
                See the journey change <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <ScreenFigure onOpen={openScreen} screen={screens.dashboard} hero />
          </div>
        </header>

        <div className="kyc-layout">
          <nav className="kyc-index" aria-label="Case study sections">
            <span className="kyc-eyebrow">In this case</span>
            <ol>
              {chapters.map(([id, title], i) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={revisitSection}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="kyc-story">
            <section id="challenge" className="kyc-section">
              <p className="kyc-eyebrow">01 / The challenge</p>
              <h2>A long application stood between interest and value.</h2>
              <p>
                Introducing Brokers (IBs) refer clients to the broker through its partner program.
                Partners arrived from a dedicated landing page, but had to register with the broker,
                complete an application, wait for review and speak to a manager before entering the
                partner area. They were being asked to commit before they could understand the
                product.
              </p>
              <p>
                Mapping the existing journey exposed more than a long form: incomplete applications,
                waiting states and rejected applications could leave people without a clear route
                back to their status or next step.
              </p>
              <aside className="kyc-context">
                <span className="kyc-context-number">10–20%</span>
                <div>
                  <strong>of program profit came from smaller partners.</strong>
                  <p>
                    This business context challenged the previous entry model, which excluded
                    partners with fewer than five clients. It is segment context, not a measured
                    result of the redesign.
                  </p>
                </div>
              </aside>
              <p>
                I combined the journey audit with competitor benchmarking and discussions about
                eligibility and review requirements. The opportunity was to let partners experience
                the portal while keeping the required checks attached to actions that needed
                approval.
              </p>
            </section>

            <section id="journey" className="kyc-section">
              <p className="kyc-eyebrow">02 / Before & after</p>
              <h2>
                Move access earlier.
                <br />
                Keep the verification boundary clear.
              </h2>
              <p>
                The main change was the order of commitment: enter the portal after registration,
                then complete the application and document verification to unlock withdrawal.
              </p>
              <div className="kyc-journeys">
                <Journey />
                <Journey after />
              </div>
              <p className="kyc-note">
                A simplified comparison of the main journey. Country and risk exceptions can require
                verification before portal access; review or an interview may still be required.
              </p>
              <blockquote>
                “When does this information become necessary?” became as important as “Which
                information do we need?”
              </blockquote>
            </section>

            <section id="ownership" className="kyc-section">
              <p className="kyc-eyebrow">03 / My role</p>
              <h2>I drove the service change behind the screens.</h2>
              <p>
                Earlier access needed a shared definition of what an unapproved partner could do. I
                worked with the lawyer and operational teams to connect that definition to the
                interface, review process and communication.
              </p>
              <div className="kyc-workstreams">
                <div>
                  <span>01</span>
                  <h3>Legal & eligibility</h3>
                  <p>
                    Worked through changes to agreements, declarations and the distinction between
                    an account and approved partner status.
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <h3>Operations & review</h3>
                  <p>
                    Mapped questionnaire review, manager contact, approval and rejection so customer
                    states reflected the work happening behind them.
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <h3>Product & interaction</h3>
                  <p>
                    Designed the entry path, branching questions, document verification and return
                    paths across desktop and mobile.
                  </p>
                </div>
                <div>
                  <span>04</span>
                  <h3>Handoff & follow-through</h3>
                  <p>
                    Prepared flows and interface states for development, separated deferred
                    improvements and followed implementation with the team.
                  </p>
                </div>
              </div>
              <div className="kyc-service">
                <h3>One journey, several teams</h3>
                <dl>
                  <div>
                    <dt>Account created</dt>
                    <dd>
                      Legal acknowledgement and account state must agree with the access shown in
                      the portal.
                    </dd>
                  </div>
                  <div>
                    <dt>Application submitted</dt>
                    <dd>
                      Operations receive the information for review; the partner sees whether to
                      wait or expect manager contact.
                    </dd>
                  </div>
                  <div>
                    <dt>Verification reviewed</dt>
                    <dd>
                      The decision needs to reach the interface, communication and permissions
                      consistently.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section id="access" className="kyc-section">
              <p className="kyc-eyebrow">04 / Access & verification</p>
              <h2>Early access had explicit limits.</h2>
              <p>
                The model separated exploring and starting to use the product from withdrawing
                funds. Account creation, application review and identity verification were distinct
                states, rather than a single invisible gate.
              </p>
              <div className="kyc-permissions">
                <div>
                  <span>Available earlier</span>
                  <h3>The partner portal</h3>
                  <p>
                    Explore the product, see the account and application status, and continue the
                    onboarding journey.
                  </p>
                </div>
                <div>
                  <span>Restricted</span>
                  <h3>Sensitive client information</h3>
                  <p>
                    Data visibility and individual capabilities depend on eligibility and compliance
                    rules.
                  </p>
                </div>
                <div>
                  <span>
                    <LockKeyhole size={14} aria-hidden="true" /> Approval required
                  </span>
                  <h3>Fund withdrawal</h3>
                  <p>
                    Complete the application and required verification before money can be
                    withdrawn.
                  </p>
                </div>
              </div>
              <p>
                Individual and business onboarding needed different information and document
                requirements. I mapped these branches within the wider KYC/KYB journey; the selected
                interface examples below focus on the individual IB application.
              </p>
              <details className="kyc-details">
                <summary>Country exceptions and decisions requiring confirmation</summary>
                <p>
                  The working map includes India, Pakistan and Nigeria as exceptions where
                  verification precedes portal access. Referral-link availability, the exact client
                  data visible before approval, deeper-review triggers and verification-provider
                  coverage were also discussion points. They are not presented here as universally
                  released rules.
                </p>
              </details>
            </section>

            <section id="experience" className="kyc-section">
              <p className="kyc-eyebrow">05 / The experience</p>
              <h2>Make the next step understandable.</h2>
              <p>
                Each part of the flow needed to answer three questions: where am I, what is still
                required, and what can I do now? These are selected working designs from the
                handoff, rather than screenshots of a confirmed full rollout.
              </p>
              <div className="kyc-ui-story">
                <h3>01. Establish an account and explain its status</h3>
                <p>
                  Registration leads into a staged application. The legal wording and interface
                  distinguish account access from partner approval, so early entry does not imply
                  completed verification.
                </p>
                <div className="kyc-screen-pair">
                  <ScreenFigure onOpen={openScreen} screen={screens.registration} />
                  <ScreenFigure onOpen={openScreen} screen={screens.profile} />
                </div>
              </div>
              <div className="kyc-ui-story">
                <h3>02. Ask relevant questions, then route the review</h3>
                <p>
                  The questionnaire branches around IB experience and captures acquisition channels.
                  I designed paths with and without a requested manager call, alongside the
                  restricted-access path for risk-related exceptions.
                </p>
                <div className="kyc-screen-pair">
                  <ScreenFigure onOpen={openScreen} screen={screens.experience} />
                  <ScreenFigure onOpen={openScreen} screen={screens.channels} />
                </div>
              </div>
              <div className="kyc-ui-story">
                <h3>03. Treat verification and refusal as part of the journey</h3>
                <p>
                  Consent, document checks and an approval decision need their own states. The flow
                  also covers waiting for review and manager contact, so a submitted application
                  does not simply disappear from the partner’s view.
                </p>
                <div className="kyc-screen-pair">
                  <ScreenFigure onOpen={openScreen} screen={screens.verification} />
                  <ScreenFigure onOpen={openScreen} screen={screens.rejection} />
                </div>
              </div>
            </section>

            <section id="migration" className="kyc-section kyc-migration">
              <p className="kyc-eyebrow">06 / Existing partners</p>
              <h2>A clear route to the new partner portal.</h2>
              <p>Consent to transfer data, sign in, and continue in the new IB portal.</p>
              <ol className="kyc-migration-story">
                {[
                  {
                    screen: screens.migrationNotice,
                    title: "Agree to the move",
                    text: "In the existing IB area, review the agreements and consent to transfer personal and IB data.",
                    transition: "Consent processed → sign-in link by email",
                  },
                  {
                    screen: screens.migrationLogin,
                    title: "Follow the sign-in link",
                    text: "Open the new IB program and sign in. Password recovery is available from this screen.",
                    transition: "Complete access setup → enter the new portal",
                  },
                  {
                    screen: screens.migrationAgreement,
                    title: "Continue in the new portal",
                    text: "Review the welcome message and accept the new agreements. IB data and statistics have moved with the partner.",
                    transition: null,
                  },
                ].map((step, index) => (
                  <li key={step.screen.file}>
                    <div className="kyc-migration-story-copy">
                      <span className="kyc-eyebrow">0{index + 1}</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                    <ScreenFigure onOpen={openScreen} screen={step.screen} />
                    {step.transition && (
                      <div className="kyc-migration-transition">
                        <ArrowRight size={18} aria-hidden="true" />
                        <span>{step.transition}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              <div className="kyc-migration-delayed">
                <h3>Moving later?</h3>
                <p>
                  The original flow also covers reminders and re-entry after the old IB area closes.
                </p>
              </div>
              <details className="kyc-migration-map">
                <summary>See all screens & alternate paths</summary>
                <ScreenFigure onOpen={openScreen} screen={screens.migrationMap} />
              </details>
            </section>

            <section id="delivery" className="kyc-section">
              <p className="kyc-eyebrow">07 / Delivery & scope</p>
              <h2>
                Define the first delivery.
                <br />
                Keep the next steps visible.
              </h2>
              <p>
                To accelerate development, the work was split into an implementation scope and
                follow-up improvements. Transparent frames in the source file mark deferred work,
                not missing designs or shipped features.
              </p>
              <div className="kyc-scope-list">
                <div>
                  <span className="kyc-status">Designed & handed off</span>
                  <h3>The core journey and its states</h3>
                  <p>
                    Registration, the staged application, manager-review branches, verification
                    entry, portal restrictions and approval or rejection states, with desktop and
                    mobile designs.
                  </p>
                </div>
                <div>
                  <span className="kyc-status kyc-status-muted">Backlog</span>
                  <h3>Deferred signup improvements</h3>
                  <p>
                    Further registration variants, including when to ask for the country, were kept
                    in the backlog to reduce the initial development scope.
                  </p>
                </div>
                <div>
                  <span className="kyc-status kyc-status-muted">Needs confirmation</span>
                  <h3>Detailed policy and provider coverage</h3>
                  <p>
                    Open questions about permissions, risk handling and verification coverage stay
                    separate from confirmed interface decisions.
                  </p>
                </div>
              </div>
            </section>

            <section id="outcome" className="kyc-section">
              <p className="kyc-eyebrow">08 / Outcome & learnings</p>
              <h2>A different entry model, with a path to delivery.</h2>
              <p>
                The work produced a model for earlier portal access, a defined verification boundary
                for withdrawals, and a detailed set of customer and operational states for
                implementation. I drove it from legal and process changes through interface design,
                handoff and implementation oversight.
              </p>
              <div className="kyc-takeaway">
                <h3>The key learning</h3>
                <p>
                  Reducing onboarding friction meant changing when checks happened and coordinating
                  the people responsible for them. Shorter screens alone would not have removed the
                  wait for product access.
                </p>
              </div>
              <p className="kyc-note">
                This case documents the design and delivery work. A full rollout, conversion uplift
                or measured revenue increase is not claimed.
              </p>
              <details className="kyc-details kyc-archive">
                <summary>Explore the complete working flow</summary>
                <p>
                  The full PDF includes detailed branches and working notes. The story above can be
                  read without downloading it.
                </p>
                <a
                  href="/documents/kyc-kyb-onboarding.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Open full flow PDF <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="kyc-note">PDF · 2 MB · opens in a new tab</span>
                </a>
              </details>
              <Link to="/work" className="text-link kyc-back kyc-all-work">
                <ArrowLeft size={16} aria-hidden="true" /> Back to all work
              </Link>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
      <Dialog
        open={!!zoom}
        onOpenChange={(open) => {
          if (!open) setZoom(null);
        }}
      >
        <DialogContent
          className="kyc-lightbox"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
        >
          <DialogTitle>{zoom?.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Selected design screen. Use Actual size for detail or Fit to screen to see the whole
            image.
          </DialogDescription>
          <div className="kyc-lightbox-tools">
            <button className="focus-ring" onClick={() => setActualSize(!actualSize)}>
              {actualSize ? "Fit to screen" : "Actual size"}
            </button>
            {zoom && (
              <a
                href={imagePath(zoom)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Open image <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          <div className={`kyc-lightbox-image ${actualSize ? "is-actual-size" : ""}`}>
            {zoom && (
              <img src={imagePath(zoom)} alt={zoom.title} width={1280} height={zoom.height} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
