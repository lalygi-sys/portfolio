import { linksOf, safeExternalUrl, type CaseWithMedia } from "@/lib/portfolio";
import { presentCase, isOriginalCaseField } from "@/lib/home-content";

export type ProjectCategory = "Product work" | "Independent projects" | "Freelance & earlier work";
export type ProjectMetric = { value: string; label: string };
export type PortfolioProject = {
  slug: string;
  title: string;
  product: string;
  category: ProjectCategory;
  role: string;
  period: string;
  tags: string[];
  summary: string;
  context: string;
  outcome: string;
  coverImage?: string | undefined;
  coverAlt: string;
  localCover: boolean;
  metrics: ProjectMetric[];
  featured: boolean;
  sortOrder: number;
  caseStudyPath?: string;
  prototypeUrl?: string;
  externalLinks: { label: string; url: string }[];
  draft: boolean;
};

type ProjectNotes = Pick<PortfolioProject, "product" | "summary" | "coverAlt" | "metrics">;
const productNotes: Record<string, ProjectNotes> = {
  "kyc-kyb-onboarding": {
    product: "Partner onboarding",
    summary:
      "Opening the portal earlier, while keeping individual and business verification clear and compliant.",
    coverAlt:
      "KYC and KYB registration flow map, showing verification branches, interface screens and review states",
    metrics: [
      {
        value: "10–20%",
        label:
          "of IB program profit came from the smaller-partner segment whose entry barrier was addressed",
      },
      { value: "Early access", label: "portal access before verification is complete" },
    ],
  },
  "b2b-rebates-payouts": {
    product: "Rebate",
    summary:
      "Redesigning how partners share commission with clients as regulatory requirements changed.",
    coverAlt:
      "Rebate sharing interface with client payout settings and a table of automated commission payments",
    metrics: [
      {
        value: "Automated payouts",
        label: "commission-sharing flow designed and tested with partners",
      },
      { value: "Regulatory approval", label: "compliance-compatible payout mechanics" },
    ],
  },
  "standalone-partner-portal": {
    product: "IB Partner Portal",
    summary:
      "Turning a partner area into a standalone product through a company and licensing transition.",
    coverAlt:
      "IB Partner Portal dashboard showing partner revenue, activity, client statistics and quick actions",
    metrics: [
      {
        value: "≈7,000",
        label: "active partners retained access and critical workflows during the transition",
      },
      {
        value: "Standalone product",
        label: "portal architecture designed and handed off for development",
      },
    ],
  },
  "new-b2b-business-model": {
    product: "IB partner program",
    summary:
      "Researching new partner terms, building partner buy-in and adapting the portal to a more complex model.",
    coverAlt:
      "Partner program presentation explaining the new IB business model and proposed partner terms",
    metrics: [
      {
        value: "80%",
        label: "of top partners accepted the terms",
      },
      {
        value: "Stable metrics",
        label: "stable over 4 months of testing",
      },
    ],
  },
  "research-recruitment": {
    product: "Research operations",
    summary:
      "Making B2B participant recruitment more reliable through targeted invitations and in-product surveys.",
    coverAlt:
      "Desktop and mobile in-product survey invitations used to recruit UX research participants",
    metrics: [
      { value: "−60%", label: "less time spent recruiting" },
      { value: "2× participants", label: "12 participants instead of 6" },
    ],
  },
};

export const projectCategories: ProjectCategory[] = [
  "Product work",
  "Independent projects",
  "Freelance & earlier work",
];

// Product cases always come from published CMS rows. These notes enrich them;
// they never create a public fallback for a missing or unpublished case.
export function projectFromCase(item: CaseWithMedia): PortfolioProject {
  const presentation = presentCase(item);
  const notes = productNotes[item.slug];
  const uploadedCover = item.cover_path ? item.mediaUrls[item.cover_path] : undefined;
  const localCover = item.slug === "new-b2b-business-model"
    ? "/images/projects/new-b2b-business-model-main.png"
    : undefined;
  const customOutcome = !isOriginalCaseField(item, "outcome");
  return {
    slug: item.slug,
    title: item.slug === "new-b2b-business-model"
      ? "B2B model validation"
      : item.slug === "research-recruitment"
        ? "Research recruitment"
        : presentation.title,
    product: notes?.product ?? "Product design",
    category: "Product work",
    role: item.role,
    period: item.period,
    tags: presentation.tags,
    summary: notes && isOriginalCaseField(item, "summary") ? notes.summary : item.summary,
    context: presentation.description,
    outcome: publicOutcome(item),
    coverImage: localCover || uploadedCover || (notes ? "/images/projects/" + item.slug + ".webp" : undefined),
    coverAlt: localCover ? "B2B partner program presentation and business model interface" : (uploadedCover ? item.title + " — project interface" : (notes?.coverAlt ?? item.title)),
    localCover: !localCover && !uploadedCover && !!notes,
    metrics: customOutcome ? [] : (notes?.metrics ?? []),
    featured: item.featured,
    sortOrder: item.sort_order,
    caseStudyPath: "/work/" + item.slug,
    externalLinks: linksOf(item.links).filter((link) => safeExternalUrl(link.url)),
    draft: !item.published,
  };
}

export function publicOutcome(item: CaseWithMedia): string {
  // The legacy seed contains a redacted financial placeholder, not a public metric.
  return item.slug === "b2b-rebates-payouts" && isOriginalCaseField(item, "outcome")
    ? "The interim solution was implemented. The automated flow was refined with partners and prepared for development and a pilot, with compliance-compatible payout mechanics."
    : item.outcome;
}

const visualProject = (
  slug: string,
  title: string,
  summary: string,
  context: string,
  coverAlt: string,
  tags: string[],
  sortOrder: number,
): PortfolioProject => ({
  slug,
  title,
  summary,
  context,
  coverAlt,
  tags,
  sortOrder,
  product: title,
  category: "Freelance & earlier work",
  role: "UX/UI design",
  period: "",
  outcome: "",
  metrics: [],
  featured: false,
  draft: false,
  localCover: true,
  coverImage: "/images/projects/" + slug + ".webp",
  externalLinks: [],
});

export const additionalProjects: PortfolioProject[] = [
  visualProject(
    "window-configurator",
    "Window configurator",
    "A step-by-step interface for choosing a window’s dimensions, materials, profile and components.",
    "The configuration flow takes a customer from choosing a window type to specifying dimensions, opening direction and component options. The screens bring technical choices into a guided visual sequence.",
    "Three mobile window configurator screens for selecting a window, editing dimensions and choosing materials",
    ["UX/UI", "Configuration", "Mobile"],
    10,
  ),
  visualProject(
    "pizza-ordering-experience",
    "Pizza ordering experience",
    "A mobile ordering flow that connects food preferences, delivery location, pizza customisation and checkout.",
    "The mobile screens cover preference and location selection, browsing the menu, customising a pizza and reviewing the cart. The focus is on making each choice understandable throughout the ordering journey.",
    "Three mobile pizza ordering screens showing food preferences, pizza customisation and the cart",
    ["UX/UI", "E-commerce", "Mobile"],
    11,
  ),
];

// Unpublished briefs only. No contribution, results, dates or metrics are assumed.
export const draftProjects: Pick<
  PortfolioProject,
  "slug" | "title" | "category" | "draft" | "externalLinks"
>[] = [
  {
    slug: "language-learning",
    title: "Language-learning product",
    category: "Independent projects",
    draft: true,
    externalLinks: [{ label: "Product", url: "https://lalygi-sys.github.io/eng/" }],
  },
  {
    slug: "application-security",
    title: "Information / application security product",
    category: "Independent projects",
    draft: true,
    externalLinks: [],
  },
  {
    slug: "copy-trading",
    title: "Copy Trading",
    category: "Product work",
    draft: true,
    externalLinks: [],
  },
];

export function getPublicProjects(cases: CaseWithMedia[]): PortfolioProject[] {
  const hiddenSlugs = new Set(
    draftProjects.filter((project) => project.draft).map((project) => project.slug),
  );
  return [...cases.filter((item) => item.published).map(projectFromCase), ...additionalProjects]
    .filter((project) => !project.draft && !hiddenSlugs.has(project.slug))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
