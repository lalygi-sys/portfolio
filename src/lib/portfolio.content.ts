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
    title: "Automating rebates for IB partners",
    summary:
      "Preserving a high-value client acquisition and retention tool while redesigning its financial mechanics for a multi-license structure.",
    contribution:
      "Designed the interim solution, automation mechanics, interface states and edge cases; built and tested a clickable prototype; prepared the section for development handoff.",
    outcome:
      "The interim solution retained major partners whose acquisition and retention models relied on Rebate. The complete solution preserved the tool across licenses, replaced manual payouts with automation and introduced a commission-hold mechanism reviewed with Compliance. Prototype testing exposed issues before development, and the section was launched in test mode.",
    role: "Area Product Designer",
    period: "2025–2026",
    stage: "Launched in test mode",
    cover_path: null,
    sections: [
      {
        title: "Context",
        text: "Rebate is a client acquisition and retention tool for IB partners, allowing them to share a percentage of their profit with clients. It is one of the program’s most profitable tools. During the transition to a multi-license structure, Legal questioned whether the feature could continue in its existing form because of regulatory restrictions and the broker’s split across separate licenses.",
      },
      {
        title: "Objective",
        text: "Find a way to retain the feature for major partners already using rebates extensively, and design an automated Rebate section in the new portal, including commission calculations, financial flows and all interface states.",
      },
      {
        title: "What I did",
        text: "Interim solution. There were not enough resources to build the entire section, but the regulatory deadline was approaching. I designed a solution that kept rebate payouts available, with restrictions, for partners generating the most profit through the feature.\nRethinking the mechanics. The old model was manual: partners entered dates and a percentage, received a table of client trading data, then calculated and sent each payout themselves. The new model solves two problems at once.\nFirst, automation: partners set a rebate percentage, and payouts are sent to clients automatically, without manual calculations or transfers. One-click manual payouts remain available.\nSecond, compliance: under the applicable regulatory requirements, payouts could not be made from commission already credited to a partner. In the new model, commission is held when the rebate is set up, and clients are paid from those reserved funds. This approach was reviewed with the internal Compliance team.\nSection design. I designed the complete mechanics: calculation logic, payout rules, all interface states and edge cases.\nPrototype research. I built a clickable prototype in Cursor, wrote a research script and tested it with partners. Feedback revealed significant issues in the mechanics, which I addressed before development handoff.\nI prepared the screens for development, covering all scenarios, edge cases and states.",
      },
      {
        title: "Challenges",
        text: "The feature’s legal status was uncertain at the start, and I had to find solutions to the regulatory issues without ready-made answers from Legal. I needed to balance the user experience, financial mechanics and legal constraints.",
      },
      {
        title: "Outcome",
        text: "An interim solution was implemented, retaining major partners whose client acquisition and retention models relied on Rebate. A complete solution was then found, preserving the tool across all licenses and replacing manual payouts with automation. The new commission-hold mechanism addressed the legal restriction and was reviewed internally with Compliance. Prototype testing exposed issues before development, allowing the design to be refined based on feedback. The section was handed off for development and launched in test mode.",
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
    title: "Designing a standalone Partner Portal",
    summary:
      "Turning an embedded partner workspace into a standalone product during a company and licensing transition.",
    contribution:
      "Audited partner and operations journeys, mapped transition dependencies, designed the portal structure and six sections, and prepared improved designs for development.",
    outcome:
      "The company split was completed on time. Critical workflows for thousands of active partners remained available, disrupted operations flows were automated or redesigned, and all Partner Portal sections were handed off for development.",
    role: "Area Product Designer",
    period: "2025–2026",
    stage: "Handed off for development",
    cover_path: null,
    sections: [
      {
        title: "Context",
        text: "The company was splitting into two independent entities with separate licenses. The partner program had historically been embedded in the main customer account, with its own flows, tools and operational processes. It needed to become a standalone product with its own domain and portal, while keeping thousands of active partners and operations teams working throughout the transition.",
      },
      {
        title: "Objective",
        text: "Design the architecture of the new Partner Portal. Support the transition period, when the partner workspace would exist in two portals at once. Identify problematic workflows for operations teams and design solutions. Prepare improved designs for the portal's sections for development.",
      },
      {
        title: "What I did",
        text: "I audited every partner journey, both inside and outside the portal, accounting for operations workflows at each stage. I broke down the scope of work, identified dependencies and mapped tasks onto the roadmap.\nFor the transition period, I examined every scenario where the license split prevented operations teams from completing routine tasks. I studied how each team worked, then either automated the flow or redesigned the process. For example, requests from customers to change their assigned partners had previously been handled manually by Support. After the split, this flow was almost fully automated.\nI designed the new portal's structure and content around the tasks partners needed to complete. As lead designer, I designed 6 sections with support from one other designer.",
      },
      {
        title: "Challenges",
        text: "The main challenge was uncertainty: operations teams did not yet know how their work would function after the split. I interviewed the teams, documented existing processes and known constraints, then designed solutions flexible enough to work across different possible scenarios.",
      },
      {
        title: "Outcome",
        text: "The company split was completed on time. All critical workflows for thousands of active partners remained available throughout the transition. Operational flows disrupted by the license split were either automated or redesigned. All sections of the new Partner Portal were handed off for development.",
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
      "80% of highest-earning partners accepted the new model's terms. After approximately four months of testing, key metrics remained within the expected confidence interval, with no anomalies or significant deviations from the forecast or control group.",
    role: "Area Product Designer / Research Lead",
    period: "2025–2026",
    stage: "Pilot",
    cover_path: null,
    sections: [
      {
        title: "Context",
        text: "The company was updating its partner program terms, replacing fixed commissions per unit of customer activity and partner tiers based on customer count with a more flexible model. Under the new model, commission rates depend on the product category and partner tier. Tiers are determined by the number of active customers and transaction volume, while the threshold for a customer to qualify as active is significantly lower. The goal was to reward partners who generate more value for the business and encourage activity in more profitable product categories.\nThe changes were developed in collaboration with the Product Owner, analysts, and a researcher. My role was to explore how partners perceived the new terms, address objections, secure buy-in from key partners, and adapt the interface to the new model.",
      },
      {
        title: "What I did",
        text: "Research and materials. I analyzed the existing business model, developed a research script, and prepared a presentation to test whether participants understood the benefits of the new model and were willing to adopt it.\nSecuring buy-in from key partners. I finalized the presentation and interview script for our highest-value partners. The main risk was losing those who contributed the most profit. I built feedback into every stage of the research: documented partner questions, gathered answers, and addressed them in subsequent interviews or passed them to the partner manager. This turned the process into a dialogue rather than a one-way announcement of changes.\nParticipant selection. Together with the researcher, I selected participants at each stage based on region, performance metrics, and partner segment. More than 20 partners participated in the research.\nInterface adaptation. Once the terms were finalized, I updated the FAQ to clearly explain them to partners joining the test. I reflected the new commission logic in the partner dashboard and added acceptance of the required documents to the onboarding flow for test participants.",
      },
      {
        title: "Challenges",
        text: "Despite its flexibility, the new commission model was more complex than the previous one, making it challenging to explain clearly. However, none of the partners reported difficulty understanding the terms during the research; their feedback suggested the opposite.\nLow participant recruitment conversion was another challenge. How I organized recruitment, increased participation, and reduced the time required is covered in a separate UX research case study.",
      },
      {
        title: "Outcome",
        text: "In the final study, 80% of highest-earning partners accepted the new model's terms.\nAfter approximately four months of testing, key metrics remained within the expected confidence interval, with no anomalies or significant deviations from the forecast or control group.",
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
    summary:
      "Building a reliable way to recruit relevant B2B partners for UX research.",
    contribution:
      "Research planning, interview scripts, recruitment strategy, targeted invitations, in-product surveys, and partner community concept.",
    outcome:
      "Reduced UX research recruitment time by 57%, from 3.5 to 1.5 sprints, while doubling the number of participants from 6 to 12.",
    role: "Process Lead / Area Product Designer",
    period: "2025–2026",
    stage: "Implemented research practice",
    cover_path: null,
    sections: [
      {
        title: "Context",
        text: "Recruiting partners for UX research was a bottleneck: it took 3.5 sprints to recruit just 6 participants, still below the minimum required. We needed more effective approaches to recruit enough relevant participants within a reasonable timeframe.",
      },
      {
        title: "What I did",
        text: "Research planning. I led UX research initiatives for the B2B product, planned the quarterly research roadmap, developed interview scripts, and analyzed findings in collaboration with a UX researcher.\nTesting recruitment methods. I explored several approaches and identified a combination of methods that improved recruitment.\nFirst, a portal banner linking to a survey. Alongside the survey's main topic, I added a question about willingness to participate in interviews, building a pool of potential research participants in parallel.\nSecond, personalized invitations. I manually selected candidates from exported data and sent personalized invitations through their partner managers, including a calendar link to schedule an interview.\nThird, a Telegram community for key partners. I developed the concept for a private channel for partners generating most of the program's profit. The community was designed to provide value to both sides through discussions about the portal's direction, early information about promotions, surveys, and interview invitations.\nI defined how the channel would operate, developed moderation guidelines with the social media team, established participant selection criteria, selected the initial test group, and prepared the invitation flow and participant instructions. All 5 partners surveyed expressed interest in joining. The channel was being prepared for launch.",
      },
      {
        title: "Challenges",
        text: "The main challenge was recruiting enough relevant partners within a limited research timeline. I needed to identify an effective combination of recruitment methods, coordinate personalized outreach through partner managers, and establish a more sustainable participant recruitment process instead of relying on one-off invitations.\nAt the same time, the proposed Telegram community was a longer-term initiative, so the immediate recruitment bottleneck had to be addressed independently of its launch.",
      },
      {
        title: "Outcome",
        text: "Reduced UX research recruitment time by 57%, from 3.5 to 1.5 sprints, while doubling the number of participants recruited from 6 to 12.\nThe new approach established a pool of potential research participants and a more effective invitation process. The planned Telegram community was designed to support long-term partner engagement and create a recurring source of participants for future UX research.",
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
