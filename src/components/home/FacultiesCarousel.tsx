import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import facultyNursing from '@/assets/faculty-nursing.jpg';
import facultyParamedical from '@/assets/faculty-paramedical.jpg';
import facultyAllied from '@/assets/faculty-allied.jpg';
import facultyPhysio from '@/assets/faculty-physio.jpg';

const faculties = [
  {
    id: 'nursing',
    name: 'Janapriya Nursing College, Hassan',
    description: 'Comprehensive nursing education with clinical training in partner hospitals. Offering B.Sc Nursing program with 4 years + 6 months internship.',
    image: facultyNursing,
    programs: ['B.Sc Nursing'],
  },
  {
    id: 'paramedical',
    name: 'Janapriya Institute of Paramedical Sciences, Hassan',
    description: 'Diploma programs in medical laboratory technology, imaging, dialysis, and operation theatre technology. Affiliated to Karnataka Paramedical Board.',
    image: facultyParamedical,
    programs: ['DMLT', 'DMIT', 'DDT', 'DOT & AT'],
  },
  {
    id: 'allied-hassan',
    name: 'Janapriya Institute of Allied Health Sciences, Hassan',
    description: 'B.Sc programs in MLT, Imaging Technology, AT & OT, and Emergency & Trauma Care. Affiliated to RGUHS.',
    image: facultyAllied,
    programs: ['B.Sc MLT', 'B.Sc MIT', 'B.Sc AT & OT', 'B.Sc EMT'],
  },
  {
    id: 'allied-mangalore',
    name: 'Janapriya Institute of Allied Health Sciences, Mangalore',
    description: 'Comprehensive allied health programs including BOT, MLT, MIT, AT & OT, EMT, and Renal Dialysis Technology.',
    image: facultyAllied,
    programs: ['BOT', 'B.Sc MLT', 'B.Sc MIT', 'B.Sc EMT', 'B.Sc RDT' , 'At & T'],
  },
  {
    id: 'physiotherapy',
    name: 'Janapriya College of Physiotherapy, Mangalore',
    description: 'Expert training in physical rehabilitation and therapy with state-of-the-art equipment and clinical exposure.',
    image: facultyPhysio,
    programs: ['BPT'],
  },
];

export function FacultiesCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % faculties.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((current - 1 + faculties.length) % faculties.length);
  const next = () => setCurrent((current + 1) % faculties.length);

  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Our Institutes</h2>
          <p className="section-subtitle">
            Specialized institutes dedicated to healthcare excellence in Hassan & Mangalore
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-premium-lg h-[400px] md:h-[450px]">
            {faculties.map((faculty, index) => (
              <div
                key={faculty.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                    {faculty.name}
                  </h3>
                  <p className="text-primary-foreground/80 mb-4 max-w-2xl text-sm md:text-base">
                    {faculty.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {faculty.programs.map((program) => (
                      <span 
                        key={program}
                        className="px-3 py-1 text-xs bg-accent/90 text-accent-foreground rounded-full font-medium"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                  <Link to={`/academics?tab=faculties#${faculty.id}`}>
                    <Button variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background shadow-premium text-foreground hover:bg-muted transition-colors"
            aria-label="Previous faculty"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background shadow-premium text-foreground hover:bg-muted transition-colors"
            aria-label="Next faculty"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {faculties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current 
                    ? 'bg-primary w-6' 
                    : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to institute ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
