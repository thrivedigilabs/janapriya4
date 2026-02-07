import { useState } from 'react';
import { X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { cn } from '@/lib/utils';

/* ===============================
   CAMPUS IMAGES
================================ */
import campus1 from '@/assets/Gallery Images/Campus/Campus 1.jpeg';
import campus2 from '@/assets/Gallery Images/Campus/Campus 2.jpeg';
import campus3 from '@/assets/Gallery Images/Campus/Campus-3.jpeg';
import campus4 from '@/assets/Gallery Images/Campus/Campus-4.jpeg';
import campus5 from '@/assets/Gallery Images/Campus/Campus-5.jpeg';
import campus6 from '@/assets/Gallery Images/Campus/Campus-6.jpeg';
import campus7 from '@/assets/Gallery Images/Campus/Campus-7.jpeg';
import campus8 from '@/assets/Gallery Images/Campus/Campus-8.jpeg';
import campus9 from '@/assets/Gallery Images/Campus/Campus-9.jpeg';
import campus10 from '@/assets/Gallery Images/Campus/Campus-10.jpeg';
import campus11 from '@/assets/Gallery Images/Campus/Campus-11.jpeg';
import campus12 from '@/assets/Gallery Images/Campus/Campus-12.jpeg';

/* ===============================
   CLINICAL FACILITIES IMAGES
================================ */
import clinical3 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities3.jpeg';
import clinical4 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities4.jpeg';
import clinical5 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities5.jpeg';
import clinical6 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities6.jpeg';
import clinical7 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities7.jpeg';
import clinical8 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities8.jpeg';
import clinical9 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities9.jpeg';
import clinical10 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities10.jpeg';
import clinical11 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities11.jpeg';
import clinical12 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities12.jpeg';
import clinical13 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities13.jpeg';
import clinical14 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities14.jpeg';
import clinical15 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities15.jpeg';
import clinical16 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities16.jpeg';
import clinical17 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities17.jpeg';
import clinical18 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities18.jpeg';
import clinical19 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities19.jpeg';
import clinical20 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities20.jpeg';
import clinical21 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities21.jpeg';
import clinical22 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities22.jpeg';
import clinical23 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities23.jpeg';
import clinical24 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities24.jpeg';
import clinical25 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities25.jpeg';
import clinical26 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities26.jpeg';
import clinical27 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities27.jpeg';
import clinical28 from '@/assets/Gallery Images/Clinical Facilities/Clinical Facilities28.jpeg';

/* ===============================
   TYPES
================================ */
type Category = 'all' | 'campus' | 'clinical';

type GalleryItem = {
  src: string;
  category: 'campus' | 'clinical';
  title: string;
  description: string;
};

/* ===============================
   FILTER TABS
================================ */
const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'campus', label: 'Campus' },
  { id: 'clinical', label: 'Clinical Facilities' },
];

/* ===============================
   GALLERY ITEMS
================================ */
const galleryItems: GalleryItem[] = [
  campus1, campus2, campus3, campus4, campus5, campus6,
  campus7, campus8, campus9, campus10, campus11, campus12,
].map((src, index): GalleryItem => ({
  src,
  category: 'campus',
  title: `Campus ${index + 1}`,
  description: 'Janapriya Campus View',
}))
.concat(
  [
    clinical3, clinical4, clinical5, clinical6, clinical7,
    clinical8, clinical9, clinical10, clinical11, clinical12,
    clinical13, clinical14, clinical15, clinical16, clinical17,
    clinical18, clinical19, clinical20, clinical21, clinical22,
    clinical23, clinical24, clinical25, clinical26, clinical27,
    clinical28,
  ].map((src, index): GalleryItem => ({
    src,
    category: 'clinical',
    title: `Clinical Facility ${index + 1}`,
    description: 'Clinical Facilities & Training Labs',
  }))
);

/* ===============================
   COMPONENT
================================ */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <PageHero
        title="Campus Gallery"
        subtitle="Campus & Clinical Facilities"
      />

      <section className="section-padding">
        <div className="section-container">

          {/* FILTER TABS */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary hover:bg-primary/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-card hover:-translate-y-1 transition"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="max-w-5xl max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </Layout>
  );
}
