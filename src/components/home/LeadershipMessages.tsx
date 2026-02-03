import { Quote } from 'lucide-react';
import chairman from '@/assets/chairman.png';

export function LeadershipMessages() {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Message from Leadership</h2>
          <p className="section-subtitle">
            Guidance and vision from our Founder Chairman
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-secondary rounded-xl p-6 lg:p-8 relative group hover:shadow-premium-lg transition-all duration-500 animate-fade-in">
            <Quote className="absolute top-6 right-6 h-10 w-10 text-accent/20 group-hover:text-accent/40 transition-colors duration-300" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={chairman}
                  alt="Dr Abdul Basheer VK"
                  className="w-20 h-20 rounded-full object-cover object-[center_20%] border-3 border-accent shadow-glow transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">Dr Abdul Basheer VK</h3>
                <p className="text-sm text-accent-dark font-medium">Founder Chairman</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed italic text-sm">
              "Our vision is to create healthcare professionals who not only excel in their 
              technical skills but also embody compassion and dedication to serving humanity. 
              At Janapriya, we believe in holistic education that shapes both the mind and heart. 
              Our commitment to quality education and ethical values sets us apart in the field 
              of health sciences education."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}