import { useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import type { CaseWithMedia } from "@/lib/portfolio";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import "./kyc-case-study.css";

const chapters = [
  ["challenge", "Context"],
  ["journey", "What I did"],
  ["ownership", "Designing the service"],
  ["migration", "Existing partners"],
  ["registration", "Account registration"],
  ["access", "Step 1 · Personal details"],
  ["portal", "Inside the portal"],
  ["experience", "Application branches"],
  ["delivery", "Delivery & scope"],
  ["outcome", "Outcome & learnings"],
] as const;

type Screen = {
  file: string;
  title: string;
  caption: string;
  height: number;
  width?: number;
  diagram?: boolean;
};
const screens = {
  signupMobile: {
    file: "signup-mobile",
    title: "Signup on mobile",
    caption: "The same entry point adapted to a smaller screen.",
    width: 720,
    height: 1600,
  },
  migrationOverview: {
    file: "migration-overview",
    title: "Migration: the complete connected journey",
    caption:
      "Transfer consent, the move to the new portal, first login and return paths for partners who migrate later.",
    width: 15150,
    height: 3834,
    diagram: true,
  },
  registrationFlow: {
    file: "registration-flow",
    title: "Registration, login and account recovery",
    caption:
      "Connected screens cover email confirmation, sign-in, password reset and the emails sent at each transition.",
    width: 4257,
    height: 5435,
    diagram: true,
  },
  accountDetails: {
    file: "account-details",
    title: "Step 1 — personal information",
    caption: "Basic personal details and acceptance of the IB Agreement and Compliance guide.",
    width: 1280,
    height: 1132,
  },
  accountFlow: {
    file: "account-details-flow",
    title: "Personal details: rules, validation and country routing",
    caption:
      "The working flow connects the form to country eligibility, risk routing, validation states and the account-created message.",
    width: 5863,
    height: 10918,
    diagram: true,
  },
  portalOverview: {
    file: "portal-overview",
    title: "The dashboard after Step 1",
    caption:
      "Low-risk partners can start using the portal while the application remains unfinished.",
    width: 1280,
    height: 736,
  },
  portalStatus: {
    file: "portal-status",
    title: "Account access is not yet IB approval",
    caption:
      "Pending IB status and a visible next step distinguish product access from withdrawal eligibility.",
    width: 1280,
    height: 736,
  },
  portalFlow: {
    file: "portal-followup-flow",
    title: "Inside the portal: access, withdrawal and reminders",
    caption:
      "The working map connects dashboard, wallet and profile states to the unfinished application and time-based reminders.",
    width: 6798,
    height: 5104,
    diagram: true,
  },
  signup: {
    file: "signup-new",
    title: "A new front door for the standalone IB portal",
    caption: "Dedicated signup, separate from the broker account journey.",
    height: 920,
  },
  portal: {
    file: "portal-access",
    title: "Enter the portal with Pending IB status",
    caption:
      "The dashboard and referral tools are visible; the application remains a clear next step.",
    height: 736,
  },
  deadline: {
    file: "application-deadline",
    title: "Explain the deadline before access changes",
    caption:
      "A reminder explains that the IB application will become mandatory and portal features will be limited.",
    height: 736,
  },
  reminder: {
    file: "application-reminder",
    title: "Keep the next step visible",
    caption:
      "After the modal is dismissed, the dashboard keeps the countdown and Continue IB application action.",
    height: 736,
  },
  riskApplication: {
    file: "risk-application",
    title: "Continue the application before entering the portal",
    caption:
      "The medium/high-risk route keeps the partner in onboarding instead of opening the dashboard.",
    height: 832,
  },
  riskReview: {
    file: "risk-review",
    title: "Application submitted for review",
    caption:
      "The partner receives an explicit waiting state while a manager assesses the application.",
    height: 832,
  },
  call: {
    file: "call-request",
    title: "Arrange the manager interview",
    caption: "Phone, messenger and preferred language help operations reach the partner.",
    height: 992,
  },
  markets: {
    file: "experienced-markets",
    title: "Experienced partner → existing business",
    caption:
      "Client markets, segment and instruments inform review. Restricted client markets trigger an inline warning.",
    height: 1089,
  },
  plan: {
    file: "new-partner-plan",
    title: "New partner → acquisition plan",
    caption:
      "Ask about the plan and expected clients instead of a brokerage history they do not have.",
    height: 832,
  },
  reviewContacts: {
    file: "review-contacts",
    title: "Submit details for written review",
    caption: "Capture reachable contact details without promising a scheduled call.",
    height: 992,
  },
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
  migrationMoved: {
    file: "migration-moved",
    title: "Open the new portal",
    caption:
      "The old IB area is replaced by a redirect screen. An email also links to the new portal.",
    height: 680,
  },
  migrationCode: {
    file: "migration-code",
    title: "Confirm it\u2019s you",
    caption: "Confirm the first login with the code sent by email.",
    height: 832,
  },
  migrationPassword: {
    file: "migration-password",
    title: "Create a new password",
    caption: "Set a new password for the IB profile after email confirmation.",
    height: 832,
  },
  migrationPending: {
    file: "migration-pending",
    title: "Continue verification",
    caption:
      "The dashboard shows Pending IB status and the next verification step to unlock withdrawals.",
    height: 832,
  },
  migrationReminder: {
    file: "migration-reminder",
    title: "A reminder to review the new agreements",
    caption: "The existing IB area also keeps the consent visible as a clear in-product reminder.",
    height: 298,
  },
  migrationLateUnchecked: {
    file: "migration-late-unchecked",
    title: "Consent before entering the portal",
    caption:
      "Partners who return after the old area has closed can accept the agreement and data transfer before entering the new portal.",
    height: 678,
  },
  migrationLateChecked: {
    file: "migration-late-checked",
    title: "Consent confirmed",
    caption: "Accepting the agreement activates the route into the new IB portal.",
    height: 678,
  },
  migrationMap: {
    file: "migration-flow-map",
    title: "Migration flow — working map",
    caption:
      "The full design frame shows the main route, its screens and the alternate recovery paths used during migration.",
    height: 3834,
  },
} satisfies Record<string, Screen>;
const screenWidth = (screen: Screen) =>
  screen.width ?? (screen.file === "migration-flow-map" ? 15150 : 1280);
const imagePath = (screen: Screen) =>
  `/images/projects/kyc/${screen.file}.${screen.file === "dashboard" ? "jpg" : "png"}`;

function FlowPath({ steps }: { steps: string[] }) {
  return (
    <ol className="kyc-flow-path">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{step}</span>
          {index < steps.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function Journey({ after = false }: { after?: boolean }) {
  const steps = after
    ? [
        "Partner website",
        "Register / log in",
        "Portal features · limited access",
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
        "Approval → access to portal features",
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
    <figure
      className={`kyc-screen ${hero ? "kyc-screen-hero" : ""} ${screen.diagram ? "kyc-screen-diagram" : ""}`}
    >
      <button
        className="kyc-screen-button focus-ring"
        aria-label={`Enlarge: ${screen.title}`}
        onClick={(event) => onOpen(screen, event.currentTarget)}
      >
        <img
          src={imagePath(screen)}
          alt={screen.title}
          width={screenWidth(screen)}
          height={screen.height}
          loading={hero ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="kyc-expand">
          <Expand size={16} aria-hidden="true" />
          <span>{screen.diagram ? "Explore flow" : "View screen"}</span>
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
  const [zoomScale, setZoomScale] = useState<number | null>(null);
  const zoomImage = useRef<HTMLImageElement | null>(null);
  function resizeImage(multiplier: number) {
    if (!zoom || !zoomImage.current) return;
    const current = zoomScale ?? zoomImage.current.clientWidth / screenWidth(zoom);
    setZoomScale(Math.max(0.01, Math.min(2, current * multiplier)));
  }
  const registrationRef = useRef<HTMLDivElement | null>(null);
  useSectionReveal(registrationRef);
  const profitRef = useRef<HTMLElement | null>(null);
  useSectionReveal(profitRef);
  const competitorRef = useRef<HTMLElement | null>(null);
  useSectionReveal(competitorRef);
  const opener = useRef<HTMLButtonElement | null>(null);
  function openScreen(screen: Screen, button: HTMLButtonElement) {
    opener.current = button;
    setZoomScale(null);
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
            A new onboarding journey for a standalone IB portal. I initiated and researched early
            product access, then drove the legal, operational and interface changes behind it.
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
          <div className="kyc-hero-visual kyc-hero-prototype">
            <a
              className="kyc-prototype-preview focus-ring"
              href="https://kyc-onboarding-pearl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open KYC onboarding prototype"
            >
              <img
                src={imagePath(screens.signup)}
                alt="First screen of the KYC onboarding prototype"
                width={1281}
                height={920}
                loading="eager"
                decoding="async"
              />
              <span className="kyc-prototype-preview-action">
                Open prototype <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </a>
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
              <p className="kyc-eyebrow">01 / Context</p>
              <h2>Context</h2>
              <p>
                As the IB program moved into a standalone portal, its entry conditions needed to be
                redesigned. The previous model created two barriers that cost us leads.
              </p>
              <div className="kyc-barriers">
                <div>
                  <span className="kyc-eyebrow">Barrier 01 / Waiting for value</span>
                  <h3>A week or more before access</h3>
                  <p>
                    Portal features were locked until full verification, including a phone
                    interview, was complete. Getting access could take a week or longer.
                  </p>
                </div>
                <div>
                  <span className="kyc-eyebrow">Barrier 02 / Excluding potential</span>
                  <h3>Fewer than 5 clients? No entry.</h3>
                  <p>
                    Smaller partners were sent to the broker’s other referral program, even when
                    they wanted to grow and needed the IB program’s tools and support.
                  </p>
                </div>
              </div>
              <p>
                These barriers became unacceptable for an independent product. Larger partners could
                lose interest and turn to competitors while waiting for approval. Smaller partners
                would register with nowhere to go: the alternative referral program was staying
                inside the broker’s account area.
              </p>
              <div className="kyc-journeys">
                <Journey />
              </div>
              <details className="kyc-details kyc-research-sources">
                <summary>Research context: friction in financial onboarding</summary>
                <p>
                  Signicat’s 2022 study of 7,600 consumers across 14 countries found that 68% had
                  abandoned a financial application in the previous year. This describes general
                  onboarding abandonment, not the effect of requesting documents at a particular
                  step.
                </p>
                <a
                  className="text-link"
                  href="https://www.signicat.com/the-battle-to-onboard-2022"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Signicat · The Battle to Onboard, 2022{" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </details>
            </section>

            <section id="journey" className="kyc-section">
              <p className="kyc-eyebrow">02 / What I did</p>
              <h2>What I did</h2>
              <p>
                I initiated a review of both barriers and built the case for changing them with
                evidence.
              </p>
              <div className="kyc-ui-story">
                <h3>First: let partners see value earlier.</h3>
                <p>
                  I analysed direct competitors to test the early-access hypothesis. Similar
                  products commonly let partners use their tools before completing verification — a
                  model that could support engagement while the application was still in progress.
                </p>
                <figure className="kyc-profit-highlight" ref={competitorRef}>
                  <div className="kyc-profit-summary" data-reveal>
                    <strong>1 in 10</strong>
                    <div>
                      <span>kept access similarly closed</span>
                      <p>Only one of the direct competitors reviewed.</p>
                    </div>
                  </div>
                  <figcaption>Source: my competitor analysis</figcaption>
                </figure>
                <p>
                  I used this research to define an entry model around our own compliance
                  constraints: three-step, risk-based onboarding.
                </p>
                <ol className="kyc-risk-stages">
                  <li>
                    <span>Step 1</span>
                    <h3>Personal details & country eligibility</h3>
                    <p>
                      Basic information → check whether the partner can participate based on
                      country.
                    </p>
                    <strong>Portal access without withdrawals*</strong>
                  </li>
                  <li>
                    <span>Step 2</span>
                    <h3>Questionnaire & manager review</h3>
                    <p>Application and, where available, a call → initial risk and fit check.</p>
                    <strong>
                      Access continues without withdrawals; a personal manager is assigned where
                      available
                    </strong>
                  </li>
                  <li>
                    <span>Step 3</span>
                    <h3>Document verification</h3>
                    <p>
                      Final KYC/AML review, including PEP, sanctions and money-laundering checks.
                    </p>
                    <strong>Full access, including withdrawals, after approval</strong>
                  </li>
                </ol>
                <p className="kyc-note">
                  *Early access applies to the low-risk route. Medium/high-risk countries follow the
                  required checks before entering the portal.
                </p>
                <div className="kyc-journeys">
                  <Journey after />
                </div>
              </div>
              <div className="kyc-ui-story">
                <h3>Second: keep smaller partners — and help them grow.</h3>
                <p>
                  Together with the Product Owner, I analysed data from the adjacent referral
                  program. The findings changed our priority: retain smaller partners and create
                  room for them to grow.
                </p>
                <figure className="kyc-profit-highlight" ref={profitRef}>
                  <div className="kyc-profit-summary" data-reveal>
                    <strong>10–20%</strong>
                    <div>
                      <span>of IB-program profit</span>
                      <p>From partners with a small client base.</p>
                    </div>
                  </div>
                  <figcaption>
                    Existing segment contribution · Internal analysis with the PO
                  </figcaption>
                </figure>
              </div>
            </section>

            <section id="ownership" className="kyc-section">
              <p className="kyc-eyebrow">03 / Designing the service</p>
              <h2>Connect the customer journey to the work behind it.</h2>
              <p>
                I mapped migration for existing partners, new-customer routes for priority and
                higher-risk regions, and application paths with and without phone interviews. The
                work also covered edge cases, selecting a verification tool and email communication
                at each transition.
              </p>
              <p>
                I refined the flows with Legal to meet our compliance requirements, then analysed
                and adapted operational workflows, including guidance and instructions for Support
                and Partner Management.
              </p>
            </section>

            <section id="migration" className="kyc-section kyc-migration">
              <p className="kyc-eyebrow">04 / Existing partners</p>
              <h2>A clear route to the new partner portal.</h2>
              <p>
                From transfer consent to a new password and verification, each handoff makes the
                next destination and the supporting email clear.
              </p>
              <ScreenFigure onOpen={openScreen} screen={screens.migrationOverview} />
              <ol className="kyc-migration-story">
                <li>
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">01</span>
                    <h3>Agree to transfer data</h3>
                    <p>
                      Accept the transfer agreement in the broker’s IB area before the existing
                      relationship and personal data are moved.
                    </p>
                    <aside className="kyc-migration-email">
                      <span>Email communication</span>
                      <p>The same migration message is sent by email.</p>
                    </aside>
                  </div>
                  <div className="kyc-migration-screen-stack">
                    <ScreenFigure onOpen={openScreen} screen={screens.migrationNotice} />
                    <ScreenFigure onOpen={openScreen} screen={screens.migrationReminder} />
                  </div>
                  <div className="kyc-migration-transition">
                    <ArrowRight size={18} aria-hidden="true" />
                    <span>Consent → personal and IB data transfer</span>
                  </div>
                </li>
                <li className="kyc-migration-transfer">
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">02</span>
                    <h3>Transfer data between licences</h3>
                    <p>
                      While the partner waits, the team transfers personal and IB-related data
                      internally between the licences that support the old and new portals.
                    </p>
                  </div>
                  <div className="kyc-journey kyc-transfer-visual">
                    <ol aria-label="Internal transfer between licences">
                      <li>
                        <span className="kyc-step-number">Broker licence</span>
                        <strong>Personal Area + IB data</strong>
                        <ArrowRight aria-hidden="true" />
                      </li>
                      <li>
                        <span className="kyc-step-number">IB Portal licence</span>
                        <strong>Partner profile + history</strong>
                      </li>
                    </ol>
                  </div>
                  <div className="kyc-migration-transition">
                    <ArrowRight size={18} aria-hidden="true" />
                    <span>Transfer complete → old IB area closes</span>
                  </div>
                </li>
                <li>
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">02</span>
                    <h3>Leave the old IB area</h3>
                    <p>
                      After transfer, the old functionality is hidden. A replacement page directs
                      partners to the new portal, including those who return after the move before
                      they have signed the documents.
                    </p>
                    <aside className="kyc-migration-email">
                      <span>Email communication</span>
                      <p>The message includes a direct link to the new IB Portal.</p>
                    </aside>
                  </div>
                  <div className="kyc-migration-screen-stack">
                    <ScreenFigure onOpen={openScreen} screen={screens.migrationMoved} />
                    <div className="kyc-migration-screen-pair">
                      <ScreenFigure onOpen={openScreen} screen={screens.migrationLateUnchecked} />
                      <ScreenFigure onOpen={openScreen} screen={screens.migrationLateChecked} />
                    </div>
                  </div>
                  <div className="kyc-migration-transition">
                    <ArrowRight size={18} aria-hidden="true" />
                    <span>Portal link → login</span>
                  </div>
                </li>
                <li>
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">03</span>
                    <h3>Log in to the IB program</h3>
                    <p>Enter account credentials to begin the first login.</p>
                  </div>
                  <ScreenFigure onOpen={openScreen} screen={screens.migrationLogin} />
                  <div className="kyc-migration-transition">
                    <ArrowRight size={18} aria-hidden="true" />
                    <span>First login → email confirmation</span>
                  </div>
                </li>
                <li>
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">04</span>
                    <h3>Confirm it’s you</h3>
                    <p>Enter the confirmation code sent by email.</p>
                    <aside className="kyc-migration-email">
                      <span>Email communication</span>
                      <p>
                        The message confirms that the partner initiated the sign-in and includes a
                        secure confirmation link or button.
                      </p>
                    </aside>
                  </div>
                  <ScreenFigure onOpen={openScreen} screen={screens.migrationCode} />
                  <div className="kyc-migration-transition">
                    <ArrowRight size={18} aria-hidden="true" />
                    <span>Email confirmed → new password</span>
                  </div>
                </li>
                <li>
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">05</span>
                    <h3>Set a new password</h3>
                    <p>Create and save a new password for the IB profile.</p>
                  </div>
                  <ScreenFigure onOpen={openScreen} screen={screens.migrationPassword} />
                  <div className="kyc-migration-transition">
                    <ArrowRight size={18} aria-hidden="true" />
                    <span>New password → portal agreements</span>
                  </div>
                </li>
                <li>
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">06</span>
                    <h3>Accept the new agreements</h3>
                    <p>
                      Review and accept the IB Agreement and Compliance guide in the new portal.
                    </p>
                    <aside className="kyc-migration-email">
                      <span>Email communication</span>
                      <p>
                        The message confirms that IB services are now in the new portal and reminds
                        the partner that their password has changed.
                      </p>
                    </aside>
                  </div>
                  <ScreenFigure onOpen={openScreen} screen={screens.migrationAgreement} />
                  <div className="kyc-migration-transition">
                    <ArrowRight size={18} aria-hidden="true" />
                    <span>Agreements accepted → dashboard</span>
                  </div>
                </li>
                <li>
                  <div className="kyc-migration-story-copy">
                    <span className="kyc-eyebrow">07</span>
                    <h3>Continue verification</h3>
                    <p>
                      Enter the dashboard with Pending IB status. Continue verification to unlock
                      withdrawals.
                    </p>
                  </div>
                  <ScreenFigure onOpen={openScreen} screen={screens.migrationPending} />
                </li>
              </ol>
            </section>

            <section id="registration" className="kyc-section">
              <p className="kyc-eyebrow">05 / Account registration</p>
              <h2>A dedicated account for the IB program.</h2>
              <p>
                Registration, login and recovery became a standalone journey, with email
                confirmations connecting each step.
              </p>
              <div className="kyc-signup-devices" ref={registrationRef}>
                <div data-reveal>
                  <ScreenFigure onOpen={openScreen} screen={screens.signup} />
                </div>
                <div data-reveal>
                  <ScreenFigure onOpen={openScreen} screen={screens.signupMobile} />
                </div>
              </div>
              <p className="kyc-note">
                Desktop and mobile signup evolution — shown in the source’s future-development
                section.
              </p>
              <ScreenFigure onOpen={openScreen} screen={screens.registrationFlow} />
            </section>

            <section id="access" className="kyc-section">
              <p className="kyc-eyebrow">06 / Step 1</p>
              <h2>
                Create the account.
                <br />
                Tell us about yourself.
              </h2>
              <div className="kyc-primary-screen">
                <ScreenFigure onOpen={openScreen} screen={screens.accountDetails} />
              </div>
              <ScreenFigure onOpen={openScreen} screen={screens.accountFlow} />
              <p>
                The first step collects name, date of birth, country, city and address, together
                with acceptance of the IB Agreement and Compliance guide. Validation covers age,
                missing or invalid details and country eligibility.
              </p>
              <p>
                The country is initially suggested from the IP and can be changed. Supported
                countries route the partner by risk; unavailable countries cannot proceed. The
                account-created message confirms receipt for preliminary review — it does not grant
                IB status.
              </p>
              <div className="kyc-country-routing">
                <header>
                  <h3>When can partners enter the portal?</h3>
                  <p>
                    Country of residence determines the risk route; unsupported countries cannot
                    sign up.
                  </p>
                </header>
                <div className="kyc-country-routes">
                  <div className="kyc-country-route">
                    <span className="kyc-country-risk">Low risk</span>
                    <h4>Access first</h4>
                    <ol>
                      <li>Account created</li>
                      <li className="is-portal-access">Enter the portal</li>
                      <li>Application & verification</li>
                    </ol>
                    <p>Explore tools immediately. Withdrawals unlock after approval.</p>
                  </div>
                  <div className="kyc-country-route">
                    <span className="kyc-country-risk">Medium / high risk</span>
                    <h4>Review first</h4>
                    <ol>
                      <li>Account created</li>
                      <li>Application & required checks</li>
                      <li className="is-portal-access">Enter after clearance</li>
                    </ol>
                    <p>Complete the required review before accessing the dashboard.</p>
                  </div>
                </div>
              </div>
              <p className="kyc-note">
                Designed risk routes; country lists and detailed permissions remained subject to
                legal review.
              </p>
            </section>

            <section id="portal" className="kyc-section">
              <p className="kyc-eyebrow">07 / After Step 1</p>
              <h2>Low-risk partners can enter the portal.</h2>
              <div className="kyc-screen-pair">
                <ScreenFigure onOpen={openScreen} screen={screens.portalOverview} />
                <ScreenFigure onOpen={openScreen} screen={screens.portalStatus} />
              </div>
              <ScreenFigure onOpen={openScreen} screen={screens.portalFlow} />
              <p>
                Partners can explore the dashboard and start working while their application is in
                progress. Withdrawals remain unavailable: selecting a payment method returns them to
                the unfinished questionnaire or document-verification step.
              </p>
              <p>
                If the application stays incomplete, an email and an in-portal reminder explain when
                completing it will become mandatory and portal features will be limited. A
                persistent banner keeps the deadline and next step visible.
              </p>
              <FlowPath
                steps={[
                  "Application incomplete",
                  "Email + in-portal warning",
                  "Deadline to continue",
                  "Features limited if unfinished",
                ]}
              />
              <p className="kyc-note">
                N/X days in the working design are placeholders for the configured reminder and
                deadline.
              </p>
            </section>

            <section id="experience" className="kyc-section">
              <p className="kyc-eyebrow">08 / Application branches</p>
              <h2>
                Ask what is needed.
                <br />
                Choose the right review route.
              </h2>
              <p>
                Two decisions shape the questionnaire: whether a manager can interview the partner,
                and whether the partner already has IB experience.
              </p>
              <div className="kyc-decision">
                <span className="kyc-eyebrow">Decision 02 / Operational coverage</span>
                <h3>Can a manager conduct the interview?</h3>
                <p>
                  Compliance needs the same information. The collection method changes with the
                  country’s contact coverage.
                </p>
              </div>
              <div className="kyc-branches">
                <div className="kyc-branch">
                  <span className="kyc-route-label">Yes → shorter form + interview</span>
                  <FlowPath
                    steps={[
                      "Experience & acquisition questions",
                      "Request a call",
                      "Remaining questions in the interview",
                    ]}
                  />
                  <ScreenFigure onOpen={openScreen} screen={screens.call} />
                  <p className="kyc-route-result">
                    The manager completes the review using the submitted answers and conversation.
                  </p>
                </div>
                <div className="kyc-branch">
                  <span className="kyc-route-label">No → full questionnaire</span>
                  <FlowPath
                    steps={[
                      "Interview questions in the form",
                      "Submit contact details",
                      "Manager reviews the application",
                    ]}
                  />
                  <ScreenFigure onOpen={openScreen} screen={screens.reviewContacts} />
                  <p className="kyc-route-result">
                    Capture the information in writing when an interview is unavailable.
                  </p>
                </div>
              </div>
              <div className="kyc-decision">
                <span className="kyc-eyebrow">Decision 03 / Relevant questions</span>
                <h3>Has the partner worked as an IB before?</h3>
              </div>
              <div className="kyc-question-entry">
                <ScreenFigure onOpen={openScreen} screen={screens.experience} />
              </div>
              <div className="kyc-branches">
                <div className="kyc-branch">
                  <span className="kyc-route-label">Yes → understand the existing business</span>
                  <FlowPath
                    steps={[
                      "Client markets & profile",
                      "Broker history",
                      "Acquisition plan & expectations",
                    ]}
                  />
                  <ScreenFigure onOpen={openScreen} screen={screens.markets} />
                </div>
                <div className="kyc-branch">
                  <span className="kyc-route-label">No → understand the proposed business</span>
                  <FlowPath
                    steps={[
                      "Acquisition channels",
                      "Plan & expected clients",
                      "Partnership expectations",
                    ]}
                  />
                  <ScreenFigure onOpen={openScreen} screen={screens.plan} />
                </div>
              </div>
              <div className="kyc-flow-merge">
                <ArrowRight size={18} aria-hidden="true" />
                <p>
                  Both paths → answers to CRM → manager review.
                  <br />
                  <span>Saved progress lets the partner resume without starting again.</span>
                </p>
              </div>
              <p className="kyc-note">
                Examples above show the full-form experience branches. The interview route collects
                a shorter set online. Contact coverage is an operational setting, separate from
                country risk.
              </p>
              <div className="kyc-ui-story">
                <h3>Show what happens after submission.</h3>
                <div className="kyc-screen-pair">
                  <ScreenFigure onOpen={openScreen} screen={screens.riskReview} />
                  <ScreenFigure onOpen={openScreen} screen={screens.verification} />
                </div>
                <details className="kyc-details">
                  <summary>When the application is declined</summary>
                  <ScreenFigure onOpen={openScreen} screen={screens.rejection} />
                </details>
              </div>
            </section>

            <section id="delivery" className="kyc-section">
              <p className="kyc-eyebrow">09 / Delivery & scope</p>
              <h2>A focused first delivery. A visible backlog.</h2>
              <p>
                I split the work to accelerate development: the core journey and review states for
                handoff, with further improvements retained in the backlog.
              </p>
              <div className="kyc-scope-list kyc-scope-compact">
                <div>
                  <span className="kyc-status">Design & handoff</span>
                  <h3>Core journey</h3>
                  <p>
                    Registration, application branches, portal permissions, verification and
                    migration.
                  </p>
                </div>
                <div>
                  <span className="kyc-status kyc-status-muted">Backlog</span>
                  <h3>Deferred improvements</h3>
                  <p>
                    Transparent frames in Figma mark future work to reduce the initial development
                    scope.
                  </p>
                </div>
              </div>
              <p className="kyc-note">
                Screens show the designed solution and working variants, not a claim that every
                state shipped.
              </p>
            </section>

            <section id="outcome" className="kyc-section">
              <p className="kyc-eyebrow">10 / Outcome & learnings</p>
              <h2>The change was the sequence, not just the form.</h2>
              <p>
                The result was a defined early-access model, connected customer and operational
                flows, and designs ready for implementation. I drove the work from the original
                hypothesis through legal alignment, handoff and implementation oversight.
              </p>
              <p className="kyc-note">
                Post-launch conversion and revenue impact were not measured in this case.
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
            Selected design screen. Use Zoom in or Zoom out for detail, and Fit to screen to see the
            whole image.
          </DialogDescription>
          <div className="kyc-lightbox-tools">
            <button
              className="focus-ring"
              aria-label="Zoom out"
              onClick={() => resizeImage(1 / 1.4)}
            >
              <Minus size={18} aria-hidden="true" />
            </button>
            <button className="focus-ring" aria-label="Zoom in" onClick={() => resizeImage(1.4)}>
              <Plus size={18} aria-hidden="true" />
            </button>
            <button className="focus-ring" onClick={() => setZoomScale(null)}>
              Fit to screen
            </button>
            <button className="focus-ring" onClick={() => setZoomScale(1)}>
              100%
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
          <div className={`kyc-lightbox-image ${zoomScale !== null ? "is-actual-size" : ""}`}>
            {zoom && (
              <img
                src={imagePath(zoom)}
                alt={zoom.title}
                ref={zoomImage}
                width={screenWidth(zoom)}
                style={zoomScale === null ? undefined : { width: screenWidth(zoom) * zoomScale }}
                height={zoom.height}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
