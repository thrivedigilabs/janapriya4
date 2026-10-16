import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Download, Calendar, FileText } from 'lucide-react';
import { useSection, fileUrl } from '@/lib/cms';

const fallbackSchedules = [
  { program: 'B.Sc Nursing', date: 'April 1-15, 2025', status: 'Upcoming' },
  { program: 'BPT', date: 'April 5-20, 2025', status: 'Upcoming' },
  { program: 'B.Sc MLT / EMT', date: 'April 10-25, 2025', status: 'Upcoming' },
  { program: 'GNM', date: 'March 25 - April 10, 2025', status: 'Upcoming' },
  { program: 'DMLT / D.OTT', date: 'March 20 - April 5, 2025', status: 'Upcoming' },
];

const fallbackDownloads: { name: string; type: string; size: string; href?: string }[] = [
  { name: 'Exam Time Table 2024-25', type: 'PDF', size: '245 KB' },
  { name: 'Previous Year Question Papers', type: 'ZIP', size: '12 MB' },
  { name: 'Exam Guidelines & Instructions', type: 'PDF', size: '180 KB' },
  { name: 'Hall Ticket Download (Portal)', type: 'Link', size: '-' },
];

const Examinations = () => {
  const schedules = useSection('exam_schedules', fallbackSchedules, (e) => ({ program: e.program, date: e.date_text, status: e.status }));
  const downloads = useSection('exam_downloads', fallbackDownloads, (d) => ({
    name: d.name, type: d.type, size: d.size_text || '-', href: d.file ? fileUrl(d.file, false, d.name) : d.url,
  }));
  return (
    <Layout>
      <PageHero title="Examinations" subtitle="Exam Schedules, Results & Resources" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-accent-dark" />
                Upcoming Examinations
              </h2>
              <div className="space-y-4">
                {schedules.map((item) => (
                  <div key={item.program} className="bg-secondary rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.program}</h3>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <span className="px-3 py-1 text-xs bg-accent/20 text-accent-dark rounded-full font-medium">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="h-6 w-6 text-accent-dark" />
                Downloads
              </h2>
              <div className="space-y-4">
                {downloads.map((item) => (
                  <div key={item.name} className="bg-secondary rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.type} • {item.size}</p>
                    </div>
                    {item.href ? (
                      <Button asChild size="sm" variant="outline" className="border-primary text-primary">
                        <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Download ${item.name}`}>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="border-primary text-primary">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Examinations;
