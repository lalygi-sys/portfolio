import type { CaseWithMedia } from "@/lib/portfolio";

const storedCases = [
  {
    "id": "81d396f6-fb1b-4198-b268-2b408f0caf07",
    "slug": "kyc-kyb-onboarding",
    "title": "KYC/KYB onboarding for individuals and businesses",
    "summary": "Making registration and verification workable across individuals, companies, documents, review states, and compliance constraints.",
    "contribution": "Research, benchmarking, branching journeys, verification states, and an early-access model.",
    "outcome": "Designed an onboarding model that lets partners explore the portal before verification. Smaller partners represented 10–20% of program profit; that figure is segment context, not a redesign outcome.",
    "role": "Area Product Designer / Project Lead",
    "period": "2025–2026",
    "stage": "Designed; full rollout not claimed",
    "cover_path": null,
    "sections": [
      {
        "text": "The previous entry model delayed access until verification was complete and excluded partners with fewer than five clients. Compliance requirements still had to govern document collection, review, and approval.",
        "title": "Context and constraints"
      },
      {
        "text": "I benchmarked comparable products and examined the value of smaller partners. This informed a model that separates early exploration of the portal from access to regulated actions.",
        "title": "Research and insights"
      },
      {
        "text": "Entry → identify individual or business → collect the relevant documents → review and approval. In parallel, allow limited early access while verification is pending. Exception paths account for missing documents, additional review, and different risk profiles. The exact permissions at each stage depend on compliance approval.",
        "title": "Key decisions"
      },
      {
        "text": "The important design work was the branching logic: which information is required, when a partner can enter the portal, what each review state communicates, and how an exception returns to the main path. A full flow and readable decision-level excerpts can be added here.",
        "title": "Flows and interface"
      },
      {
        "text": "The resulting model widened the proposed entry path while retaining verification controls. A full launch or conversion lift is not claimed.",
        "title": "Outcomes and learnings"
      }
    ],
    "links": [],
    "nda": true,
    "published": true,
    "featured": true,
    "sort_order": 1,
    "created_at": "2026-09-23T23:18:47.947868+00:00",
    "updated_at": "2026-09-23T23:18:47.947868+00:00"
  },
  {
    "id": "f1e869ed-b56f-4860-a10b-65cb6f83072e",
    "slug": "b2b-rebates-payouts",
    "title": "Redesigning B2B rebates and payouts",
    "summary": "Restructuring partner-to-client payouts as regulatory requirements changed.",
    "contribution": "An interim solution, future payout mechanics, states and exceptions, a Cursor prototype, and partner testing.",
    "outcome": "An interim solution was implemented. The automated flow was refined with partners and prepared for development and a pilot; prevention of $XXXk in losses was an estimate.",
    "role": "Area Product Designer",
    "period": "2025–2026",
    "stage": "Interim solution implemented; target flow prepared for pilot",
    "cover_path": null,
    "sections": [
      {
        "text": "A licensing transition affected the existing form of partner-to-client rebates. The work needed to retain the program while meeting new regulatory requirements.",
        "title": "Context and constraints"
      },
      {
        "text": "I investigated constraints with legal and product partners and tested an interactive Cursor prototype with partners. Feedback informed adjustments before development.",
        "title": "Research and insights"
      },
      {
        "text": "First, an interim rebate option maintained continuity under the constraints. Separately, I designed an automated flow covering calculation, payout rules, statuses, manual actions, and exceptions.",
        "title": "Key decisions"
      },
      {
        "text": "The target design brings payout review, setup, status, and exception handling into a coherent workflow. It was prepared for development and a test launch, not presented as fully deployed.",
        "title": "Flows and interface"
      },
      {
        "text": "The temporary solution was implemented. The target flow was handed off for development and pilot testing. Estimated loss prevention is not confirmed revenue growth.",
        "title": "Outcomes and learnings"
      }
    ],
    "links": [],
    "nda": true,
    "published": true,
    "featured": true,
    "sort_order": 2,
    "created_at": "2026-09-23T23:18:47.947868+00:00",
    "updated_at": "2026-09-23T23:18:47.947868+00:00"
  },
  {
    "id": "7cabe16e-9029-43f0-af05-d7a7a88c56f5",
    "slug": "standalone-partner-portal",
    "title": "Designing a standalone B2B partner portal",
    "summary": "Turning a partner area into an independent product through organizational and licensing changes.",
    "contribution": "Workflow audit, customer journeys, service blueprints, product structure, interface design, and transition planning.",
    "outcome": "The transition preserved partner access while operational processes were reorganized; this does not imply every designed section launched.",
    "role": "Area Product Designer",
    "period": "2025–2026",
    "stage": "Transition completed; sections at different delivery stages",
    "cover_path": null,
    "sections": [
      {
        "text": "The partner program moved away from shared company infrastructure during organizational and licensing changes. Partner access and support processes had to remain coherent throughout the transition.",
        "title": "Context and constraints"
      },
      {
        "text": "I audited the existing partner journey and its operational dependencies, using customer journeys and service blueprints to expose work behind the interface.",
        "title": "Research and insights"
      },
      {
        "text": "I mapped what partners needed at each stage, defined the product structure and transition dependencies, and coordinated interface and service changes with cross-functional teams.",
        "title": "Key decisions"
      },
      {
        "text": "The portal work spans dashboard, partner operations, and transition touchpoints. The design distinguished between the new product vision and the specific capabilities needed for a safe transition.",
        "title": "Flows and interface"
      },
      {
        "text": "Partner access was preserved during the transition, with operational processes adapted. This is not a claim that all designed sections were launched.",
        "title": "Outcomes and learnings"
      }
    ],
    "links": [],
    "nda": true,
    "published": true,
    "featured": true,
    "sort_order": 3,
    "created_at": "2026-09-23T23:18:47.947868+00:00",
    "updated_at": "2026-09-23T23:18:47.947868+00:00"
  },
  {
    "id": "ae575f9c-65a8-4ab7-82b6-61d7e0ba8e05",
    "slug": "new-b2b-business-model",
    "title": "Validating a new B2B business model",
    "summary": "Testing revised partner program terms and explaining a more complex model.",
    "contribution": "Partner research, feedback analysis, presentation of terms, and portal adaptation.",
    "outcome": "80% of participating top partners accepted the proposed terms; pilot metrics remained stable.",
    "role": "Area Product Designer / Research Lead",
    "period": "2025–2026",
    "stage": "Pilot",
    "cover_path": null,
    "sections": [
      {
        "text": "The partner program needed a new model that could be clearly explained and evaluated with its largest partners.",
        "title": "Context and constraints"
      },
      {
        "text": "I worked through partner feedback to understand objections and improve how the new mechanics were communicated.",
        "title": "Research and insights"
      },
      {
        "text": "Present the terms clearly, adapt the interface where the model changes the experience, and test the proposal with participating top partners before wider decisions.",
        "title": "Key decisions"
      },
      {
        "text": "80% of participating top partners accepted the proposed terms; pilot metrics remained stable. This finding applies to the participants, not the whole partner base.",
        "title": "Outcomes and learnings"
      }
    ],
    "links": [],
    "nda": true,
    "published": true,
    "featured": false,
    "sort_order": 4,
    "created_at": "2026-09-23T23:18:47.947868+00:00",
    "updated_at": "2026-09-23T23:18:47.947868+00:00"
  },
  {
    "id": "f791544a-91f9-4a3f-8cb2-2bbb4a846108",
    "slug": "research-recruitment",
    "title": "Improving research recruitment",
    "summary": "Finding more reliable ways to recruit B2B research participants.",
    "contribution": "Research planning with a researcher, interview guides, analysis, hypothesis checks, targeted invitations, and in-product surveys.",
    "outcome": "Reduced recruitment time by approximately 60% while doubling participant numbers.",
    "role": "Process Lead / Area Product Designer",
    "period": "2025–2026",
    "stage": "Implemented research practice",
    "cover_path": null,
    "sections": [
      {
        "text": "Recruitment for B2B partner research was a bottleneck; the existing approach required several sprints to reach enough participants.",
        "title": "Context and constraints"
      },
      {
        "text": "Together with a researcher I planned studies, wrote interview guides, analysed findings, and checked hypotheses while trying different recruitment methods.",
        "title": "Research and insights"
      },
      {
        "text": "Targeted invitations through partner managers and in-product surveys gave relevant participants clearer ways to join research.",
        "title": "Key decisions"
      },
      {
        "text": "Reduced recruitment time by approximately 60% while doubling participant numbers.",
        "title": "Outcomes and learnings"
      }
    ],
    "links": [],
    "nda": true,
    "published": true,
    "featured": false,
    "sort_order": 5,
    "created_at": "2026-09-23T23:18:47.947868+00:00",
    "updated_at": "2026-09-23T23:18:47.947868+00:00"
  }
];

export const portfolioCases: CaseWithMedia[] = storedCases.map((item) => ({
  ...item,
  mediaUrls: {},
})) as CaseWithMedia[];

export const portfolioSettings = {
  "id": 1,
  "about": "I start by understanding the problem, the business behind it, and the constraints that shape it. I map the full customer experience — including the operational work that happens out of sight — and work closely with product, engineering, analytics, and compliance to test decisions before delivery. Design systems help me keep complex products coherent; prototyping beyond Figma, including low-code and AI-assisted tools, helps make ideas tangible early.",
  "email": "tatikorostyleva2194@gmail.com",
  "telegram": "https://t.me/tiana_koro",
  "resume_path": null,
  "updated_at": "2026-09-23T23:18:47.947868+00:00"
};

