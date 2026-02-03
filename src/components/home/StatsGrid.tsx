import { BookOpen, Users, Video, Library, FileText, GraduationCap } from 'lucide-react';
import libraryImg from '@/assets/library.jpg';
import alumniImg from '@/assets/alumni.jpg';
import heroStudentsImg from '@/assets/hero-students.jpg';
const stats = [{
  icon: BookOpen,
  value: '5+',
  label: 'Courses',
  image: libraryImg
}, {
  icon: Users,
  value: null,
  label: 'Faculties',
  image: libraryImg
}, {
  icon: Video,
  value: null,
  label: 'e-Lectures',
  image: heroStudentsImg
}, {
  icon: Library,
  value: '4,500+',
  label: 'Books',
  image: libraryImg
}, {
  icon: FileText,
  value: null,
  label: 'Research Publications',
  image: heroStudentsImg
}, {
  icon: GraduationCap,
  value: null,
  label: 'Alumni Network',
  image: alumniImg
}];
export function StatsGrid() {
  return <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => <div key={index} className="relative rounded-2xl overflow-hidden h-48 md:h-56 group cursor-pointer animate-fade-in" style={{
          animationDelay: `${index * 100}ms`
        }}>
              {/* Background Image */}
              <img src={stat.image} alt={stat.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-primary/70 group-hover:bg-primary/60 transition-colors duration-300" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
                <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-accent mb-3 stroke-[1.5]" />
                {stat.value && <span className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</span>}
                <span className="text-base md:text-lg font-medium text-center">{stat.label}</span>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}