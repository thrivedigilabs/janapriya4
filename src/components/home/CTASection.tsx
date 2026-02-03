import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroStudents from '@/assets/hero-students.jpg';

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <img
        src={heroStudents}
        alt="Students"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-hero" />
      
      <div className="section-container relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join Janapriya Group of Institutions and build a rewarding career in healthcare. 
            Admissions are open for the academic year 2025-26.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/apply">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent-dark font-semibold px-8 w-full sm:w-auto"
              >
                Apply Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
