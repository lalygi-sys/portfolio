import type { CaseWithMedia } from "@/lib/portfolio";

type CasePresentation = {
  title: string;
  tags: string[];
  description: string;
  outcome: string;
  status: string;
};

type CaseEdit = {
  original: Pick<CaseWithMedia, "title" | "summary" | "contribution" | "outcome" | "stage">;
  presentation: CasePresentation;
};

// Homepage edits apply only to the original content. Changes made in the
// portfolio editor remain the source of truth, including deliberately empty fields.
const caseEdits: Record<string, CaseEdit> = {
  "kyc-kyb-onboarding": {
    original: {
      title: "KYC/KYB onboarding for individuals and businesses",
      summary:
        "Making registration and verification workable across individuals, companies, documents, review states, and compliance constraints.",
      contribution:
        "Research, benchmarking, branching journeys, verification states, and an early-access model.",
      outcome:
        "Designed an onboarding model that lets partners explore the portal before verification. Smaller partners represented 10–20% of program profit; that figure is segment context, not a redesign outcome.",
      stage: "Designed; full rollout not claimed",
    },
    presentation: {
      title: "KYC/KYB onboarding",
      tags: ["Fintech", "Verification", "Service design"],
      description:
        "Partners needed a way to explore the portal while verification was still pending. I designed the individual and business journeys, document requirements, review states and exceptions, balancing early access with compliance controls.",
      outcome:
        "The proposed model enables limited early access while keeping regulated actions behind verification.",
      status: "Designed · not fully launched",
    },
  },
  "b2b-rebates-payouts": {
    original: {
      title: "Redesigning B2B rebates and payouts",
      summary: "Restructuring partner-to-client payouts as regulatory requirements changed.",
      contribution:
        "An interim solution, future payout mechanics, states and exceptions, a Cursor prototype, and partner testing.",
      outcome:
        "An interim solution was implemented. The automated flow was refined with partners and prepared for development and a pilot; prevention of $XXXk in losses was an estimate.",
      stage: "Interim solution implemented; target flow prepared for pilot",
    },
    presentation: {
      title: "B2B rebates & payouts",
      tags: ["B2B", "Payments", "Prototyping"],
      description:
        "A licensing transition required new partner-to-client payout mechanics. I designed an interim solution and a future automated flow, covering rules, states and exceptions, then refined a working prototype through partner testing.",
      outcome:
        "The interim solution shipped; the automated flow was prepared for development and a pilot.",
      status: "Interim shipped · pilot prepared",
    },
  },
  "standalone-partner-portal": {
    original: {
      title: "Designing a standalone B2B partner portal",
      summary:
        "Turning a partner area into an independent product through organizational and licensing changes.",
      contribution:
        "Workflow audit, customer journeys, service blueprints, product structure, interface design, and transition planning.",
      outcome:
        "The transition preserved partner access while operational processes were reorganized; this does not imply every designed section launched.",
      stage: "Transition completed; sections at different delivery stages",
    },
    presentation: {
      title: "Standalone partner portal",
      tags: ["B2B platform", "Service design", "Product structure"],
      description:
        "The partner area needed to become an independent product during organizational and licensing changes. I mapped partner journeys and operational dependencies, defined the product structure, and designed interfaces to support the transition.",
      outcome:
        "Partner access was preserved through the transition; individual sections remain at different delivery stages.",
      status: "Transition complete · delivery ongoing",
    },
  },
};

const researchTags: Record<string, string[]> = {
  "new-b2b-business-model": ["B2B", "Partner research"],
  "research-recruitment": ["B2B", "Research operations"],
};

export function presentCase(item: CaseWithMedia): CasePresentation {
  const edit = caseEdits[item.slug];
  const description = [item.summary, item.contribution].filter(Boolean).join(" ");

  if (!edit) {
    return {
      title: item.title,
      tags: researchTags[item.slug] ?? item.role.split(" / ").filter(Boolean).slice(0, 3),
      description,
      outcome: item.outcome,
      status: item.stage,
    };
  }

  const { original, presentation } = edit;

  return {
    title: item.title === original.title ? presentation.title : item.title,
    tags: presentation.tags,
    description:
      item.summary === original.summary && item.contribution === original.contribution
        ? presentation.description
        : description,
    outcome: item.outcome === original.outcome ? presentation.outcome : item.outcome,
    status: item.stage === original.stage ? presentation.status : item.stage,
  };
}

const originalAbout =
  "I start by understanding the problem, the business behind it, and the constraints that shape it. I map the full customer experience — including the operational work that happens out of sight — and work closely with product, engineering, analytics, and compliance to test decisions before delivery. Design systems help me keep complex products coherent; prototyping beyond Figma, including low-code and AI-assisted tools, helps make ideas tangible early.";

const homepageAbout =
  "I’m a Product Designer with 6 years of product experience and a background in graphic and brand design. I work across discovery, research, interaction design, prototyping and delivery, with a particular focus on complex workflows, regulated products and systems with many operational dependencies.";

export function getAboutCopy(rawAbout: string | null | undefined): string {
  return rawAbout == null || rawAbout === originalAbout ? homepageAbout : rawAbout;
}

const researchOriginals: Record<string, { summary: string; outcome: string }> = {
  "new-b2b-business-model": {
    summary: "Testing revised partner program terms and explaining a more complex model.",
    outcome:
      "80% of participating top partners accepted the proposed terms; pilot metrics remained stable.",
  },
  "research-recruitment": {
    summary: "Finding more reliable ways to recruit B2B research participants.",
    outcome: "Reduced recruitment time by approximately 60% while doubling participant numbers.",
  },
};

export function isOriginalCaseField(item: CaseWithMedia, field: "summary" | "outcome") {
  const original = caseEdits[item.slug]?.original ?? researchOriginals[item.slug];
  return !!original && item[field] === original[field];
}

export const experience = [
  {
    period: "2013–2020",
    company: "",
    title: "Graphic & Brand Designer",
    description: "Product branding, websites, advertising and visual communication.",
    nested: false,
  },
  {
    period: "2020–2023",
    company: "Garage Eight",
    title: "Brand & Product Designer",
    description:
      "Transitioned deeper into digital products, B2B and B2C experiences and design systems, building on my visual and brand background.",
    nested: false,
  },
  {
    period: "2023–2026",
    company: "Garage Eight",
    title: "Senior Product Designer",
    description:
      "End-to-end product design, research, complex workflows, onboarding, service design and delivery.",
    nested: false,
  },
  {
    period: "2025–2026",
    company: "Within Garage Eight",
    title: "Broader product ownership",
    description:
      "Area Product Designer, Project Lead and Research Lead responsibilities on selected initiatives.",
    nested: true,
  },
];
