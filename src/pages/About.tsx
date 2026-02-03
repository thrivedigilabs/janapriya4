import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { CheckCircle, Target } from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';
import chairman from '@/assets/chairman.png';
import vicePresident from '@/assets/vice-president.jpg';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'governance', label: 'Governance' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'approvals', label: 'Approvals' },
];

const highlights = [
  'RGUHS Affiliated Institution',
  'INC & KNC Approved Programs',
  'Karnataka Allied Health Council Approved',
  'Government of Karnataka Recognized',
  '100% Placement Assistance',
  'Partnerships with Leading Hospitals',
];

const objectives = [
  'To develop confidence and competency in providing quality education and patient care in various health care settings.',
  'To develop knowledge and skills in conducting nursing research, interpret and apply for the advancement of the practice of nursing profession.',
  'To analyze critically the existing situation of the profession and bring about change in the health care delivery system with a democratic approach.',
  'To exercise leadership position in nursing service, education and administration with increased cognitive, affective and psycho motor abilities.',
  'To develop personal and professional growth through continuous education.',
];

const About = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <Layout>
      <PageHero title="About Us" subtitle="Excellence in Health Sciences Education" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 p-2 bg-secondary rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-premium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Institutional Profile</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Janapriya Group of Institutions (Hassan & Mangalore) stands as a beacon of excellence in health sciences 
                    education in Karnataka. Established with a commitment to provide world-class 
                    healthcare education, we have grown to become one of the most trusted names in 
                    medical and allied health sciences training.
                  </p>
                  <p>
                    Our institution is affiliated to the prestigious Rajiv Gandhi University of Health 
                    Sciences (RGUHS) and recognized by the Government of Karnataka. We are also 
                    approved by the Indian Nursing Council (INC), Karnataka Nursing Council (KNC), and 
                    Karnataka Allied Health Council, ensuring that our programs meet the highest standards of quality and relevance.
                  </p>
                  <p>
                    With state-of-the-art infrastructure spread across our Hassan and Mangalore campuses, we provide an 
                    ideal learning environment for aspiring healthcare professionals. Our facilities 
                    include advanced laboratories, well-stocked libraries, modern classrooms, simulation 
                    centers, and clinical training facilities in collaboration with leading hospitals.
                  </p>
                  <p>
                    We take pride in our experienced faculty members who are experts in their respective 
                    fields, dedicated to nurturing the next generation of healthcare professionals through 
                    innovative teaching methodologies and hands-on training.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden shadow-premium">
                  <img src={heroCampus} alt="Janapriya Campus" className="w-full h-64 object-cover" />
                </div>
                
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-accent-dark mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent-dark flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="max-w-4xl">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Transform the lives of nursing students through innovative teaching and learning, diversity and inclusion, research and creativity, deep community engagement and empower them to function as culturally congruent nurses addressing the challenges of dynamic health care system.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Develop and implement high quality nursing education, prepare competent nurses to meet global needs, promote research and evidence based practice, provide leadership in the transformation of healthcare, and promote international collaboration in education & research.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Philosophy</h2>
                <div className="bg-secondary rounded-xl p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Even a basic course in nursing should prepare nurses to be capable of serving both in hospital and community setting.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The unique function of nurses is fourfold: <strong className="text-foreground">to prevent illness, restore health, promote health, and alleviate health problems.</strong>
                  </p>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Objectives</h2>
                <div className="space-y-3">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3 bg-secondary rounded-lg p-4">
                      <Target className="h-5 w-5 text-accent-dark flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Core Values</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Excellence', 'Integrity', 'Compassion', 'Innovation', 'Teamwork', 'Service'].map((value) => (
                    <div key={value} className="bg-secondary rounded-lg p-4 text-center">
                      <span className="font-semibold text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Governance Structure</h2>
              <p className="text-muted-foreground mb-8">
                Janapriya Group of Institutions operates under a well-defined governance framework 
                that ensures transparency, accountability, and effective management of all academic 
                and administrative functions.
              </p>
              
              <div className="space-y-6">
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">Board of Trustees</h3>
                  <p className="text-muted-foreground text-sm">
                    The Board of Trustees is the apex body responsible for overall policy decisions, 
                    financial oversight, and strategic direction of the institution.
                  </p>
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">Governing Council</h3>
                  <p className="text-muted-foreground text-sm">
                    The Governing Council oversees academic affairs, faculty appointments, and 
                    ensures compliance with regulatory requirements.
                  </p>
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">Academic Council</h3>
                  <p className="text-muted-foreground text-sm">
                    The Academic Council is responsible for curriculum development, examination 
                    standards, and academic quality assurance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="max-w-5xl">
              <h2 className="text-2xl font-bold text-foreground mb-8">Our Leadership Team</h2>
              
              {/* Chairman - Featured */}
              <div className="bg-secondary rounded-xl overflow-hidden mb-8">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1">
                    <img src="./Chairman.jpeg" alt="Dr Abdul Basheer VK" className="w-full h-full min-h-[300px] object-cover object-top" />
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8">
                    <h3 className="text-xl font-bold text-foreground">Dr Abdul Basheer VK</h3>
                    <p className="text-accent-dark mb-4">Founder Chairman</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      With the setting up of Janapriya Charitable Trust, the slogan of "Excellence and Service" embodies a rich tradition. 
                      Dr Abdul Basheer VK is the guiding light of the trust, leading us onto the road of imparting information and nurturing young minds. 
                      We have seen this institution's consistent expansion throughout the years, from its founding in all academic disciplines. 
                      The Almighty's favor and blessings, the college's leadership, and everyone else who contributed in building such a solid foundation are the cornerstones of its success.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                      Our goal is to foster a culture of ethical responsibility, critical thinking, and curiosity in our students so that they can go on to lead and effect changes in the world. 
                      Let's cultivate a lively culture of inquiry and bolster our research capacities. We will make great progress toward fulfilling the objective of our college and attaining greatness in all areas if we build on our strengths, embrace innovation, and foster a collaborative atmosphere.
                    </p>
                  </div>
                </div>
              </div>


              {/* Vice Chairman */}

              <div className="bg-secondary rounded-xl overflow-hidden mb-8">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1">
                    <img src="./VC.jpeg" alt="Dr Abdul Basheer VK" className="w-full h-full min-h-[300px] object-cover object-top" />
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8">
                    <h3 className="text-xl font-bold text-foreground">Mrs. Fathima Nasreen Basheer</h3>
                    <p className="text-accent-dark mb-4">Vice-Chairman</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                     Dedicated to fostering an environment of academic excellence and personal growth. Our commitment to student success drives every decision we make at Janapriya Group of Institutions.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                      Our goal is to foster a culture of ethical responsibility, critical thinking, and curiosity in our students so that they can go on to lead and effect changes in the world. 
                      Let's cultivate a lively culture of inquiry and bolster our research capacities. We will make great progress toward fulfilling the objective of our college and attaining greatness in all areas if we build on our strengths, embrace innovation, and foster a collaborative atmosphere.
                    </p>
                  </div>
                </div>
              </div>

              {/* Other Leadership */}
              <div className="grid md:grid-cols-3 gap-2">
                {/* Managing Director */}
                <div className="bg-secondary rounded-xl overflow-hidden group hover:shadow-premium-lg transition-all duration-300">
                  <div className="h-62 bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src="./Director.jpeg"
                      alt="Mrs. Fathima Nasreen Basheer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>


                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground">
                      Dr. Shahrukh Abdulla
                    </h3>
                    <p className="text-accent-dark text-sm font-medium">
                      Managing Director
                    </p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      Janapriya Group of Institutions
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      A foundation built on values, with the objective of creating centers of excellence for education in the field of Nursing. We have created a learning culture, a friendly environment that facilitates complete development of our students.
                    </p>
                  </div>
                </div>

            
<div className="bg-secondary rounded-xl overflow-hidden group hover:shadow-premium-lg transition-all duration-300">
                  <div className="h-62 bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src="./Trustee.jpeg"
                      alt="Mrs. Fathima Nasreen Basheer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>


                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground">
                     Shaamik Abdul Rehman
                    </h3>
                    <p className="text-accent-dark text-sm font-medium">
                      Trustee
                    </p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      Janapriya Group of Institutions
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Dedicated to fostering an environment of academic excellence and personal growth.
                      Our commitment to student success drives every decision we make at Janapriya Group of Institutions.
                    </p>
                  </div>
                </div>


                {/* Director of Health Sciences */}
                <div className="bg-secondary rounded-xl overflow-hidden group hover:shadow-premium-lg transition-all duration-300">
                  <div className="h-62 bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src="./Secreatry.jpeg"
                      alt="Mrs. Fathima Nasreen Basheer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>


                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground">
                      Dr.Shafaq Mohammed
                    </h3>
                    <p className="text-accent-dark text-sm font-medium">
                     Joint Secreatry
                    </p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      Janapriya Group of Institutions
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      As an educational institute we have always prided ourselves on our cutting edge approach to education. 
                      We believe that education has to keep pace with the world.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Affiliations & Approvals</h2>
              <p className="text-muted-foreground mb-8">
                Janapriya Group of Institutions is recognized by all major regulatory bodies 
                ensuring quality education and valid certifications for our students.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'RGUHS',
                    full: 'Rajiv Gandhi University of Health Sciences',
                    desc: 'All our programs are affiliated to RGUHS, the premier health sciences university in Karnataka.',
                  },
                  {
                    name: 'INC',
                    full: 'Indian Nursing Council',
                    desc: 'Our nursing programs are approved by INC, ensuring national recognition of nursing qualifications.',
                  },
                  {
                    name: 'KNC',
                    full: 'Karnataka Nursing Council',
                    desc: 'State-level approval from KNC for all nursing programs with registration facilities.',
                  },
                  {
                    name: 'KAHC',
                    full: 'Karnataka Allied Health Council',
                    desc: 'Our allied health science programs are approved by Karnataka Allied Health Council.',
                  },
                  {
                    name: 'Govt. of Karnataka',
                    full: 'Government of Karnataka',
                    desc: 'Recognized by the Government of Karnataka under the Health & Family Welfare Department.',
                  },
                  {
                    name: 'KPB',
                    full: 'Karnataka Paramedical Board',
                    desc: 'Our paramedical diploma programs are registered with Karnataka Paramedical Board (Registration: PMB593).',
                  },
                ].map((approval) => (
                  <div key={approval.name} className="bg-secondary rounded-xl p-6">
                    <h3 className="text-xl font-bold text-primary mb-1">{approval.name}</h3>
                    <p className="text-sm text-accent-dark mb-3">{approval.full}</p>
                    <p className="text-muted-foreground text-sm">{approval.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default About;