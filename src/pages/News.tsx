import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { useContent, formatDate } from '@/lib/cms';

export default function News() {
  const { id } = useParams();
  const { data, isLoading } = useContent();
  const items = data?.announcements ?? [];
  const item = id ? items.find((a) => String(a.id) === id) : undefined;

  return (
    <Layout>
      <PageHero title={item ? item.title : 'News & Announcements'} subtitle={item ? formatDate(item.date) : 'Latest updates from Janapriya'} />
      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          {isLoading && <p className="text-muted-foreground">Loading…</p>}
          {!isLoading && id && !item && <p className="text-muted-foreground">This announcement was not found.</p>}
          {item ? (
            <article>
              <Link to="/news" className="inline-flex items-center gap-1 text-sm text-primary mb-6"><ArrowLeft className="h-4 w-4" /> All news</Link>
              {item.category && <p className="text-sm text-accent-dark mb-4">{item.category}</p>}
              <div className="whitespace-pre-line text-foreground leading-relaxed">{item.body || item.excerpt}</div>
              {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-primary font-medium">More details →</a>}
            </article>
          ) : (
            !id && (
              <div className="space-y-4">
                {!isLoading && !items.length && <p className="text-muted-foreground">No announcements yet.</p>}
                {items.map((a) => (
                  <Link key={a.id} to={a.body ? `/news/${a.id}` : a.link || '#'} className="block bg-secondary rounded-xl p-6 card-hover group">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" /><span>{formatDate(a.date)}</span>
                      {a.category && <><span className="w-1 h-1 rounded-full bg-muted-foreground" /><span className="text-accent-dark">{a.category}</span></>}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary">{a.title}</h3>
                    {a.excerpt && <p className="text-sm text-muted-foreground mt-1">{a.excerpt}</p>}
                  </Link>
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </Layout>
  );
}
