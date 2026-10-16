import type { CaseWithMedia } from "@/lib/portfolio";

const storedCases = [
  {
    id: "d418f26d-c52c-48c5-a7fb-0e25026fcd47",
    slug: "copy-trading",
    title: "Copy trading subscription redesign",
    summary:
      "Making the investment needed to copy trades understandable before a user subscribes.",
    contribution:
      "Co-designed the copy trading experience with another product designer, from research synthesis and subscription mechanics to interface iterations and testing.",
    outcome:
      "The team's reported post-launch results included doubled 7-day retention, threefold monthly active users and first-subscription conversion rising from 2.73% to 9.73%.",
    role: "Product Designer",
    period: "2021–2022",
    stage: "Designed, tested and launched",
    cover_path: "copy-trading/summary.png",
    sections: [
      {
        title: "Context and goals",
        text: "The copy trading product had an unreliable first-subscription journey. People wanted to follow experienced traders, but could not tell what investment was needed or how the two subscription types and commissions worked. The team aimed to improve 7-day retention, monthly active use and the first subscription conversion.",
      },
      {
        title: "Research and insights",
        text: "The project combined a user story map, jobs-to-be-done work and a customer journey map with 17 user interviews. The research showed that users could not confidently assess the cost or likely outcome of following a trader. In the existing flow, 30% of new users had no trades copied; among the others, only 57% of trades were copied.",
        imagePath: "copy-trading/research-1.png",
        caption: "Research artefacts used to map the subscription journey and its points of confusion.",
      },
      {
        title: "Listening at cancellation",
        text: "A feedback form at the point of unsubscribing captured reasons users left a master trader. More than 600 responses arrived in two weeks. Grouping those answers by theme helped the team prioritise the issues that mattered most to users.",
        imagePath: "copy-trading/feedback-form-2.png",
        caption: "The revised in-app feedback form for users ending a subscription.",
      },
      {
        title: "An investment users can act on",
        text: "A trader could previously set an unrealistically low minimum investment, attracting subscribers whose budgets could not copy the trader's larger positions. The redesigned logic calculates a minimum from the trading strategy and offers another trader when a user's budget is too low. The source case reports a 28% improvement in the trade-copy metric after this change.",
        imagePath: "copy-trading/killer-input.png",
        caption: "The previous manual minimum investment setting that contributed to the mismatch.",
      },
      {
        title: "A clearer subscription",
        text: "The new journey replaced two hard-to-understand subscription types with one. Users choose a copying proportion based on their own funds, see the required investment calculated automatically, can add support funds for market movement, and review the terms before confirming. Prototypes and usability checks informed the final flow.",
        imagePath: "copy-trading/new-design.png",
        caption: "The redesigned subscription setup makes the required investment and terms visible before confirmation.",
      },
      {
        title: "Outcome and learning",
        text: "The shared case reports strong interview feedback and an A/B test that supported launch. The team's reported outcomes were 2× 7-day retention, 86% more stable trade copying, 3× monthly active users and first-subscription conversion rising from 2.73% to 9.73%. The core lesson was to make the cost and mechanics of copying a strategy explicit before asking users to commit.",
        imagePath: "copy-trading/analytics.png",
        caption: "Product analytics presented in the original collaborative case study.",
      },
    ],
    links: [],
    nda: false,
    published: true,
    featured: false,
    sort_order: 7,
    created_at: "2026-10-15T00:00:00.000000+00:00",
    updated_at: "2026-10-15T00:00:00.000000+00:00",
  },
  {
    id: "81d396f6-fb1b-4198-b268-2b408f0caf07",
    slug: "kyc-kyb-onboarding",
    title: "KYC/KYB onboarding for individuals and businesses",
    summary:
      "Giving partners earlier portal access while keeping application review and document verification as requirements for withdrawal.",
    contribution:
      "Led the onboarding redesign across legal requirements, operational processes, research, UX/UI, development handoff and implementation oversight.",
    outcome:
      "Designed an onboarding model that lets partners explore the portal before verification. Smaller partners represented 10–20% of program profit; that figure is segment context, not a redesign outcome.",
    role: "Area Product Designer / Project Lead",
    period: "2025–2026",
    stage: "Core journey handed off; further improvements in backlog",
    cover_path: null,
    sections: [
      {
        text: "The previous entry model delayed access until verification was complete and excluded partners with fewer than five clients. Compliance requirements still had to govern document collection, review, and approval.",
        title: "Context and constraints",
      },
      {
        text: "I benchmarked comparable products and examined the value of smaller partners. This informed a model that separates early exploration of the portal from access to regulated actions.",
        title: "Research and insights",
      },
      {
        text: "Entry → identify individual or business → collect the relevant documents → review and approval. In parallel, allow limited early access while verification is pending. Exception paths account for missing documents, additional review, and different risk profiles. The exact permissions at each stage depend on compliance approval.",
        title: "Key decisions",
      },
      {
        text: "The design covers registration, personal information, an experience-based questionnaire, paths with and without manager contact, verification consent, pending states and rejection. Deferred signup improvements were kept in the backlog to accelerate initial development.",
        title: "Flows and interface",
      },
      {
        text: "The resulting model widened the proposed entry path while retaining verification controls. A full launch or conversion lift is not claimed.",
        title: "Outcomes and learnings",
      },
    ],
    links: [],
    nda: true,
    published: true,
    featured: true,
    sort_order: 1,
    created_at: "2026-09-23T23:18:47.947868+00:00",
    updated_at: "2026-09-23T23:18:47.947868+00:00",
  },
  {
    id: "f1e869ed-b56f-4860-a10b-65cb6f83072e",
    slug: "b2b-rebates-payouts",
    title: "Redesigning B2B rebates and payouts",
    summary: "Restructuring partner-to-client payouts as regulatory requirements changed.",
    contribution:
      "An interim solution, future payout mechanics, states and exceptions, a Cursor prototype, and partner testing.",
    outcome:
      "An interim solution was implemented. The automated flow was refined with partners and prepared for development and a pilot; prevention of $XXXk in losses was an estimate.",
    role: "Area Product Designer",
    period: "2025–2026",
    stage: "Interim solution implemented; target flow prepared for pilot",
    cover_path: null,
    sections: [
      {
        text: "A licensing transition affected the existing form of partner-to-client rebates. The work needed to retain the program while meeting new regulatory requirements.",
        title: "Context and constraints",
      },
      {
        text: "I investigated constraints with legal and product partners and tested an interactive Cursor prototype with partners. Feedback informed adjustments before development.",
        title: "Research and insights",
      },
      {
        text: "First, an interim rebate option maintained continuity under the constraints. Separately, I designed an automated flow covering calculation, payout rules, statuses, manual actions, and exceptions.",
        title: "Key decisions",
      },
      {
        text: "The target design brings payout review, setup, status, and exception handling into a coherent workflow. It was prepared for development and a test launch, not presented as fully deployed.",
        title: "Flows and interface",
      },
      {
        text: "The temporary solution was implemented. The target flow was handed off for development and pilot testing. Estimated loss prevention is not confirmed revenue growth.",
        title: "Outcomes and learnings",
      },
    ],
    links: [],
    nda: true,
    published: true,
    featured: true,
    sort_order: 2,
    created_at: "2026-09-23T23:18:47.947868+00:00",
    updated_at: "2026-09-23T23:18:47.947868+00:00",
  },
  {
    id: "7cabe16e-9029-43f0-af05-d7a7a88c56f5",
    slug: "standalone-partner-portal",
    title: "Designing a standalone B2B partner portal",
    summary:
      "Turning a partner area into an independent product through organizational and licensing changes.",
    contribution:
      "Workflow audit, customer journeys, service blueprints, product structure, interface design, and transition planning.",
    outcome:
      "The transition preserved partner access while operational processes were reorganized; this does not imply every designed section launched.",
    role: "Area Product Designer",
    period: "2025–2026",
    stage: "Transition completed; sections at different delivery stages",
    cover_path: null,
    sections: [
      {
        text: "The partner program moved away from shared company infrastructure during organizational and licensing changes. Partner access and support processes had to remain coherent throughout the transition.",
        title: "Context and constraints",
      },
      {
        text: "I audited the existing partner journey and its operational dependencies, using customer journeys and service blueprints to expose work behind the interface.",
        title: "Research and insights",
      },
      {
        text: "I mapped what partners needed at each stage, defined the product structure and transition dependencies, and coordinated interface and service changes with cross-functional teams.",
        title: "Key decisions",
      },
      {
        text: "The portal work spans dashboard, partner operations, and transition touchpoints. The design distinguished between the new product vision and the specific capabilities needed for a safe transition.",
        title: "Flows and interface",
      },
      {
        text: "Partner access was preserved during the transition, with operational processes adapted. This is not a claim that all designed sections were launched.",
        title: "Outcomes and learnings",
      },
    ],
    links: [],
    nda: true,
    published: true,
    featured: true,
    sort_order: 3,
    created_at: "2026-09-23T23:18:47.947868+00:00",
    updated_at: "2026-09-23T23:18:47.947868+00:00",
  },
  {
    id: "ae575f9c-65a8-4ab7-82b6-61d7e0ba8e05",
    slug: "new-b2b-business-model",
    title: "Validating a new B2B business model",
    summary: "Testing revised partner program terms and explaining a more complex model.",
    contribution:
      "Partner research, feedback analysis, presentation of terms, and portal adaptation.",
    outcome:
      "80% of participating top partners accepted the proposed terms; pilot metrics remained stable.",
    role: "Area Product Designer / Research Lead",
    period: "2025–2026",
    stage: "Pilot",
    cover_path: null,
    sections: [
      {
        text: "The partner program needed a new model that could be clearly explained and evaluated with its largest partners.",
        title: "Context and constraints",
      },
      {
        text: "I worked through partner feedback to understand objections and improve how the new mechanics were communicated.",
        title: "Research and insights",
      },
      {
        text: "Present the terms clearly, adapt the interface where the model changes the experience, and test the proposal with participating top partners before wider decisions.",
        title: "Key decisions",
      },
      {
        text: "80% of participating top partners accepted the proposed terms; pilot metrics remained stable. This finding applies to the participants, not the whole partner base.",
        title: "Outcomes and learnings",
      },
    ],
    links: [],
    nda: true,
    published: true,
    featured: false,
    sort_order: 4,
    created_at: "2026-09-23T23:18:47.947868+00:00",
    updated_at: "2026-09-23T23:18:47.947868+00:00",
  },
  {
    id: "f791544a-91f9-4a3f-8cb2-2bbb4a846108",
    slug: "research-recruitment",
    title: "Improving research recruitment",
    summary: "Finding more reliable ways to recruit B2B research participants.",
    contribution:
      "Research planning with a researcher, interview guides, analysis, hypothesis checks, targeted invitations, and in-product surveys.",
    outcome: "Reduced recruitment time by approximately 60% while doubling participant numbers.",
    role: "Process Lead / Area Product Designer",
    period: "2025–2026",
    stage: "Implemented research practice",
    cover_path: null,
    sections: [
      {
        text: "Recruitment for B2B partner research was a bottleneck; the existing approach required several sprints to reach enough participants.",
        title: "Context and constraints",
      },
      {
        text: "Together with a researcher I planned studies, wrote interview guides, analysed findings, and checked hypotheses while trying different recruitment methods.",
        title: "Research and insights",
      },
      {
        text: "Targeted invitations through partner managers and in-product surveys gave relevant participants clearer ways to join research.",
        title: "Key decisions",
      },
      {
        text: "Reduced recruitment time by approximately 60% while doubling participant numbers.",
        title: "Outcomes and learnings",
      },
    ],
    links: [],
    nda: true,
    published: true,
    featured: false,
    sort_order: 5,
    created_at: "2026-09-23T23:18:47.947868+00:00",
    updated_at: "2026-09-23T23:18:47.947868+00:00",
  },
  {
    id: "b7e47e5f-3f88-4a33-9a16-5c5eef6716b1",
    slug: "oinkrypt",
    title: "Web vulnerability scanner",
    summary:
      "Product discovery, UX audit, and MVP prioritisation for an early-stage web vulnerability scanner.",
    contribution:
      "Product discovery, UX audit, root-cause analysis, design-system audit, and MVP prioritisation.",
    outcome:
      "Defined the MVP direction, prioritised three Must-have improvements, unified severity colour logic, and prepared the product for external validation.",
    role: "Product Designer",
    period: "",
    stage: "Prepared for external validation",
    cover_path: null,
    sections: [
      {
        title: "Overview",
        text: "Oinkrypt is a web vulnerability scanner built by a two-person team. The MVP needed a clearer onboarding path before external testing.",
      },
      {
        title: "Discovery",
        text: "An eight-step journey, five friction points and four root causes were synthesised into three MVP priorities.",
      },
      {
        title: "Key Findings",
        text: "The audit connected onboarding friction to systemic UX issues and consolidated three independent severity-colour sources into design tokens.",
      },
      {
        title: "Outcome",
        text: "The MVP was prepared for external validation with a specific usability target for the first five users.",
      },
    ],
    links: [],
    nda: false,
    published: true,
    featured: false,
    sort_order: 6,
    created_at: "2026-10-11T00:00:00.000000+00:00",
    updated_at: "2026-10-11T00:00:00.000000+00:00",
  },
];

export const portfolioCases: CaseWithMedia[] = storedCases.map((item) => ({
  ...item,
  mediaUrls:
    item.slug === "copy-trading"
      ? Object.fromEntries(
          [
            "summary.png",
            "research-1.png",
            "feedback-form-2.png",
            "killer-input.png",
            "new-design.png",
            "analytics.png",
          ].map((name) => [
            `copy-trading/${name}`,
            `/images/projects/copy-trading/${name}`,
          ]),
        )
      : {},
})) as CaseWithMedia[];

export const portfolioSettings = {
  id: 1,
  about:
    "I start by understanding the problem, the business behind it, and the constraints that shape it. I map the full customer experience — including the operational work that happens out of sight — and work closely with product, engineering, analytics, and compliance to test decisions before delivery. Design systems help me keep complex products coherent; prototyping beyond Figma, including low-code and AI-assisted tools, helps make ideas tangible early.",
  email: "tatikorostyleva2194@gmail.com",
  telegram: "https://t.me/tiana_koro",
  resume_path: null,
  updated_at: "2026-09-23T23:18:47.947868+00:00",
};
