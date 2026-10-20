import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Expand, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PortfolioVisual } from "./PortfolioVisual";
import { CaseHeroTags } from "./CaseHeroTags";
import { ProjectCover } from "./ProjectCover";
import { projectFromCase, publicOutcome } from "@/lib/projects";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import { linksOf, safeExternalUrl, sectionsOf, type CaseWithMedia } from "@/lib/portfolio";
import { KycCaseStudy } from "./KycCaseStudy";
import { OinkryptCaseStudy } from "./OinkryptCaseStudy";

export function CaseDetail({ item, preview = false }: { item: CaseWithMedia; preview?: boolean }) {
  if (item.slug === "kyc-kyb-onboarding" && !preview) return <KycCaseStudy item={item} />;
  if (item.slug === "oinkrypt" && !preview) return <OinkryptCaseStudy item={item} />;
  return <StandardCaseDetail item={item} preview={preview} />;
}

function StandardCaseDetail({ item, preview = false }: { item: CaseWithMedia; preview?: boolean }) {
  const project = projectFromCase(item);
  const [zoom, setZoom] = useState<{ url: string; caption: string } | null>(null);
  const sections = sectionsOf(item.sections).filter(
    (s) =>
      s.text?.trim() ||
      (s.imagePath && item.mediaUrls[s.imagePath]) ||
      (s.linkUrl && safeExternalUrl(s.linkUrl)),
  );
  const hideCaseHighlights = [
    "b2b-rebates-payouts",
    "standalone-partner-portal",
    "new-b2b-business-model",
    "research-recruitment",
  ].includes(item.slug);
  return (
    <>
      <SiteHeader />
      {preview && (
        <div className="bg-accent py-2 text-center text-sm font-medium text-accent-foreground">
          Draft preview · Only you can see this version
        </div>
      )}
      <main id="main-content" tabIndex={-1} className="site-container case-detail pb-24">
        <div className="case-intro">
          {preview ? (
            <Link to="/admin" className="text-link inline-flex items-center gap-2 text-sm">
              <ArrowLeft className="size-4" /> Back to editor
            </Link>
          ) : (
            <Link to="/work" className="text-link inline-flex items-center gap-2 text-sm">
              <ArrowLeft className="size-4" /> All work
            </Link>
          )}
          <div className="mt-12 max-w-4xl">
            <CaseHeroTags tags={project.tags} />
            <h1 className="case-title mt-5">{item.title}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              {item.summary}
            </p>
          </div>
          <div className="case-meta mt-12 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
            <div>
              <span>Role & contribution</span>
              <p>{item.role || item.contribution}</p>
            </div>
            <div>
              <span>Period</span>
              <p>{item.period || "—"}</p>
            </div>
            <div>
              <span>Project stage</span>
              <p>{item.stage || "—"}</p>
            </div>
          </div>
        </div>
        <div
          className={[
            "mb-16",
            item.slug === "new-b2b-business-model" && "case-cover-b2b-model",
            item.slug === "research-recruitment" && "case-cover-research-recruitment",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {project.coverImage ? (
            project.prototypeUrl ? (
              <>
                <a
                  className="case-prototype-cover case-media-hover-link focus-ring"
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} ${project.prototypeLabel === "Open PDF" ? "PDF" : "prototype"}`}
                >
                  <ProjectCover project={project} eager />
                  <span className="case-media-hover-action">
                    {project.prototypeLabel ?? "Open prototype"}{" "}
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </a>
                <div className="case-media-caption">
                  <a href={project.prototypeUrl} target="_blank" rel="noopener noreferrer">
                    {project.prototypeLabel ?? "Open prototype"}{" "}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </>
            ) : (
              <ProjectCover project={project} eager />
            )
          ) : (
            <PortfolioVisual item={item} className="case-cover" />
          )}
        </div>
        <div className="case-body">
          <aside className="case-index">
            <span className="eyebrow">In this case</span>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id || index}>
                  <a href={`#section-${index}`} className="text-link">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="min-w-0">
            {item.contribution && !hideCaseHighlights && (
              <div className="case-highlight">
                <span className="eyebrow">My contribution</span>
                <p>{item.contribution}</p>
              </div>
            )}
            {sections.map((section, index) => (
              <section
                id={`section-${index}`}
                className="case-section scroll-mt-24"
                key={section.id || index}
              >
                <div className="case-section-heading">
                  <span className="eyebrow">
                    {String(index + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
                  </span>
                  <h2>{section.title}</h2>
                </div>
                <div className="case-section-content">
                {section.text && (
                  <div className="case-prose">
                    {section.text
                      .split("\n")
                      .filter(Boolean)
                      .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
                )}
                {section.imagePath && item.mediaUrls[section.imagePath] && (
                  <figure className="mt-8">
                    <Button
                      variant="ghost"
                      className="group image-expand h-auto w-full p-0"
                      onClick={() => {
                        const url = item.mediaUrls[section.imagePath || ""];
                        if (url) setZoom({ url, caption: section.caption || section.title });
                      }}
                      aria-label={`Enlarge image: ${section.caption || section.title}`}
                    >
                      <img
                        src={item.mediaUrls[section.imagePath]}
                        alt={section.caption || section.title}
                        className="h-auto max-h-[720px] w-full object-contain"
                      />
                      <span className="image-expand-icon">
                        <Expand className="size-4" />
                      </span>
                    </Button>
                    {section.caption && <figcaption>{section.caption}</figcaption>}
                  </figure>
                )}
                {section.linkUrl && safeExternalUrl(section.linkUrl) && (
                  <a
                    className="text-link mt-6 inline-flex items-center gap-1 text-sm font-semibold"
                    href={safeExternalUrl(section.linkUrl) || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {section.linkLabel || "View prototype"} <ArrowUpRight className="size-4" />
                  </a>
                )}
                </div>
              </section>
            ))}
            {item.outcome && !hideCaseHighlights && (
              <div className="outcome-band">
                <span className="eyebrow">The outcome</span>
                <p>{publicOutcome(item)}</p>
              </div>
            )}
            {item.nda && (
              <p className="case-walkthrough-note">
                <FileText className="case-walkthrough-icon" aria-hidden="true" />
                Detailed walkthrough available on request.
              </p>
            )}
            {linksOf(item.links)
              .filter((link) => safeExternalUrl(link.url))
              .map((link, i) => (
                <a
                  key={i}
                  className="text-link mt-5 mr-6 inline-flex items-center gap-1 text-sm"
                  href={safeExternalUrl(link.url) || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label || "View link"} <ArrowUpRight className="size-4" />
                </a>
              ))}
          </div>
        </div>
        <div className="mt-24 border-t border-border pt-7">
          <Link to="/work" className="text-link inline-flex items-center gap-2 font-medium">
            <ArrowLeft className="size-4" /> Back to all work
          </Link>
        </div>
      </main>
      <SiteFooter />
      <Dialog open={!!zoom} onOpenChange={(open) => !open && setZoom(null)}>
        <DialogContent className="image-dialog max-w-[94vw] border-0 bg-background p-3 sm:max-w-[94vw]">
          <DialogTitle className="pr-8 text-sm font-medium">{zoom?.caption}</DialogTitle>
          {zoom && (
            <div className="max-h-[82vh] overflow-auto">
              <img
                src={zoom.url}
                alt={zoom.caption}
                className="mx-auto h-auto max-w-none min-w-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
