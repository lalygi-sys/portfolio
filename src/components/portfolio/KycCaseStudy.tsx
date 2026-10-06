import { useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { CaseWithMedia } from "@/lib/portfolio";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import "./kyc-case-study.css";

const chapters = [
  ["challenge", "The challenge"],
  ["journey", "Before & after"],
  ["ownership", "My role"],
  ["access", "Entry & country rules"],
  ["experience", "Application branches"],
  ["migration", "Existing partners"],
  ["delivery", "Delivery & scope"],
  ["outcome", "Outcome & learnings"],
] as const;

const screens = {
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
    height: 790,
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
    title: "Consent postponed",
    caption: "Closing the consent modal leaves a reminder. Learn more returns to the consent step.",
    height: 826,
  },
  migrationLate: {
    file: "migration-late",
    title: "Consent after the old area closes",
    caption:
      "Accept the transfer agreement on the replacement page, then continue to the same login route.",
    height: 678,
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
          width={
            screen.file === "migration-flow-map"
              ? 15150
              : screen.file === "migration-late"
                ? 2610
                : 1280
          }
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
          <div className="kyc-hero-visual kyc-hero-showcase">
            <div className="kyc-hero-principle">
              <p className="kyc-eyebrow">One product change. Two distinct decisions.</p>
              <h2>
                A dedicated signup.
                <br />A chance to explore before approval.
              </h2>
              <p>
                The IB area was becoming an independent product. I used this transition to rethink
                when partners should gain access.
              </p>
            </div>
            <div className="kyc-hero-screens">
              <ScreenFigure onOpen={openScreen} screen={screens.signup} hero />
              <ScreenFigure onOpen={openScreen} screen={screens.portal} hero />
            </div>
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
              <h2>A new portal needed more than a new registration form.</h2>
              <p>
                The IB partner area was separating from the broker, requiring its own signup and
                account journey. The old process made partners complete an application and manager
                interview before they could see the product.
              </p>
              <div className="kyc-context">
                <span className="kyc-context-number">My initiative</span>
                <div>
                  <strong>Let partners experience the product earlier.</strong>
                  <p>
                    I independently researched and drove this idea through journey analysis and
                    competitor research, then worked with legal and operations to define its
                    boundaries.
                  </p>
                </div>
              </div>
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
            </section>

            <section id="ownership" className="kyc-section">
              <p className="kyc-eyebrow">03 / My role</p>
              <h2>I owned the idea and drove it through delivery.</h2>
              <div className="kyc-workstreams">
                <div>
                  <span>01 / Research & direction</span>
                  <h3>Challenge the access gate</h3>
                  <p>Initiated and researched early access; mapped the new customer journey.</p>
                </div>
                <div>
                  <span>02 / Legal</span>
                  <h3>Separate access from approval</h3>
                  <p>Worked with the lawyer on agreements, declarations and eligibility rules.</p>
                </div>
                <div>
                  <span>03 / Operations</span>
                  <h3>Connect the review process</h3>
                  <p>
                    Redesigned review, manager contact and communication flows with operational
                    teams.
                  </p>
                </div>
                <div>
                  <span>04 / Design & delivery</span>
                  <h3>Make the model implementable</h3>
                  <p>Designed screens and branches, prepared handoff and oversaw implementation.</p>
                </div>
              </div>
            </section>

            <section id="access" className="kyc-section">
              <p className="kyc-eyebrow">04 / Entry & country rules</p>
              <h2>One account. Different access paths.</h2>
              <p>
                A dedicated signup leads to personal details and legal acknowledgement. An account
                is created here; approved IB status is a later milestone.
              </p>
              <div className="kyc-screen-pair">
                <ScreenFigure onOpen={openScreen} screen={screens.signup} />
                <ScreenFigure onOpen={openScreen} screen={screens.profile} />
              </div>
              <div className="kyc-decision">
                <span className="kyc-eyebrow">Decision 01</span>
                <h3>Country of residence → access rules</h3>
                <p>
                  Unavailable countries are excluded from signup. For supported countries, the risk
                  category determines whether the portal opens immediately.
                </p>
              </div>
              <div className="kyc-branches">
                <div className="kyc-branch">
                  <span className="kyc-route-label">Low risk · early access</span>
                  <FlowPath
                    steps={[
                      "Account created",
                      "Enter the portal",
                      "Complete application & verification",
                    ]}
                  />
                  <ScreenFigure onOpen={openScreen} screen={screens.portal} />
                  <p className="kyc-route-result">
                    Explore the product and referral tools. Withdrawal stays locked until approval.
                  </p>
                </div>
                <div className="kyc-branch">
                  <span className="kyc-route-label">Medium / high risk · review first</span>
                  <FlowPath
                    steps={[
                      "Account created",
                      "Application & required checks",
                      "Access after clearance",
                    ]}
                  />
                  <ScreenFigure onOpen={openScreen} screen={screens.riskApplication} />
                  <p className="kyc-route-result">
                    Stay in the application flow. There is no early route to the dashboard.
                  </p>
                </div>
              </div>
              <p className="kyc-note">
                Designed risk routes; country lists and detailed permissions remained subject to
                legal review.
              </p>

              <div className="kyc-ui-story">
                <h3>Early access is not an indefinite pause.</h3>
                <p>
                  If the application remains incomplete, a timed reminder explains the upcoming
                  restriction and leads back to the unfinished step.
                </p>
                <FlowPath
                  steps={[
                    "Application incomplete",
                    "Email + in-portal warning",
                    "Deadline to continue",
                    "Features limited if unfinished",
                  ]}
                />
                <div className="kyc-screen-pair">
                  <ScreenFigure onOpen={openScreen} screen={screens.deadline} />
                  <ScreenFigure onOpen={openScreen} screen={screens.reminder} />
                </div>
                <p className="kyc-note">
                  The design uses N/X days as configurable placeholders, not a confirmed deadline.
                  Withdrawal also returns the partner to the unfinished application or verification
                  step.
                </p>
              </div>
            </section>

            <section id="experience" className="kyc-section">
              <p className="kyc-eyebrow">05 / Application branches</p>
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

            <section id="migration" className="kyc-section kyc-migration">
              <p className="kyc-eyebrow">06 / Existing partners</p>
              <h2>A clear route to the new partner portal.</h2>
              <p>
                From transfer consent to a new password and verification — with a return path for
                partners who move later.
              </p>
              <ol className="kyc-migration-story">
                {[
                  {
                    screen: screens.migrationNotice,
                    title: "Agree to transfer data",
                    text: "Accept the transfer agreement in the broker\u2019s IB area. The same message is sent by email.",
                    transition: "Consent \u2192 personal and IB data transfer",
                  },
                  {
                    screen: screens.migrationMoved,
                    title: "Leave the old IB area",
                    text: "After transfer, the old IB functionality is hidden. A replacement page and email direct the partner to the new portal.",
                    transition: "Portal link \u2192 login",
                  },
                  {
                    screen: screens.migrationLogin,
                    title: "Log in to the IB program",
                    text: "Enter account credentials to begin the first login.",
                    transition: "First login \u2192 email confirmation",
                  },
                  {
                    screen: screens.migrationCode,
                    title: "Confirm it\u2019s you",
                    text: "Enter the confirmation code sent by email.",
                    transition: "Email confirmed \u2192 new password",
                  },
                  {
                    screen: screens.migrationPassword,
                    title: "Set a new password",
                    text: "Create and save a new password for the IB profile.",
                    transition: "New password \u2192 portal agreements",
                  },
                  {
                    screen: screens.migrationAgreement,
                    title: "Accept the new agreements",
                    text: "Review and accept the IB Agreement and Compliance guide in the new portal.",
                    transition: "Agreements accepted \u2192 dashboard",
                  },
                  {
                    screen: screens.migrationPending,
                    title: "Continue verification",
                    text: "Enter the dashboard with Pending IB status. Continue verification to unlock withdrawals.",
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
                <h3>Two ways back to the main journey</h3>
                <div className="kyc-screen-pair">
                  <ScreenFigure onOpen={openScreen} screen={screens.migrationReminder} />
                  <ScreenFigure onOpen={openScreen} screen={screens.migrationLate} />
                </div>
                <p>
                  Reminder → consent · Late consent → login → email confirmation → new password.
                </p>
              </div>
              <details className="kyc-migration-map">
                <summary>See all screens & alternate paths</summary>
                <ScreenFigure onOpen={openScreen} screen={screens.migrationMap} />
              </details>
            </section>

            <section id="delivery" className="kyc-section">
              <p className="kyc-eyebrow">07 / Delivery & scope</p>
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
              <p className="kyc-eyebrow">08 / Outcome & learnings</p>
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
              <img
                src={imagePath(zoom)}
                alt={zoom.title}
                width={
                  zoom.file === "migration-flow-map"
                    ? 15150
                    : zoom.file === "migration-late"
                      ? 2610
                      : 1280
                }
                height={zoom.height}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
