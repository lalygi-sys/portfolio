import { portfolioCases, portfolioSettings } from "@/lib/portfolio.content";

export const portfolioHome = {
  cases: portfolioCases,
  settings: portfolioSettings,
  resumeUrl: "/Tatiana_Kapkaeva_CV.pdf",
};

export const portfolioQuery = {
  queryKey: ["portfolio-home"],
  queryFn: async () => portfolioHome,
  staleTime: Infinity,
};
