import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroCampus from '@/assets/hero-campus.jpg';
import heroStudents from '@/assets/hero-students.jpg';
import heroInfrastructure from '@/assets/hero-infrastructure.jpg';

const slides = [
  {
    id: 1,
    image: heroCampus,
    title: 'Admissions Open 2025-26',
    subtitle: 'Join India\'s Premier Health Sciences Institution',
    cta: 'Apply Now',
    ctaLink: '/apply',
  },
  {
    id: 2,
    image: heroStudents,
    title: 'Excellence in Healthcare Education',
    subtitle: 'Shaping Future Healthcare Leaders Since 2005',
    cta: 'Explore Programs',
    ctaLink: '/academics',
  },
  {
    id: 3,
    image: heroInfrastructure,
    title: 'World-Class Infrastructure',
    subtitle: 'State-of-the-Art Labs, Libraries & Clinical Facilities',
    cta: 'Virtual Tour',
    ctaLink: '/about',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="section-container">
              <div className={`max-w-2xl transition-all duration-700 delay-200 ${
                index === current ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className={`text-lg md:text-xl text-primary-foreground/90 mb-8 transition-all duration-700 delay-300 ${
                  index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {slide.subtitle}
                </p>
                <Link to={slide.ctaLink} className={`inline-block transition-all duration-700 delay-500 ${
                  index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <Button 
                    size="lg" 
                    className="bg-accent text-accent-foreground hover:bg-accent-dark font-semibold px-8 shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === current 
                ? 'bg-accent w-10 shadow-glow' 
                : 'bg-primary-foreground/40 w-2 hover:bg-primary-foreground/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}