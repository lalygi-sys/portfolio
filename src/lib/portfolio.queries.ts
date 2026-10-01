import { getPortfolioHome } from "@/lib/portfolio.functions";

export const portfolioQuery = {
  queryKey: ["portfolio-home"],
  queryFn: () => getPortfolioHome(),
  staleTime: 30_000,
};
