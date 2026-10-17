import { useEffect, useState } from 'react';
import { API, fileUrl } from '@/lib/cms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQueryClient } from '@tanstack/react-query';

type Kind = 'text' | 'textarea' | 'date' | 'number' | 'bool' | 'image' | 'file' | 'album';
type Field = { key: string; label: string; kind: Kind; help?: string };
type Section = { id: string; label: string; fields: Field[]; summary: (r: Row) => string; defaults?: Row };
type Row = Record<string, any>;

const SECTIONS: Section[] = [
  { id: 'announcements', label: 'Announcements', summary: (r) => `${r.date} — ${r.title}`, defaults: { is_published: 1, date: new Date().toISOString().slice(0, 10) }, fields: [
    { key: 'title', label: 'Title', kind: 'text' }, { key: 'date', label: 'Date', kind: 'date' },
    { key: 'category', label: 'Category', kind: 'text', help: 'e.g. Admissions, Events, Exams' },
    { key: 'excerpt', label: 'Short summary (shown on home page)', kind: 'textarea' },
    { key: 'body', label: 'Full details (optional — creates a detail page)', kind: 'textarea' },
    { key: 'link', label: 'External link (optional)', kind: 'text', help: 'Starts with https:// or /' },
    { key: 'is_published', label: 'Published', kind: 'bool' } ] },
  { id: 'gallery_images', label: 'Gallery Photos', summary: (r) => r.title || r.image, fields: [
    { key: 'album_id', label: 'Album', kind: 'album' }, { key: 'image', label: 'Photo', kind: 'image' },
    { key: 'title', label: 'Title', kind: 'text' }, { key: 'description', label: 'Description', kind: 'text' },
    { key: 'sort_order', label: 'Order (smaller first)', kind: 'number' } ] },
  { id: 'gallery_albums', label: 'Gallery Albums', summary: (r) => r.name, fields: [
    { key: 'name', label: 'Album name', kind: 'text' }, { key: 'sort_order', label: 'Order', kind: 'number' } ] },
  { id: 'hero_slides', label: 'Home Banners', summary: (r) => r.title, defaults: { is_published: 1 }, fields: [
    { key: 'image', label: 'Banner image (wide, 1920px)', kind: 'image' }, { key: 'title', label: 'Title', kind: 'text' },
    { key: 'subtitle', label: 'Subtitle', kind: 'text' }, { key: 'cta', label: 'Button text', kind: 'text' },
    { key: 'cta_link', label: 'Button link', kind: 'text', help: 'e.g. /apply' },
    { key: 'sort_order', label: 'Order', kind: 'number' }, { key: 'is_published', label: 'Published', kind: 'bool' } ] },
  { id: 'exam_schedules', label: 'Exam Schedules', summary: (r) => `${r.program} — ${r.date_text}`, defaults: { status: 'Upcoming' }, fields: [
    { key: 'program', label: 'Program', kind: 'text' }, { key: 'date_text', label: 'Dates', kind: 'text', help: 'e.g. April 1-15, 2026' },
    { key: 'status', label: 'Status', kind: 'text', help: 'e.g. Upcoming, Ongoing, Completed' }, { key: 'sort_order', label: 'Order', kind: 'number' } ] },
  { id: 'exam_downloads', label: 'Exam Downloads', summary: (r) => r.name, fields: [
    { key: 'name', label: 'Name', kind: 'text' }, { key: 'file', label: 'File (PDF, ZIP, Word, Excel)', kind: 'file' },
    { key: 'url', label: 'Or external link', kind: 'text' }, { key: 'type', label: 'Type label', kind: 'text', help: 'Filled automatically on upload' },
    { key: 'size_text', label: 'Size label', kind: 'text' }, { key: 'sort_order', label: 'Order', kind: 'number' } ] },
  { id: 'calendar_events', label: 'Academic Calendar', summary: (r) => `${r.event} — ${r.date_text}`, fields: [
    { key: 'event', label: 'Event', kind: 'text' }, { key: 'date_text', label: 'Date', kind: 'text' }, { key: 'sort_order', label: 'Order', kind: 'number' } ] },
];

async function api(action: string, body?: unknown, query = ''): Promise<any> {
  const init: RequestInit = { credentials: 'same-origin', headers: { 'X-JPGI': '1' } };
  if (body instanceof FormData) Object.assign(init, { method: 'POST', body });
  else if (body !== undefined) Object.assign(init, { method: 'POST', body: JSON.stringify(body), headers: { 'X-JPGI': '1', 'Content-Type': 'application/json' } });
  const r = await fetch(`${API}/admin.php?action=${action}${query}`, init);
  const j = await r.json().catch(() => ({ error: 'Server error' }));
  if (!r.ok) throw new Error(j.error || 'Request failed');
  return j;
}

export default function Admin() {
  const [user, setUser] = useState<{ email: string; name?: string; role?: string } | null | undefined>(undefined);
  useEffect(() => { document.title = 'Admin — Janapriya'; api('me').then((j) => setUser(j.user)).catch(() => setUser(null)); }, []);
  if (user === undefined) return <p className="p-8">Loading…</p>;
  if (!user) return <Login onDone={setUser} />;
  return <Panel email={user.name || user.email} isAdmin={user.role === 'admin'} onLogout={() => api('logout', {}).finally(() => setUser(null))} />;
}

function Login({ onDone }: { onDone: (u: any) => void }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [err, setErr] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <form className="bg-background rounded-xl shadow p-8 w-full max-w-sm space-y-4" onSubmit={(e) => { e.preventDefault(); setErr(''); api('login', { email, password }).then((j) => onDone(j.user)).catch((x) => setErr(x.message)); }}>
        <img src="/logo.png" alt="" className="h-14 mx-auto" />
        <h1 className="text-xl font-bold text-center">Website Admin</h1>
        <div><Label>Email</Label><Input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><Label>Password</Label><Input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Button className="w-full" type="submit">Log in</Button>
      </form>
    </div>
  );
}

function Panel({ email, isAdmin, onLogout }: { email: string; isAdmin: boolean; onLogout: () => void }) {
  const [sec, setSec] = useState<Section | 'password' | 'leads' | 'staff' | 'activity'>('leads');
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between">
        <span className="font-semibold">Janapriya Website Admin</span>
        <span className="text-sm flex items-center gap-4"><a href="/" target="_blank" className="underline">View site</a>{email}<button onClick={onLogout} className="underline">Log out</button></span>
      </header>
      <div className="flex flex-col md:flex-row">
        <nav className="md:w-56 p-4 flex md:flex-col gap-1 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setSec(s)} className={`text-left px-3 py-2 rounded whitespace-nowrap ${sec === s ? 'bg-primary text-primary-foreground' : 'hover:bg-background'}`}>{s.label}</button>
          ))}
          <button onClick={() => setSec('leads')} className={`text-left px-3 py-2 rounded whitespace-nowrap ${sec === 'leads' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'}`}>Enquiries</button>
          {isAdmin && <button onClick={() => setSec('staff')} className={`text-left px-3 py-2 rounded whitespace-nowrap ${sec === 'staff' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'}`}>Staff logins</button>}
          {isAdmin && <button onClick={() => setSec('activity')} className={`text-left px-3 py-2 rounded whitespace-nowrap ${sec === 'activity' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'}`}>Activity log</button>}
          <button onClick={() => setSec('password')} className={`text-left px-3 py-2 rounded whitespace-nowrap ${sec === 'password' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'}`}>Change password</button>
        </nav>
        <main className="flex-1 p-4 md:p-6">{sec === 'password' ? <Password /> : sec === 'staff' ? <Staff /> : sec === 'activity' ? <Activity /> : sec === 'leads' ? <Leads /> : <Editor key={sec.id} sec={sec} />}</main>
      </div>
    </div>
  );
}

function Password() {
  const [f, setF] = useState({ current: '', new: '' }); const [msg, setMsg] = useState('');
  return (
    <form className="bg-background rounded-xl p-6 max-w-md space-y-4" onSubmit={(e) => { e.preventDefault(); api('password', f).then(() => { setMsg('Password changed.'); setF({ current: '', new: '' }); }).catch((x) => setMsg(x.message)); }}>
      <div><Label>Current password</Label><Input type="password" value={f.current} onChange={(e) => setF({ ...f, current: e.target.value })} /></div>
      <div><Label>New password (min 10 characters)</Label><Input type="password" autoComplete="new-password" value={f.new} onChange={(e) => setF({ ...f, new: e.target.value })} /></div>
      {msg && <p className="text-sm">{msg}</p>}<Button type="submit">Change password</Button>
    </form>
  );
}

function Editor({ sec }: { sec: Section }) {
  const qc = useQueryClient();
  const [rows, setRows] = useState<Row[]>([]); const [albums, setAlbums] = useState<Row[]>([]);
  const [edit, setEdit] = useState<Row | null>(null); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('');
  const load = () => api('list', undefined, `&r=${sec.id}`).then((j) => setRows(j.rows)).catch((x) => setErr(x.message));
  useEffect(() => { load(); if (sec.fields.some((f) => f.kind === 'album')) api('list', undefined, '&r=gallery_albums').then((j) => setAlbums(j.rows)); }, []);
  const done = () => { setEdit(null); load(); qc.invalidateQueries({ queryKey: ['cms-content'] }); };

  const save = async () => {
    setBusy(true); setErr('');
    try { const { id, ...rest } = edit!; const data = Object.fromEntries(sec.fields.map((f) => [f.key, rest[f.key] ?? (f.kind === 'number' || f.kind === 'bool' || f.kind === 'album' ? 0 : '')])); await api('save', { resource: sec.id, id: id ?? 0, data }); done(); }
    catch (x: any) { setErr(x.message); } finally { setBusy(false); }
  };
  const remove = async (r: Row) => {
    if (!confirm(`Delete "${sec.summary(r)}"? This cannot be undone.`)) return;
    try { await api('delete', { resource: sec.id, id: r.id }); done(); } catch (x: any) { alert(x.message); }
  };
  const upload = async (key: string, kind: 'image' | 'file', file: File) => {
    setBusy(true); setErr('');
    const fd = new FormData(); fd.append('file', file); fd.append('kind', kind === 'image' ? 'image' : 'doc');
    try { const j = await api('upload', fd); setEdit((e) => ({ ...e, [key]: j.file, ...(kind === 'file' ? { type: j.type, size_text: j.size_text } : {}) })); }
    catch (x: any) { setErr(x.message); } finally { setBusy(false); }
  };
  // Bulk photo upload: one gallery row per file into the chosen album.
  const bulk = async (files: FileList, album: number) => {
    setBusy(true); setErr('');
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData(); fd.append('file', file); fd.append('kind', 'image');
        const j = await api('upload', fd);
        await api('save', { resource: sec.id, id: 0, data: { album_id: album, image: j.file, title: file.name.replace(/\.[^.]+$/, ''), description: '', sort_order: 0 } });
      }
      done();
    } catch (x: any) { setErr(x.message); load(); } finally { setBusy(false); }
  };

  const shown = filter ? rows.filter((r) => String(r.album_id) === filter) : rows;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold mr-auto">{sec.label}</h2>
        {sec.id === 'gallery_images' && (
          <>
            <select className="border rounded px-2 py-2 bg-background" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="">All albums</option>{albums.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <label className={`px-4 py-2 rounded bg-accent text-accent-foreground cursor-pointer ${!filter || busy ? 'opacity-50 pointer-events-none' : ''}`} title="Pick an album first">
              Upload many photos<input type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && bulk(e.target.files, Number(filter))} />
            </label>
          </>
        )}
        <Button onClick={() => { setErr(''); setEdit({ ...(sec.defaults ?? {}), ...(filter ? { album_id: Number(filter) } : {}) }); }}>+ Add new</Button>
      </div>
      {err && !edit && <p className="text-red-600">{err}</p>}
      {busy && !edit && <p>Uploading… please wait.</p>}
      <div className={sec.id === 'gallery_images' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3' : 'bg-background rounded-xl divide-y'}>
        {!shown.length && <p className="p-4 text-muted-foreground">Nothing here yet.</p>}
        {shown.map((r) => sec.id === 'gallery_images' ? (
          <div key={r.id} className="bg-background rounded-lg overflow-hidden">
            <img src={fileUrl(r.image, true)} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <div className="p-2 text-xs flex justify-between gap-2"><span className="truncate">{r.title}</span>
              <span className="shrink-0"><button className="text-primary mr-2" onClick={() => setEdit(r)}>Edit</button><button className="text-red-600" onClick={() => remove(r)}>Delete</button></span></div>
          </div>
        ) : (
          <div key={r.id} className="p-4 flex items-center gap-4">
            <span className="flex-1">{sec.summary(r)}{'is_published' in r && !Number(r.is_published) && <em className="text-muted-foreground"> (hidden)</em>}</span>
            <Button size="sm" variant="outline" onClick={() => setEdit(r)}>Edit</Button>
            <Button size="sm" variant="outline" className="text-red-600" onClick={() => remove(r)}>Delete</Button>
          </div>
        ))}
      </div>

      {edit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-auto p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-xl space-y-4 my-8">
            <h3 className="text-lg font-bold">{edit.id ? 'Edit' : 'Add'} — {sec.label}</h3>
            {sec.fields.map((f) => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                {f.kind === 'textarea' ? <Textarea rows={4} value={edit[f.key] ?? ''} onChange={(e) => setEdit({ ...edit, [f.key]: e.target.value })} />
                : f.kind === 'bool' ? <div><input type="checkbox" checked={!!Number(edit[f.key])} onChange={(e) => setEdit({ ...edit, [f.key]: e.target.checked ? 1 : 0 })} /></div>
                : f.kind === 'album' ? (
                  <select className="w-full border rounded px-2 py-2 bg-background" value={edit[f.key] ?? ''} onChange={(e) => setEdit({ ...edit, [f.key]: Number(e.target.value) })}>
                    <option value="">— choose album —</option>{albums.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>)
                : f.kind === 'image' || f.kind === 'file' ? (
                  <div className="space-y-2">
                    {edit[f.key] && (f.kind === 'image' ? <img src={fileUrl(edit[f.key], true)} alt="" className="h-32 rounded" /> : <a className="text-primary underline text-sm" href={fileUrl(edit[f.key])} target="_blank">Current file</a>)}
                    <Input type="file" accept={f.kind === 'image' ? 'image/*' : '.pdf,.zip,.doc,.docx,.xls,.xlsx'} onChange={(e) => e.target.files?.[0] && upload(f.key, f.kind as 'image' | 'file', e.target.files[0])} />
                  </div>)
                : <Input type={f.kind} value={edit[f.key] ?? ''} onChange={(e) => setEdit({ ...edit, [f.key]: f.kind === 'number' ? Number(e.target.value) : e.target.value })} />}
                {f.help && <p className="text-xs text-muted-foreground mt-1">{f.help}</p>}
              </div>
            ))}
            {err && <p className="text-red-600 text-sm">{err}</p>}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button>
              <Button disabled={busy} onClick={save}>{busy ? 'Please wait…' : 'Save'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const LABELS: Record<string, string> = { formType: 'Form', firstName: 'First name', lastName: 'Last name', dateOfBirth: 'Date of birth', programType: 'Program type', previousInstitution: 'Previous institution' };

function Leads() {
  const [rows, setRows] = useState<Row[]>([]); const [open, setOpen] = useState<Row | null>(null); const [type, setType] = useState('');
  const load = () => api('list', undefined, '&r=leads').then((j) => setRows(j.rows)).catch((x) => alert(x.message));
  useEffect(() => { load(); }, []);
  const view = (r: Row) => { setOpen(r); if (!Number(r.is_read)) api('save', { resource: 'leads', id: r.id, data: { is_read: 1 } }).then(load); };
  const remove = (r: Row) => confirm(`Delete enquiry from ${r.name}?`) && api('delete', { resource: 'leads', id: r.id }).then(() => { setOpen(null); load(); });
  const shown = type ? rows.filter((r) => r.form_type === type) : rows;
  const exportCsv = () => {
    const parsed = shown.map((r) => ({ received: r.created_at, ...JSON.parse(r.data) }));
    const cols = Array.from(new Set(parsed.flatMap((p) => Object.keys(p))));
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.map(esc).join(','), ...parsed.map((p) => cols.map((c) => esc((p as Row)[c])).join(','))].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'enquiries.csv'; a.click();
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold mr-auto">Enquiries ({rows.filter((r) => !Number(r.is_read)).length} new)</h2>
        <select className="border rounded px-2 py-2 bg-background" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All forms</option><option value="contact">Contact</option><option value="application">Application</option>
        </select>
        <Button variant="outline" onClick={exportCsv} disabled={!shown.length}>Download Excel (CSV)</Button>
      </div>
      <div className="bg-background rounded-xl divide-y overflow-x-auto">
        {!shown.length && <p className="p-4 text-muted-foreground">No enquiries yet.</p>}
        {shown.map((r) => (
          <button key={r.id} onClick={() => view(r)} className={`w-full text-left p-4 flex flex-wrap gap-x-6 gap-y-1 hover:bg-secondary ${Number(r.is_read) ? '' : 'font-semibold'}`}>
            <span className="w-40 text-sm">{r.created_at}</span>
            <span className="w-24 text-sm capitalize">{r.form_type}</span>
            <span className="flex-1 min-w-[8rem]">{r.name}</span><span className="text-sm">{r.phone}</span><span className="text-sm">{r.email}</span>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-auto p-4" onClick={() => setOpen(null)}>
          <div className="bg-background rounded-xl p-6 w-full max-w-xl my-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Enquiry — {open.created_at}</h3>
            <dl className="grid grid-cols-3 gap-2 text-sm">
              {Object.entries(JSON.parse(open.data)).filter(([k, v]) => v !== '' && k !== 'timestamp').map(([k, v]) => (
                <div key={k} className="contents"><dt className="text-muted-foreground">{LABELS[k] ?? k.charAt(0).toUpperCase() + k.slice(1)}</dt><dd className="col-span-2 whitespace-pre-line break-words">{String(v)}</dd></div>
              ))}
            </dl>
            <div className="flex gap-2 justify-end mt-6">
              <Button variant="outline" className="text-red-600" onClick={() => remove(open)}>Delete</Button>
              <Button onClick={() => setOpen(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Staff() {
  const [rows, setRows] = useState<Row[]>([]); const [edit, setEdit] = useState<Row | null>(null); const [err, setErr] = useState('');
  const load = () => api('users').then((j) => setRows(j.rows)).catch((x) => setErr(x.message));
  useEffect(() => { load(); }, []);
  const save = () => { setErr(''); api('user_save', edit).then(() => { setEdit(null); load(); }).catch((x) => setErr(x.message)); };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold mr-auto">Staff logins</h2>
        <Button onClick={() => { setErr(''); setEdit({ id: 0, name: '', email: '', role: 'editor', is_active: 1, password: '' }); }}>+ Add staff</Button>
      </div>
      <p className="text-sm text-muted-foreground">Admin = can do everything. Editor = can update website content and see enquiries, but cannot manage staff or see the activity log.</p>
      {err && !edit && <p className="text-sm text-red-600">{err}</p>}
      <div className="bg-background rounded-xl divide-y">
        {rows.map((r) => (
          <button key={r.id} onClick={() => { setErr(''); setEdit({ ...r, password: '' }); }} className="w-full text-left p-4 flex flex-wrap gap-x-6 gap-y-1 hover:bg-secondary">
            <span className="flex-1 min-w-[8rem] font-medium">{r.name || '—'}</span><span className="text-sm">{r.email}</span>
            <span className="text-sm capitalize w-16">{r.role}</span>
            <span className={`text-sm w-20 ${Number(r.is_active) ? 'text-green-700' : 'text-red-600'}`}>{Number(r.is_active) ? 'Active' : 'Disabled'}</span>
            <span className="text-sm text-muted-foreground">Last login: {r.last_login_at || 'never'}</span>
          </button>
        ))}
      </div>
      {edit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-auto p-4" onClick={() => setEdit(null)}>
          <form className="bg-background rounded-xl p-6 w-full max-w-md my-8 space-y-4" onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); save(); }}>
            <h3 className="text-lg font-bold">{edit.id ? 'Edit staff' : 'Add staff'}</h3>
            <div><Label>Full name</Label><Input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} required /></div>
            <div><Label>Email (used to log in)</Label><Input type="email" value={edit.email} onChange={(e) => setEdit({ ...edit, email: e.target.value })} required /></div>
            <div><Label>Role</Label>
              <select className="w-full border rounded px-2 py-2 bg-background" value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value })}>
                <option value="editor">Editor — content only</option><option value="admin">Admin — everything</option>
              </select></div>
            <div><Label>{edit.id ? 'New password (leave empty to keep the same)' : 'Password (min 10 characters)'}</Label><Input type="text" autoComplete="new-password" value={edit.password} onChange={(e) => setEdit({ ...edit, password: e.target.value })} /></div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={!!Number(edit.is_active)} onChange={(e) => setEdit({ ...edit, is_active: e.target.checked ? 1 : 0 })} /> Can log in (untick to block this person)</label>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setEdit(null)}>Cancel</Button><Button type="submit">Save</Button></div>
          </form>
        </div>
      )}
    </div>
  );
}

const ACTION_TEXT: Record<string, string> = { create: 'Added', update: 'Edited', delete: 'Deleted', login: 'Logged in', logout: 'Logged out', password: 'Changed own password' };
const RES_TEXT: Record<string, string> = { ...Object.fromEntries(SECTIONS.map((s) => [s.id, s.label])), leads: 'Enquiries', staff: 'Staff logins' };

function Activity() {
  const [rows, setRows] = useState<Row[]>([]); const [users, setUsers] = useState<Row[]>([]); const [who, setWho] = useState('');
  useEffect(() => { api('users').then((j) => setUsers(j.rows)); }, []);
  useEffect(() => { api('activity', undefined, who ? `&user=${who}` : '').then((j) => setRows(j.rows)).catch((x) => alert(x.message)); }, [who]);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold mr-auto">Activity log</h2>
        <select className="border rounded px-2 py-2 bg-background" value={who} onChange={(e) => setWho(e.target.value)}>
          <option value="">Everyone</option>{users.map((u) => <option key={u.id} value={u.id}>{u.name || u.email}</option>)}
        </select>
      </div>
      <p className="text-sm text-muted-foreground">Shows the latest 500 actions — who did what, and when.</p>
      <div className="bg-background rounded-xl divide-y overflow-x-auto">
        {!rows.length && <p className="p-4 text-muted-foreground">Nothing yet.</p>}
        {rows.map((r) => (
          <div key={r.id} className="p-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="w-40">{r.created_at}</span>
            <span className="w-40 font-medium">{r.admin_name || r.admin_email}</span>
            <span className="w-36">{ACTION_TEXT[r.action] ?? r.action}{r.resource ? ` · ${RES_TEXT[r.resource] ?? r.resource}` : ''}</span>
            <span className="flex-1 min-w-[10rem] break-words">{r.summary}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
