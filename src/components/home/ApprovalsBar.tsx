import { useEffect, useRef, useState } from 'react';
import rguhsLogo from '@/assets/logos/rguhs.png';
import kncLogo from '@/assets/logos/knc.png';
import incLogo from '@/assets/logos/inc.png';
import karnatakaGovtLogo from '@/assets/logos/karnataka-govt.png';
import kahcLogo from '@/assets/logos/kahc.png';

const approvals = [
  { name: 'RGUHS', full: 'Rajiv Gandhi University of Health Sciences', logo: rguhsLogo },
  { name: 'KNC', full: 'Karnataka Nursing Council', logo: kncLogo },
  { name: 'INC', full: 'Indian Nursing Council', logo: incLogo },
  { name: 'Govt. of Karnataka', full: 'Government of Karnataka', logo: karnatakaGovtLogo },
  { name: 'KAHC', full: 'Karnataka Allied Health Council', logo: kahcLogo },
];

export function ApprovalsBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let position = 0;
    const speed = 1;

    const animate = () => {
      if (!isPaused) {
        position -= speed;
        if (position <= -(el.scrollWidth / 2)) {
          position = 0;
        }
        el.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-8 bg-secondary/50 border-y border-border overflow-hidden">
      <div className="text-center mb-6">
        <span className="text-accent font-semibold text-xs uppercase tracking-wider">Approved & Affiliated By</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex items-center gap-16 whitespace-nowrap"
        style={{ width: 'max-content' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...approvals, ...approvals].map((approval, index) => (
          <div 
            key={index}
            className="flex flex-col items-center px-8 group cursor-pointer"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110">
              <img 
                src={approval.logo} 
                alt={approval.full}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center whitespace-normal max-w-[120px]">
              {approval.full}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
