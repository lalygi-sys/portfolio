import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SiteHeader } from '@/components/portfolio/SiteHeader';
export const Route = createFileRoute('/reset-password')({
  ssr: false,
  head: () => ({ meta: [
    { title: 'Reset password — Tatiana Kapkaeva' }, { name: 'description', content: 'Reset portfolio editor password.' },
    { property: 'og:title', content: 'Reset password — Tatiana Kapkaeva' }, { property: 'og:description', content: 'Reset portfolio editor password.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex, nofollow' },
  ] }),
  component: ResetPassword,
});
function ResetPassword() {
  const [valid, setValid] = useState(false); const [password, setPassword] = useState(''); const [message, setMessage] = useState('');
  useEffect(() => { const hash = new URLSearchParams(window.location.hash.slice(1)); setValid(hash.get('type') === 'recovery'); const { data: subscription } = supabase.auth.onAuthStateChange(event => { if (event === 'PASSWORD_RECOVERY') setValid(true); }); return () => subscription.subscription.unsubscribe(); }, []);
  async function submit(event: React.FormEvent) { event.preventDefault(); const { error } = await supabase.auth.updateUser({ password }); setMessage(error ? error.message : 'Password updated. You can now open the editor.'); }
  return <><SiteHeader /><main id="main-content" tabIndex={-1} className="site-container admin-auth"><p className="eyebrow">Private editor</p><h1>Set a new password</h1>{valid ? <form onSubmit={submit} className="mt-8 grid gap-4"><label htmlFor="new-password">New password</label><Input id="new-password" type="password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} /><Button type="submit">Update password</Button></form> : <p className="mt-6">Open the recovery link from your email to reset your password.</p>}{message && <p role="status" className="mt-5">{message}</p>}<Link className="text-link mt-7 inline-block" to="/admin">Return to editor</Link></main></>;
}
