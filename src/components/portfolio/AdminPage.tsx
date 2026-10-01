import { useEffect, useState, type ChangeEvent } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { ArrowDown, ArrowLeft, ArrowUp, Copy, Eye, ImagePlus, LogOut, Plus, Save, Trash2, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import type { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SiteHeader } from './SiteHeader';
import { CaseDetail } from './CaseDetail';
import { sectionsOf, type Section, type CaseRow } from '@/lib/portfolio';

const initialSettings = { id: 1, about: '', email: '', telegram: '', resume_path: null as string | null, updated_at: '' };
const newCase = (position: number): CaseRow => ({ id: crypto.randomUUID(), slug: `new-case-${Date.now()}`, title: 'Untitled case', summary: '', contribution: '', outcome: '', role: '', period: '', stage: 'Draft', cover_path: null, sections: [], links: [], nda: true, published: false, featured: false, sort_order: position, created_at: '', updated_at: '' });

export function AdminPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<'loading' | 'signed-out' | 'denied' | 'owner'>('loading');
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [settings, setSettings] = useState<Tables<'portfolio_settings'>>(initialSettings);
  const [selected, setSelected] = useState<CaseRow | null>(null);
  const [panel, setPanel] = useState<'cases' | 'settings'>('cases');
  const [preview, setPreview] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});

  async function checkOwner() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setAuth('signed-out'); return; }
    const { data, error } = await supabase.rpc('portfolio_owner_status');
    if (error || !data) { setAuth('denied'); return; }
    setAuth('owner');
    await load();
  }
  async function load() {
    const [caseResult, settingsResult] = await Promise.all([
      supabase.from('portfolio_cases').select('*').order('sort_order'),
      supabase.from('portfolio_settings').select('*').eq('id', 1).single(),
    ]);
    if (caseResult.error || settingsResult.error) { setNotice('Unable to load content. Please try again.'); return; }
    setCases(caseResult.data || []); setSettings(settingsResult.data || initialSettings);
    setSelected(previous => previous ? caseResult.data?.find(row => row.id === previous.id) || null : null);
  }
  useEffect(() => { void checkOwner(); const { data: subscription } = supabase.auth.onAuthStateChange(event => { if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') void checkOwner(); }); return () => subscription.subscription.unsubscribe(); }, []);

  async function handleAuth(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setNotice('');
    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }); if (error) throw error;
        setNotice('If that email exists, a password reset link is on its way.');
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } }); if (error) throw error;
        setNotice('Check your email to confirm your account. Only the portfolio owner can access this editor.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error;
        await checkOwner();
      }
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Something went wrong.'); } finally { setBusy(false); }
  }
  async function googleSignIn() { setNotice(''); const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: `${window.location.origin}/admin` }); if (result.error) setNotice(result.error.message); else if (!result.redirected) await checkOwner(); }
  async function signOut() { await router.options.context.queryClient.cancelQueries(); router.options.context.queryClient.clear(); await supabase.auth.signOut(); setSelected(null); setAuth('signed-out'); }

  async function saveCase(row: CaseRow, publish = row.published) {
    setBusy(true); setNotice('');
    const slug = row.slug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    if (!slug || !row.title.trim()) { setBusy(false); setNotice('A title and URL slug are required.'); return; }
    const payload = { id: row.id, slug, title: row.title.trim(), summary: row.summary, contribution: row.contribution, outcome: row.outcome, role: row.role, period: row.period, stage: row.stage, cover_path: row.cover_path, sections: sectionsOf(row.sections), links: row.links, nda: row.nda, published: publish, featured: row.featured, sort_order: row.sort_order };
    const { data, error } = await supabase.from('portfolio_cases').upsert(payload).select().single();
    if (error) setNotice(error.message); else { setCases(previous => [...previous.filter(item => item.id !== data.id), data].sort((a,b) => a.sort_order - b.sort_order)); setSelected(data); setNotice(publish ? 'Published changes saved.' : 'Draft saved.'); router.options.context.queryClient.invalidateQueries(); }
    setBusy(false);
  }
  async function deleteCase(row: CaseRow) {
    if (!window.confirm(`Delete “${row.title}”? This cannot be undone.`)) return;
    const { error } = await supabase.from('portfolio_cases').delete().eq('id', row.id);
    if (error) setNotice(error.message); else { setCases(previous => previous.filter(item => item.id !== row.id)); setSelected(null); setNotice('Case deleted.'); }
  }
  async function move(row: CaseRow, direction: -1 | 1) {
    const index = cases.findIndex(item => item.id === row.id); const other = cases[index + direction]; if (!other) return;
    const changes = [{ id: row.id, sort_order: other.sort_order }, { id: other.id, sort_order: row.sort_order }];
    const results = await Promise.all(changes.map(change => supabase.from('portfolio_cases').update({ sort_order: change.sort_order }).eq('id', change.id)));
    if (results.some(result => result.error)) setNotice('Could not change the order.'); else await load();
  }
  async function saveSettings() { setBusy(true); const { error } = await supabase.from('portfolio_settings').update({ about: settings.about, email: settings.email, telegram: settings.telegram, resume_path: settings.resume_path }).eq('id', 1); setNotice(error ? error.message : 'Site details saved.'); setBusy(false); router.options.context.queryClient.invalidateQueries(); }
  async function upload(file: File, onPath: (path: string) => void, caseId?: string) {
    const isPdf = file.type === 'application/pdf';
    if (!((isPdf && !caseId) || (file.type.startsWith('image/') && !!caseId))) { setNotice('Choose an image for a case or a PDF for the CV.'); return; }
    if (file.size > 20 * 1024 * 1024) { setNotice('Files must be smaller than 20 MB.'); return; }
    const { data: { user } } = await supabase.auth.getUser(); if (!user) return;
    setBusy(true); setNotice('Uploading…');
    const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || (isPdf ? 'pdf' : 'png');
    const path = `${user.id}/${caseId || 'resume'}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from('portfolio-media').upload(path, file, { contentType: file.type });
    if (error) { setNotice(error.message); setBusy(false); return; }
    if (caseId) {
      const { error: recordError } = await supabase.from('portfolio_media').insert({ case_id: caseId, path });
      if (recordError) { await supabase.storage.from('portfolio-media').remove([path]); setNotice(recordError.message); setBusy(false); return; }
    }
    const { data: url } = await supabase.storage.from('portfolio-media').createSignedUrl(path, 3600);
    if (url?.signedUrl) setMediaUrls(previous => ({ ...previous, [path]: url.signedUrl }));
    onPath(path); setNotice('File uploaded. Save to keep this change.'); setBusy(false);
  }
  function update(key: keyof CaseRow, value: CaseRow[keyof CaseRow]) { setSelected(previous => previous ? { ...previous, [key]: value } : null); }
  function updateSection(index: number, change: Partial<Section>) { if (!selected) return; const next = sectionsOf(selected.sections).map((section, i) => i === index ? { ...section, ...change } : section); update('sections', next); }
  function reorderSection(index: number, direction: -1 | 1) { if (!selected) return; const next = sectionsOf(selected.sections); const target = index + direction; const currentSection = next[index]; const targetSection = next[target]; if (!currentSection || !targetSection) return; next[index] = targetSection; next[target] = currentSection; update('sections', next); }
  async function duplicate(row: CaseRow) { const copy = { ...row, id: crypto.randomUUID(), slug: `${row.slug}-copy-${Date.now().toString().slice(-5)}`, title: `${row.title} (copy)`, published: false, featured: false, sort_order: cases.length + 1, created_at: '', updated_at: '' }; const { data, error } = await supabase.from('portfolio_cases').insert({ slug: copy.slug, title: copy.title, summary: copy.summary, contribution: copy.contribution, outcome: copy.outcome, role: copy.role, period: copy.period, stage: copy.stage, cover_path: copy.cover_path, sections: copy.sections, links: copy.links, nda: copy.nda, published: false, featured: false, sort_order: copy.sort_order }).select().single(); if (error) setNotice(error.message); else { const paths = [row.cover_path, ...sectionsOf(row.sections).map(section => section.imagePath)].filter((path): path is string => !!path); await Promise.all([...new Set(paths)].map(path => supabase.from('portfolio_media').insert({ case_id: data.id, path }))); setCases(previous => [...previous, data]); setSelected(data); setNotice('Draft copy created.'); } }
  async function showPreview() { if (!selected) return; const paths = [selected.cover_path, ...sectionsOf(selected.sections).map(section => section.imagePath)].filter((path): path is string => !!path); const results = await Promise.all(paths.map(path => supabase.storage.from('portfolio-media').createSignedUrl(path, 3600))); const urls = Object.fromEntries(paths.map((path, index) => [path, results[index]?.data?.signedUrl || ''])); setMediaUrls(previous => ({ ...previous, ...urls })); setPreview(true); }

  if (auth === 'loading') return <div className="site-container py-24">Loading editor…</div>;
  if (auth !== 'owner') return <><SiteHeader /><main id="main-content" tabIndex={-1} className="site-container admin-auth"><p className="eyebrow">Private editor</p><h1>Portfolio access</h1>{auth === 'denied' ? <><p className="mt-5 text-muted-foreground">This account does not have permission to manage the portfolio.</p><Button className="mt-6" variant="outline" onClick={signOut}>Sign out</Button></> : <><p className="mt-4 text-muted-foreground">Sign in with the confirmed owner account to manage the portfolio.</p><form onSubmit={handleAuth} className="mt-8 grid gap-5"><div><Label htmlFor="auth-email">Email</Label><Input id="auth-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2" /></div>{mode !== 'forgot' && <div><Label htmlFor="auth-password">Password</Label><Input id="auth-password" type="password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} className="mt-2" /></div>}<Button disabled={busy} type="submit">{mode === 'forgot' ? 'Send reset link' : mode === 'signup' ? 'Create account' : 'Sign in'}</Button></form>{mode === 'signin' && <Button variant="outline" className="mt-3 w-full" onClick={googleSignIn}>Continue with Google</Button>}<div className="mt-5 flex flex-wrap gap-4 text-sm"><Button variant="link" className="h-auto p-0" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>{mode === 'signup' ? 'Sign in instead' : 'Create owner account'}</Button><Button variant="link" className="h-auto p-0" onClick={() => setMode(mode === 'forgot' ? 'signin' : 'forgot')}>{mode === 'forgot' ? 'Back to sign in' : 'Forgot password?'}</Button></div></>}{notice && <p role="status" className="mt-5 text-sm text-primary">{notice}</p>}</main></>;
  if (preview && selected) return <div><div className="admin-preview-toolbar"><Button variant="outline" size="sm" onClick={() => setPreview(false)}><ArrowLeft /> Back to editor</Button></div><CaseDetail preview item={{ ...selected, mediaUrls }} /></div>;
  return <><SiteHeader /><main id="main-content" tabIndex={-1} className="site-container admin-shell"><div className="admin-heading"><div><p className="eyebrow">Private editor</p><h1>Portfolio content</h1></div><Button variant="outline" onClick={signOut}><LogOut /> Sign out</Button></div><div className="admin-tabs"><Button variant={panel === 'cases' ? 'default' : 'ghost'} onClick={() => { setPanel('cases'); setSelected(null); }}>Cases</Button><Button variant={panel === 'settings' ? 'default' : 'ghost'} onClick={() => { setPanel('settings'); setSelected(null); }}>About & contact</Button><Button asChild variant="ghost"><Link to="/">View site <Eye /></Link></Button></div>{notice && <div role="status" className="admin-notice">{notice}</div>}
    {panel === 'settings' ? <div className="admin-form"><h2>Site details</h2><Field label="About" id="about"><Textarea id="about" rows={8} value={settings.about} onChange={e => setSettings(previous => ({ ...previous, about: e.target.value }))} /></Field><Field label="Email" id="contact-email"><Input id="contact-email" type="email" value={settings.email} onChange={e => setSettings(previous => ({ ...previous, email: e.target.value }))} /></Field><Field label="Telegram URL" id="telegram"><Input id="telegram" type="url" value={settings.telegram} onChange={e => setSettings(previous => ({ ...previous, telegram: e.target.value }))} /></Field><Field label="CV (PDF)" id="cv"><Input id="cv" type="file" accept="application/pdf" onChange={e => { const file = e.target.files?.[0]; if (file) void upload(file, path => setSettings(previous => ({ ...previous, resume_path: path }))); }} />{settings.resume_path && <small>Uploaded PDF selected. Save to publish it.</small>}</Field><Button disabled={busy} onClick={saveSettings}><Save /> Save site details</Button></div> : selected ? <div className="admin-form"><div className="admin-form-heading"><Button variant="ghost" onClick={() => setSelected(null)}><ArrowLeft /> All cases</Button><span className="eyebrow">{selected.published ? 'Published' : 'Draft'}</span></div><h2>{selected.title}</h2><div className="admin-grid-two"><Field label="Title" id="case-title"><Input id="case-title" value={selected.title} onChange={e => update('title', e.target.value)} /></Field><Field label="URL slug" id="case-slug"><Input id="case-slug" value={selected.slug} onChange={e => update('slug', e.target.value)} /></Field></div><Field label="Short description" id="case-summary"><Textarea id="case-summary" rows={3} value={selected.summary} onChange={e => update('summary', e.target.value)} /></Field><Field label="My contribution" id="case-contribution"><Textarea id="case-contribution" rows={3} value={selected.contribution} onChange={e => update('contribution', e.target.value)} /></Field><Field label="Outcome / value" id="case-outcome"><Textarea id="case-outcome" rows={3} value={selected.outcome} onChange={e => update('outcome', e.target.value)} /></Field><div className="admin-grid-two"><Field label="Role" id="case-role"><Input id="case-role" value={selected.role} onChange={e => update('role', e.target.value)} /></Field><Field label="Period" id="case-period"><Input id="case-period" value={selected.period} onChange={e => update('period', e.target.value)} /></Field></div><Field label="Project stage" id="case-stage"><Input id="case-stage" value={selected.stage} onChange={e => update('stage', e.target.value)} /></Field><Field label="Cover image" id="case-cover"><Input id="case-cover" type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (file) void upload(file, path => update('cover_path', path), selected.id); }} />{selected.cover_path && <div className="mt-3 flex items-center gap-3"><span className="text-sm">Cover selected</span><Button size="sm" variant="ghost" onClick={() => update('cover_path', null)}><Trash2 /> Remove</Button></div>}</Field><div className="admin-checkboxes"><label><input type="checkbox" checked={selected.featured} onChange={e => update('featured', e.target.checked)} /> Featured on homepage</label><label><input type="checkbox" checked={selected.nda} onChange={e => update('nda', e.target.checked)} /> Detailed walkthrough on request</label></div><div className="admin-section-heading"><div><h3>Case sections</h3><p>Empty sections stay hidden on the public page.</p></div><Button variant="outline" onClick={() => update('sections', [...sectionsOf(selected.sections), { id: crypto.randomUUID(), title: 'New section', text: '' }])}><Plus /> Add section</Button></div>{sectionsOf(selected.sections).map((section, index) => <div className="admin-section" key={section.id || index}><div className="admin-section-toolbar"><span>Section {index + 1}</span><div><Button variant="ghost" size="icon" title="Move up" aria-label="Move section up" disabled={index === 0} onClick={() => reorderSection(index, -1)}><ArrowUp /></Button><Button variant="ghost" size="icon" title="Move down" aria-label="Move section down" disabled={index === sectionsOf(selected.sections).length - 1} onClick={() => reorderSection(index, 1)}><ArrowDown /></Button><Button variant="ghost" size="icon" title="Remove section" aria-label="Remove section" onClick={() => update('sections', sectionsOf(selected.sections).filter((_, i) => i !== index))}><Trash2 /></Button></div></div><Field label="Heading" id={`heading-${index}`}><Input id={`heading-${index}`} value={section.title} onChange={e => updateSection(index, { title: e.target.value })} /></Field><Field label="Text" id={`text-${index}`}><Textarea id={`text-${index}`} rows={6} value={section.text || ''} onChange={e => updateSection(index, { text: e.target.value })} /></Field><Field label="Image or diagram" id={`image-${index}`}><Input id={`image-${index}`} type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (file) void upload(file, path => updateSection(index, { imagePath: path }), selected.id); }} />{section.imagePath && <Button variant="ghost" size="sm" onClick={() => updateSection(index, { imagePath: '' })}><Trash2 /> Remove image</Button>}</Field><Field label="Image caption" id={`caption-${index}`}><Input id={`caption-${index}`} value={section.caption || ''} onChange={e => updateSection(index, { caption: e.target.value })} /></Field><div className="admin-grid-two"><Field label="Prototype link label" id={`link-label-${index}`}><Input id={`link-label-${index}`} value={section.linkLabel || ''} onChange={e => updateSection(index, { linkLabel: e.target.value })} /></Field><Field label="Figma / prototype URL" id={`link-url-${index}`}><Input id={`link-url-${index}`} type="url" value={section.linkUrl || ''} onChange={e => updateSection(index, { linkUrl: e.target.value })} /></Field></div></div>)}<div className="admin-actions"><Button disabled={busy} onClick={() => saveCase(selected, selected.published)}><Save /> Save {selected.published ? 'changes' : 'draft'}</Button><Button disabled={busy} variant="outline" onClick={showPreview}><Eye /> Preview</Button><Button disabled={busy} variant="outline" onClick={() => saveCase(selected, !selected.published)}>{selected.published ? 'Unpublish' : 'Publish'}</Button><Button variant="ghost" onClick={() => duplicate(selected)}><Copy /> Duplicate</Button><Button variant="ghost" onClick={() => deleteCase(selected)}><Trash2 /> Delete</Button></div></div> : <div className="admin-list"><div className="admin-list-heading"><div><h2>Cases</h2><p>Drag-free ordering: use the arrows to change the sequence.</p></div><Button onClick={() => { const draft = newCase(cases.length + 1); setCases(previous => [...previous, draft]); setSelected(draft); }}><Plus /> New case</Button></div>{cases.map(row => <div className="admin-list-row" key={row.id}><div><span className="eyebrow">{row.published ? 'Published' : 'Draft'} {row.featured ? '· Featured' : ''}</span><h3>{row.title}</h3><small>/{row.slug}</small></div><div className="admin-row-actions"><Button variant="ghost" size="icon" title="Move up" aria-label={`Move ${row.title} up`} disabled={cases.indexOf(row) === 0} onClick={() => move(row, -1)}><ArrowUp /></Button><Button variant="ghost" size="icon" title="Move down" aria-label={`Move ${row.title} down`} disabled={cases.indexOf(row) === cases.length - 1} onClick={() => move(row, 1)}><ArrowDown /></Button><Button variant="outline" size="sm" onClick={() => { setSelected(row); setNotice(''); }}>Edit</Button></div></div>)}</div>}
  </main></>;
}
function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) { return <div className="admin-field"><Label htmlFor={id}>{label}</Label><div className="mt-2">{children}</div></div>; }
