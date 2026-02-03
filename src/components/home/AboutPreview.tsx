import heroCampus from '@/assets/hero-campus.jpg';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AboutPreview() {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-2 block">About Us</span>
            <h2 className="section-title mb-6">Janapriya Group of Institutions</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Janapriya Group of Institutions stands as a beacon of excellence in health sciences 
              education in Karnataka. Established with a commitment to provide world-class 
              healthcare education, we have grown to become one of the most trusted names in 
              medical and allied health sciences training.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our institution is affiliated to the prestigious Rajiv Gandhi University of Health 
              Sciences (RGUHS) and recognized by the Government of Karnataka. We are also 
              approved by the Indian Nursing Council (INC) and Karnataka Nursing Council (KNC), 
              ensuring that our programs meet the highest standards of quality and relevance.
            </p>
            <Link to="/about">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                Learn More About Us
              </Button>
            </Link>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="rounded-2xl overflow-hidden shadow-premium-lg group">
              <img
                src={heroCampus}
                alt="Janapriya Campus"
                className="w-full h-[350px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Floating badge - teal style */}
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground rounded-xl shadow-xl p-4 max-w-[180px] animate-float">
              <div className="text-center">
                <span className="text-3xl font-bold block">20+</span>
                <span className="text-sm opacity-90">Years of Excellence</span>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}