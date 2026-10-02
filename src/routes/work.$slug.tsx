import { useRef, useState } from 'react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowUpRight, Expand, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { CaseDetail } from '@/components/portfolio/CaseDetail';
import { additionalProjects } from '@/lib/projects';
import { portfolioCases } from '@/lib/portfolio.content';
import { SiteHeader, SiteFooter } from '@/components/portfolio/SiteHeader';
import { ProjectCover } from '@/components/portfolio/ProjectCover';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const caseQuery = (slug: string) => ({
  queryKey: ['published-case', slug],
  queryFn: async () => portfolioCases.find(item => item.slug === slug && item.published) ?? null,
  staleTime: Infinity,
});
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
  const [zoomScale, setZoomScale] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const activePointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);

  const updatePinchZoom = () => {
    const pointers = [...activePointers.current.values()];
    if (pointers.length !== 2) return;
    const distance = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
    if (!pinchStart.current) {
      pinchStart.current = { distance, scale: zoomScale };
      return;
    }
    setZoomScale(Math.min(3, Math.max(0.5, pinchStart.current.scale * (distance / pinchStart.current.distance))));
  };
  if (project) return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className={`site-container work-page${["pizza-ordering-experience", "window-configurator"].includes(project.slug) ? " pizza-case" : ""}`}
      >
        <div className="page-intro">
          <p className="eyebrow">{project.role}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <ProjectCover project={project} />
        {project.detailImage && (
          <>
            <section className="pizza-flow section-space" aria-labelledby="pizza-flow-title">
              <h2 id="pizza-flow-title">Full mobile flow</h2>
              {project.detailPdfUrl && !project.detailImageZoomEnabled ? (
                <a
                  className="pizza-flow-pdf-cover focus-ring"
                  href={project.detailPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={project.detailImage} alt={project.detailImageAlt || project.title} />
                  <span className="pizza-flow-pdf-action">
                    Open PDF <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </a>
              ) : (
                <Button
                  variant="ghost"
                  className="group pizza-flow-trigger h-auto w-full p-0"
                  onClick={() => {
                    setZoomScale(1);
                    setIsZoomOpen(true);
                  }}
                  aria-label={`Enlarge image: ${project.detailImageAlt || project.title}`}
                >
                  <img src={project.detailImage} alt={project.detailImageAlt || project.title} />
                  <span className="image-expand-icon" aria-hidden="true">
                    <Expand className="size-5" />
                  </span>
                </Button>
              )}
            </section>
            {project.detailImageZoomEnabled && (
              <Dialog
                open={isZoomOpen}
                onOpenChange={(open) => {
                  setIsZoomOpen(open);
                  if (!open) {
                    activePointers.current.clear();
                    pinchStart.current = null;
                    setZoomScale(1);
                  }
                }}
              >
                <DialogContent className="image-dialog max-w-[96vw] border-0 bg-background p-3 sm:max-w-[96vw]">
                <div className="image-dialog-header">
                  <DialogTitle className="pr-8 text-sm font-medium">{project.title}</DialogTitle>
                  <div className="image-zoom-controls" aria-label="Image zoom controls">
                    <Button variant="ghost" size="icon" onClick={() => setZoomScale((scale) => Math.max(0.5, scale - 0.25))} aria-label="Zoom out">
                      <ZoomOut className="size-4" />
                    </Button>
                    <span>{Math.round(zoomScale * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={() => setZoomScale((scale) => Math.min(3, scale + 0.25))} aria-label="Zoom in">
                      <ZoomIn className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setZoomScale(1)} aria-label="Reset zoom">
                      <RotateCcw className="size-4" />
                    </Button>
                  </div>
                </div>
                <div
                  className="image-dialog-canvas max-h-[82vh] overflow-auto"
                  onPointerDown={(event) => {
                    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
                    event.currentTarget.setPointerCapture(event.pointerId);
                    updatePinchZoom();
                  }}
                  onPointerMove={(event) => {
                    if (!activePointers.current.has(event.pointerId)) return;
                    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
                    updatePinchZoom();
                  }}
                  onPointerUp={(event) => {
                    activePointers.current.delete(event.pointerId);
                    pinchStart.current = null;
                  }}
                  onPointerCancel={(event) => {
                    activePointers.current.delete(event.pointerId);
                    pinchStart.current = null;
                  }}
                >
                  <img
                    src={project.detailImage}
                    alt={project.detailImageAlt || project.title}
                    className="mx-auto h-auto max-w-none"
                    style={{ width: `${zoomScale * 100}%` }}
                  />
                </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
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
