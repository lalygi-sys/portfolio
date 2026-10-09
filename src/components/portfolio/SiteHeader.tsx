import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";

export function SiteHeader({ resumeUrl }: { resumeUrl?: string | null }) {
  const pathname = useLocation({ select: (location) => location.pathname });
  const hash = useLocation({ select: (location) => location.hash });
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
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
          <button
            type="button"
            className="mobile-menu-toggle focus-ring"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={`header-nav${menuOpen ? " is-open" : ""}`}
          >
            <Link
              to="/work"
              className="nav-link"
              aria-current={pathname.startsWith("/work") ? "page" : undefined}
              onClick={closeMenu}
            >
              Work
            </Link>
            <Link
              to="/about"
              className="nav-link"
              aria-current={pathname === "/about" ? "page" : undefined}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/"
              hash="contact"
              activeOptions={{ exact: true, includeHash: true }}
              className="nav-link"
              aria-current={pathname === "/" && hash === "contact" ? "location" : undefined}
              onClick={closeMenu}
            >
              Contact
            </Link>
            <a
              className="nav-link cv-nav-link"
              href={resumeUrl || "/Tatiana_Kapkaeva_CV.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Tatiana Kapkaeva CV (PDF)"
              onClick={closeMenu}
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
