import { createFileRoute } from '@tanstack/react-router';
import { AdminPage } from '@/components/portfolio/AdminPage';
export const Route = createFileRoute('/admin')({
  ssr: false,
  head: () => ({ meta: [
    { title: 'Portfolio editor — Tatiana Kapkaeva' },
    { name: 'description', content: 'Private portfolio editor for Tatiana Kapkaeva.' },
    { property: 'og:title', content: 'Portfolio editor — Tatiana Kapkaeva' },
    { property: 'og:description', content: 'Private portfolio editor.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
    { name: 'robots', content: 'noindex, nofollow' },
  ] }),
  component: AdminPage,
});
