import { createFileRoute, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPublishedCase } from '@/lib/portfolio.functions';
import { CaseDetail } from '@/components/portfolio/CaseDetail';
import { additionalProjects } from '@/lib/projects';
import { SiteHeader, SiteFooter } from '@/components/portfolio/SiteHeader';
import { ProjectCover } from '@/components/portfolio/ProjectCover';

const caseQuery = (slug: string) => ({ queryKey: ['published-case', slug], queryFn: () => getPublishedCase({ data: { slug } }), staleTime: 30_000 });
export const Route = createFileRoute('/work/$slug')({
  loader: async ({ context, params }) => { const local = additionalProjects.find(project => project.slug === params.slug); if (local) return local; const data = await context.queryClient.ensureQueryData(caseQuery(params.slug)); if (!data) throw notFound(); return data; },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.title} — Tatiana Kapkaeva` : 'Case not found — Tatiana Kapkaeva' },
    { name: 'description', content: loaderData?.summary || 'This case is not available.' },
    { property: 'og:title', content: loaderData ? `${loaderData.title} — Tatiana Kapkaeva` : 'Case not found — Tatiana Kapkaeva' },
    { property: 'og:description', content: loaderData?.summary || 'This case is not available.' },
    { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' },
    ...(!loaderData ? [{ name: 'robots', content: 'noindex' }] : []),
  ] }),
  errorComponent: () => <div className="site-container py-24">This case could not be loaded right now.</div>,
  notFoundComponent: () => <div className="site-container py-24"><h1 className="text-3xl font-semibold">Case not found</h1><p className="mt-4">This case may be a private draft or no longer published.</p></div>,
  component: CasePage,
});
function CasePage() {
  const { slug } = Route.useParams();
  const project = additionalProjects.find(item => item.slug === slug);
  if (project) return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="site-container work-page">
        <div className="page-intro">
          <p className="eyebrow">{project.role}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <ProjectCover project={project} />
        <section className="section-space">
          <h2>Context & contribution</h2>
          <p className="project-summary">{project.context}</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
  return <PublishedCasePage slug={slug} />;
}

function PublishedCasePage({ slug }: { slug: string }) {
  const { data } = useSuspenseQuery(caseQuery(slug));
  return data ? <CaseDetail item={data} /> : null;
}
