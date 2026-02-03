import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Users, Building, Award, Heart, Home, Shield, Utensils, Dumbbell, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import heroStudents from '@/assets/hero-students.jpg';
import { useState } from 'react';

const facilities = [
  { icon: Building, title: 'Modern Hostels', desc: 'Separate hostels for boys and girls with all amenities' },
  { icon: Users, title: 'Sports Complex', desc: 'Indoor and outdoor sports facilities for fitness' },
  { icon: Award, title: 'Placement Cell', desc: '100% placement assistance with leading hospitals' },
  { icon: Heart, title: 'Counseling Center', desc: 'Mental health support and career guidance' },
];

const hostelFeatures = [
  { icon: Home, title: 'Comfortable Accommodation', desc: 'Well-structured accommodations providing a comfortable and secure living environment' },
  { icon: Dumbbell, title: 'Fitness Facilities', desc: 'Gyms, sports arenas encouraging physical activities and fitness' },
  { icon: Utensils, title: 'Dining Services', desc: 'Quality eateries providing nutritious meals for students' },
  { icon: Shield, title: 'Safety & Security', desc: '24/7 monitoring, strict guidelines, and dedicated support staff' },
];

const raggingActs = [
  'Any conduct by any student or students whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student.',
  'Indulging in rowdy or undisciplined activities by any student or students which causes or is likely to cause annoyance, hardship, physical or psychological harm or to raise fear or apprehension thereof in any fresher or any other student.',
  'Asking any student to do any act which such student will not in the ordinary course do and which has the effect of causing or generating a sense of shame, or torment or embarrassment so as to adversely affect the physique or psyche of such fresher or any other student.',
  'Any act by a senior student that prevents, disrupts or disturbs the regular academic activity of any other student or a fresher.',
  'Exploiting the services of a fresher or any other student for completing the academic tasks assigned to an individual or a group of students.',
  'Any act of financial extortion or forceful expenditure burden put on a fresher or any other student by students.',
  'Any act of physical abuse including all variants of it: sexual abuse, homosexual assaults, stripping, forcing obscene and lewd acts, gestures, causing bodily harm or any other danger to health or person.',
  'Any act or abuse by spoken words, emails, post, public insults which would also include deriving perverted pleasure, vicarious or sadistic thrill from actively or passively participating in the discomfiture to fresher or any other student.',
  'Any act that affects the mental health and self-confidence of a fresher or any other student with or without an intent to derive a sadistic pleasure or showing off power, authority or superiority by a student over any fresher or any other student.',
];

const prohibitionMeasures = [
  'No institution shall permit or condone any reported incident of ragging in any form; and all institutions shall take all necessary and required measures to achieve the objective of eliminating ragging.',
  'All institutions shall take action against those found guilty of ragging and/or abetting ragging, actively or passively, or being part of a conspiracy to promote ragging.',
  'Every public declaration for admission of students shall expressly provide that ragging is totally prohibited and anyone found guilty is liable to be punished.',
  'The telephone numbers of the Anti-Ragging Helpline and all important functionaries shall be published in the brochure of admission.',
  'The application for admission must be accompanied by an Anti-Ragging affidavit signed by a student and another signed by a Parent/Guardian.',
  'Any distress message received at the Anti-Ragging Helpline shall be simultaneously relayed to the Head of the Institution, the Warden, and concerned authorities.',
  'On receipt of any information concerning ragging, the Head of institution shall proceed to file a First Information Report (FIR) within twenty-four hours.',
  'The institution shall maintain an appropriate database of affidavits and ragging complaints with status of action taken.',
  'Any incident of ragging shall adversely affect the institution\'s accreditation, ranking or grading by NAAC or other authorized agencies.',
];

const punishments = [
  'Suspension from attending classes and academic privileges',
  'Withholding/withdrawing scholarship/fellowship and other benefits',
  'Debarring from appearing in any test/examination or other evaluation process',
  'Withholding results',
  'Debarring from representing the institution in any regional, national or international meet, tournament, youth festival, etc.',
  'Suspension/expulsion from the hostel',
  'Cancellation of admission',
  'Rustication from the institution for period ranging from one to four semesters',
  'Expulsion from the institution and consequent debarring from admission to any other institution for a specified period',
];

const Students = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Layout>
      <PageHero title="Students" subtitle="Resources, Facilities & Support" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Student Life at Janapriya</h2>
              <p className="text-muted-foreground mb-6">
                We provide a nurturing environment where students can grow academically and personally. 
                Our comprehensive support system ensures every student has access to resources for success.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {facilities.map((item) => (
                  <div key={item.title} className="bg-secondary rounded-lg p-4">
                    <item.icon className="h-6 w-6 text-accent-dark mb-2" />
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-premium">
              <img src={heroStudents} alt="Students" className="w-full h-80 object-cover" />
            </div>
          </div>

          {/* Hostel Facility Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Hostel Facility</h2>
            <div className="bg-secondary rounded-xl p-6 mb-6">
              <p className="text-muted-foreground mb-4">
                JP Groups offers comprehensive hostel facilities, catering to the diverse needs of its students. 
                The accommodations are well-structured, providing a comfortable and secure living environment that 
                supports both academic pursuits and leisure activities. The hostels are equipped with modern amenities, 
                ensuring a homely atmosphere for students coming from various backgrounds.
              </p>
              <p className="text-muted-foreground mb-4">
                We emphasize the importance of a balanced lifestyle for our residents. Facilities such as gyms, 
                sports arenas, and eateries are readily available, encouraging students to engage in physical 
                activities and social interactions. This holistic approach helps in fostering a vibrant community 
                within the campus, enhancing the overall student experience.
              </p>
              <p className="text-muted-foreground">
                Safety and wellbeing are paramount at our institution. The hostel premises are monitored to ensure 
                a safe environment, and strict guidelines are in place to maintain discipline and order. These measures, 
                along with the dedicated staff and support services, ensure that students have a nurturing and productive 
                stay during their academic journey.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hostelFeatures.map((feature) => (
                <div key={feature.title} className="bg-muted rounded-lg p-4 text-center">
                  <feature.icon className="h-8 w-8 mx-auto mb-3 text-accent-dark" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Anti-Ragging Policy Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h2 className="text-2xl font-bold text-foreground">Anti-Ragging Policy</h2>
            </div>
            
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 mb-6">
              <p className="text-foreground font-medium mb-2">Zero Tolerance for Ragging</p>
              <p className="text-muted-foreground text-sm">
                Ragging is a criminal offense and is strictly prohibited in our institution. 
                We are committed to providing a safe and respectful environment for all students. 
                Any act of ragging will result in severe disciplinary action as per UGC regulations.
              </p>
            </div>

            <div className="space-y-4">
              {/* What Constitutes Ragging */}
              <div className="bg-secondary rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('acts')}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <h3 className="font-semibold text-foreground">What Constitutes Ragging?</h3>
                  {expandedSection === 'acts' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSection === 'acts' && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-3">
                      {raggingActs.map((act, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-destructive/20 text-destructive text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Measures for Prohibition */}
              <div className="bg-secondary rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('measures')}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <h3 className="font-semibold text-foreground">Measures for Prohibition of Ragging</h3>
                  {expandedSection === 'measures' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSection === 'measures' && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-3">
                      {prohibitionMeasures.map((measure, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Administrative Actions */}
              <div className="bg-secondary rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('punishments')}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <h3 className="font-semibold text-foreground">Administrative Actions & Punishments</h3>
                  {expandedSection === 'punishments' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSection === 'punishments' && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      The Anti-Ragging Committee may, depending on the nature and gravity of the guilt, award one or more of the following punishments:
                    </p>
                    <ul className="space-y-2">
                      {punishments.map((punishment, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-destructive/20 text-destructive text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          {punishment}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> Where the persons committing or abetting the act of ragging are not identified, 
                        the institution shall resort to collective punishment. An appeal against the order of punishment may 
                        be filed with the Vice-Chancellor (for affiliated institutions) or Chancellor (for universities).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Students;