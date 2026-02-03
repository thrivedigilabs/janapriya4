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
    description: 'Comprehensive nursing education with state-of-the-art simulation labs and clinical partnerships with leading hospitals.',
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
    description: 'B.Sc programs in allied health sciences including MLT, Imaging Technology, Anaesthesia & OT, and Emergency Care.',
    image: facultyAllied,
    programs: ['B.Sc MLT', 'B.Sc MIT', 'B.Sc AT & OT', 'B.Sc EMT'],
  },
  {
    id: 'allied-mangalore',
    name: 'Janapriya Institute of Allied Health Sciences, Mangalore',
    description: 'Comprehensive allied health programs including Occupational Therapy and specialized B.Sc courses.',
    image: facultyAllied,
    programs: ['BOT', 'B.Sc MLT', 'B.Sc MIT', 'B.Sc EMT', 'B.Sc RDT','At & T'],
  },
  {
    id: 'physiotherapy',
    name: 'Janapriya College of Physiotherapy Mangalore',
    description: 'Expert training in physical rehabilitation with modern equipment and extensive clinical exposure.',
    image: facultyPhysio,
    programs: ['BPT'],
  },
];

export function FacultiesGrid() {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Institutes</h2>
          <p className="section-subtitle">
            Specialized institutes dedicated to different aspects of healthcare education
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {faculties.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-background rounded-xl overflow-hidden shadow-card card-hover group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{faculty.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{faculty.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {faculty.programs.map((program) => (
                    <span 
                      key={program}
                      className="px-3 py-1 text-xs bg-accent/10 text-accent-dark rounded-full font-medium"
                    >
                      {program}
                    </span>
                  ))}
                </div>

                <Link to={`/academics?tab=faculties#${faculty.id}`}>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
