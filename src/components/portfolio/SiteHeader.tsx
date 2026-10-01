import { Link, useLocation } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";

export function SiteHeader({ resumeUrl }: { resumeUrl?: string | null }) {
  const pathname = useLocation({ select: (location) => location.pathname });
  const hash = useLocation({ select: (location) => location.hash });
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-container header-inner">
          <Link to="/" className="brand-name focus-ring">
            Tatiana Kapkaeva
          </Link>
          <nav aria-label="Main navigation" className="header-nav">
            <Link
              to="/work"
              className="nav-link"
              aria-current={pathname.startsWith("/work") ? "page" : undefined}
            >
              Work
            </Link>
            <Link
              to="/about"
              className="nav-link"
              aria-current={pathname === "/about" ? "page" : undefined}
            >
              About
            </Link>
            <Link
              to="/"
              hash="contact"
              activeOptions={{ exact: true, includeHash: true }}
              className="nav-link"
              aria-current={pathname === "/" && hash === "contact" ? "location" : undefined}
            >
              Contact
            </Link>
            <a
              className="nav-link"
              href={resumeUrl || "/Tatiana_Kapkaeva_CV.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Tatiana Kapkaeva CV (PDF)"
            >
              CV
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <span>© 2026 Tatiana Kapkaeva</span>
        <Link to="/" hash="contact" className="text-link">
          Let’s talk
        </Link>
      </div>
    </footer>
  );
}
