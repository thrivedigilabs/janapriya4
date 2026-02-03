import { useState } from 'react';
import { X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { cn } from '@/lib/utils';

import heroCampus from '@/assets/hero-campus.jpg';
import heroInfrastructure from '@/assets/hero-infrastructure.jpg';
import heroStudents from '@/assets/hero-students.jpg';
import library from '@/assets/library.jpg';
import facultyNursing from '@/assets/faculty-nursing.jpg';
import facultyAllied from '@/assets/faculty-allied.jpg';
import facultyParamedical from '@/assets/faculty-paramedical.jpg';
import facultyPhysio from '@/assets/faculty-physio.jpg';
import alumni from '@/assets/alumni.jpg';

type Category = 'all' | 'campus' | 'labs' | 'library' | 'students' | 'infrastructure';

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'campus', label: 'Campus' },
  { id: 'labs', label: 'Labs' },
  { id: 'library', label: 'Library' },
  { id: 'students', label: 'Students' },
  { id: 'infrastructure', label: 'Infrastructure' },
];

const galleryItems = [
  { src: heroCampus, category: 'campus', title: 'Main Campus Building', description: 'The iconic main building of Janapriya Group of Institutions' },
  { src: heroInfrastructure, category: 'infrastructure', title: 'Modern Infrastructure', description: 'State-of-the-art facilities for quality education' },
  { src: heroStudents, category: 'students', title: 'Student Life', description: 'Vibrant campus life with diverse activities' },
  { src: library, category: 'library', title: 'Central Library', description: 'Well-stocked library with extensive medical resources' },
  { src: facultyNursing, category: 'labs', title: 'Nursing Skills Lab', description: 'Advanced nursing simulation and practice facility' },
  { src: facultyAllied, category: 'labs', title: 'Allied Health Sciences Lab', description: 'Modern diagnostic and therapeutic equipment' },
  { src: facultyParamedical, category: 'labs', title: 'Paramedical Lab', description: 'Comprehensive lab for paramedical training' },
  { src: facultyPhysio, category: 'labs', title: 'Physiotherapy Lab', description: 'Equipped with latest rehabilitation equipment' },
  { src: alumni, category: 'students', title: 'Alumni Network', description: 'Our successful alumni making a difference in healthcare' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <PageHero
        title="Campus Gallery"
        subtitle="Explore Our World-Class Facilities"
      />

      <section className="section-padding">
        <div className="section-container">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary text-foreground hover:bg-primary/10 hover:-translate-y-0.5"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg font-semibold text-background">{item.title}</h3>
                    <p className="text-sm text-background/80 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No images found in this category.</p>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-3 text-background hover:text-accent transition-all duration-300 hover:rotate-90"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div 
            className="max-w-5xl w-full max-h-[90vh] flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center text-background">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-background/80 mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}