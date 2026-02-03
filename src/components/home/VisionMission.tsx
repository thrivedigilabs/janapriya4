import chairman from '@/assets/chairman.png';

export function VisionMission() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative pattern at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent" />
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 text-accent/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
      
      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-2 block">Who We Are</span>
            <h2 className="section-title mb-8">Vision & Mission</h2>
            
            {/* Vision Card */}
            <div className="relative mb-6 group">
              <div className="absolute -left-4 top-0 text-6xl font-bold text-accent/20 select-none">01</div>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 pl-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
                <h3 className="text-xl font-semibold text-primary mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Our vision is to be a leading multi-disciplinary health sciences institution known for excellence, innovation, and compassionate care. We aim to shape globally competent healthcare professionals who uphold the highest standards of practice.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative group">
              <div className="absolute -left-4 top-0 text-6xl font-bold text-accent/20 select-none">02</div>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 pl-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
                <h3 className="text-xl font-semibold text-primary mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Our mission is to deliver high-quality, compassionate, and practice-oriented education across nursing, paramedical, and physiotherapy fields. We strive to develop ethically responsible, skilled, and patient-centred healthcare professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={chairman}
                alt="Chairman of Janapriya Group of Institutions"
                className="w-full h-[400px] md:h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 gradient-primary p-6">
                <p className="text-primary-foreground font-semibold text-lg">Dr Abdul Basheer VK</p>
                <p className="text-primary-foreground/80 text-sm">Founder Chairman</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
