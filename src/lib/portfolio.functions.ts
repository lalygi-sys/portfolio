import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

function publicClient() {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Content service unavailable');
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
}

async function withMedia<T extends { cover_path: string | null; sections: unknown }>(client: ReturnType<typeof publicClient>, row: T) {
  const paths = [row.cover_path, ...(Array.isArray(row.sections) ? row.sections.map((s: { imagePath?: string }) => s?.imagePath) : [])].filter((path): path is string => typeof path === 'string' && !!path);
  const unique = [...new Set(paths)];
  const urls: Record<string, string> = {};
  await Promise.all(unique.map(async path => {
    const { data } = await client.storage.from('portfolio-media').createSignedUrl(path, 3600);
    if (data?.signedUrl) urls[path] = data.signedUrl;
  }));
  return { ...row, mediaUrls: urls };
}

export const getPortfolioHome = createServerFn({ method: 'GET' }).handler(async () => {
  const client = publicClient();
  const [casesResult, settingsResult] = await Promise.all([
    client.from('portfolio_cases').select('*').eq('published', true).order('sort_order', { ascending: true }),
    client.from('portfolio_settings').select('*').eq('id', 1).maybeSingle(),
  ]);
  if (casesResult.error || settingsResult.error) throw new Error('Unable to load portfolio');
  const cases = await Promise.all((casesResult.data ?? []).map(row => withMedia(client, row)));
  let resumeUrl: string | null = null;
  if (settingsResult.data?.resume_path) {
    const { data } = await client.storage.from('portfolio-media').createSignedUrl(settingsResult.data.resume_path, 3600);
    resumeUrl = data?.signedUrl ?? null;
  }
  return { cases, settings: settingsResult.data, resumeUrl };
});

export const getPublishedCase = createServerFn({ method: 'GET' })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const client = publicClient();
    const { data: row, error } = await client.from('portfolio_cases').select('*').eq('slug', data.slug).eq('published', true).maybeSingle();
    if (error) throw new Error('Unable to load case');
    return row ? withMedia(client, row) : null;
  });
