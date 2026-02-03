import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award } from 'lucide-react';

const programCategories = [
  {
    icon: GraduationCap,
    title: 'Undergraduate Programs (B.Sc)',
    programs: [
      'B.Sc Nursing (4 Years + 6 Months Internship)',
      'Bachelor of Physiotherapy (BPT) (4 Years + 6 Months Internship)',
      'B.Sc Medical Laboratory Technology (3 Years + 1 Year Internship)',
      'B.Sc Medical Imaging Technology (3 Years + 1 Year Internship)',
      'B.Sc Anaesthesia & Operation Theatre Technology (3 Years + 1 Year Internship)',
      'B.Sc Emergency & Trauma Care Technology (3 Years + 1 Year Internship)',
      'B.Sc Renal Dialysis Technology (3 Years + 1 Year Internship)',
      'Bachelor of Occupational Therapy (3 Years + 1 Year Internship)',
    ],
    link: '/academics?tab=programs#undergraduate',
  },
  {
    icon: Award,
    title: 'Diploma Programs',
    programs: [
      'DMLT - Diploma in Medical Laboratory Technology (3 Years + 3 Months Internship)',
      'DMIT - Diploma in Medical Imaging Technology (3 Years + 3 Months Internship)',
      'DDT - Diploma in Dialysis Technology (3 Years + 3 Months Internship)',
      'DOT & AT - Diploma in Operation Theater & Anesthesia Technology (3 Years + 3 Months Internship)',
    ],
    link: '/academics?tab=programs#diploma',
  },
];

export function ProgramsPreview() {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Programs Offered</h2>
          <p className="section-subtitle">
            Choose from our range of healthcare education programs at Hassan & Mangalore campuses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {programCategories.map((category) => (
            <div
              key={category.title}
              className="bg-background rounded-xl p-6 shadow-card card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <category.icon className="h-6 w-6 text-accent-dark" />
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-4">{category.title}</h3>
              
              <ul className="space-y-2 mb-6">
                {category.programs.map((program) => (
                  <li key={program} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {program}
                  </li>
                ))}
              </ul>

              <Link to={category.link}>
                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/5">
                  View All Programs
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/admissions">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
              Start Your Application
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
