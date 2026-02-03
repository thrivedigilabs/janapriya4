import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const news = [
  {
    id: 1,
    title: 'Admissions Open for Academic Year 2025-26',
    date: 'December 10, 2024',
    category: 'Admissions',
    excerpt: 'Applications are now open for all undergraduate and diploma programs. Early bird scholarships available.',
  },
  {
    id: 2,
    title: 'National Seminar on Healthcare Innovation',
    date: 'December 5, 2024',
    category: 'Events',
    excerpt: 'Join us for a two-day national seminar featuring experts from leading healthcare institutions.',
  },
  {
    id: 3,
    title: 'New Partnership with Apollo Hospitals',
    date: 'November 28, 2024',
    category: 'Partnership',
    excerpt: 'Exciting new clinical training partnership with Apollo Hospitals for enhanced student exposure.',
  },
];

export function NewsEvents() {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">Latest Updates</h2>
            <p className="text-muted-foreground mt-2">News, events, and announcements</p>
          </div>
          <Link to="/contact" className="hidden md:block">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              View All News
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-secondary rounded-xl p-6 card-hover group"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Calendar className="h-3 w-3" />
                <span>{item.date}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-accent-dark">{item.category}</span>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.excerpt}
              </p>

              <Link 
                to="/contact"
                className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all"
              >
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/contact">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              View All News
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
