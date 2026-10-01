import type { Tables } from '@/integrations/supabase/types';

export type CaseRow = Tables<'portfolio_cases'>;
export type Section = { id: string; title: string; text: string; imagePath?: string; caption?: string; linkLabel?: string; linkUrl?: string };
export type CaseWithMedia = CaseRow & { mediaUrls: Record<string, string> };
export const sectionsOf = (value: unknown): Section[] => Array.isArray(value) ? value.filter((item): item is Section => !!item && typeof item === 'object' && typeof item.title === 'string') : [];
export const linksOf = (value: unknown): { label: string; url: string }[] => Array.isArray(value) ? value.filter((item): item is { label: string; url: string } => !!item && typeof item === 'object' && typeof item.url === 'string') : [];
export const safeExternalUrl = (value: string) => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };
