import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, Users, Award, GraduationCap } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: 'Choose Your Program',
    description: 'Explore our undergraduate and diploma programs to find the one that suits your career goals.',
  },
  {
    step: 2,
    title: 'Check Eligibility',
    description: 'Verify that you meet the minimum eligibility requirements for your chosen program.',
  },
  {
    step: 3,
    title: 'Submit Application',
    description: 'Fill out the online application form with accurate personal and academic details.',
  },
  {
    step: 4,
    title: 'Document Verification',
    description: 'Submit required documents for verification including academic records and ID proof.',
  },
  {
    step: 5,
    title: 'Fee Payment',
    description: 'Complete the fee payment process through our secure payment gateway.',
  },
  {
    step: 6,
    title: 'Confirmation',
    description: 'Receive your admission confirmation and welcome kit with joining details.',
  },
];

const eligibility = [
  {
    program: 'B.Sc Nursing',
    criteria: ['10+2 with Physics, Chemistry, Biology', 'Minimum 45% aggregate (40% for SC/ST)', 'KCET Mandatory', 'Age: 17+ years'],
  },
  {
    program: 'BPT (Physiotherapy)',
    criteria: ['10+2 with Physics, Chemistry, Biology', 'Minimum 50% aggregate', 'Age: 17+ years'],
  },
  {
    program: 'B.Sc Allied Health Sciences (MLT, MIT, AT & OT, EMT, RDT)',
    criteria: ['10+2 with Science stream', 'Minimum 45% aggregate', 'Age: 17+ years'],
  },
  {
    program: 'Bachelor of Occupational Therapy (BOT)',
    criteria: ['10+2 with Science stream', 'Minimum 45% aggregate', 'Age: 17+ years'],
  },
  {
    program: 'Diploma Programs (DMLT, DMIT, DDT, DOT & AT)',
    criteria: ['10+2 with Science stream (PCB)', 'Minimum 40% aggregate', 'Lateral entry to 2nd year available', 'Age: 17+ years'],
  },
];

const scholarships = [
  { icon: Award, title: 'Merit Scholarship', desc: 'Up to 25% fee waiver for students scoring above 90% in qualifying exams.' },
  { icon: Users, title: 'SC/ST Scholarship', desc: 'Government scholarships available for eligible SC/ST students.' },
  { icon: GraduationCap, title: 'Early Bird Discount', desc: '10% discount on first year fees for early applications.' },
  { icon: FileText, title: 'Education Loan', desc: 'Tie-ups with leading banks for hassle-free education loans.' },
];

const Admissions = () => {
  return (
    <Layout>
      <PageHero title="Admissions" subtitle="Your Journey to Healthcare Excellence Starts Here" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          {/* Admission Process */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Admission Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((item) => (
                <div key={item.step} className="bg-secondary rounded-xl p-6 relative">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Eligibility Criteria</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibility.map((item) => (
                <div key={item.program} className="bg-secondary rounded-xl p-6">
                  <h3 className="font-semibold text-primary mb-4">{item.program}</h3>
                  <ul className="space-y-2">
                    {item.criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent-dark mt-0.5 flex-shrink-0" />
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Scholarships & Financial Aid</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scholarships.map((item) => (
                <div key={item.title} className="bg-secondary rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-accent-dark" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/apply">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground px-8">
                Start Your Application
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
