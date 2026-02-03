import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Book, Globe, Download, Clock, Users, FileText, ExternalLink } from 'lucide-react';
import library from '@/assets/library.jpg';

const resources = [
  { icon: Book, title: 'Central Library', desc: '3,500+ books, journals, and reference materials', link: '#library' },
  { icon: Globe, title: 'E-Resources', desc: 'Online databases, e-journals, and digital learning platforms', link: '#e-resources' },
  { icon: Download, title: 'Downloads', desc: 'Study materials, forms, and academic resources', link: '#downloads' },
];

const libraryInstructions = [
  'Users are requested to co-operate in maintaining an atmosphere conducive to study and research.',
  'Many of the reading materials are very precious, rare and irreplaceable. Please handle them with utmost care.',
  'All the users of the reading room are required to sign the daily entry book upon entering the library.',
  'All personal belongings should be kept on the empty rack at the entry to the library.',
  'For any assistance required, consult the librarian sitting inside the library.',
  'Any materials found should be brought immediately to the notice of the librarian.',
];

const eResources = [
  { name: 'NCERT Online Journals', url: 'https://ncert.nic.in/ncertldd/collection/online_journal.php' },
  { name: 'EBSCO Host', url: 'https://www.search.ebscohost.com/login' },
  { name: 'Delinet', url: 'https://www.delinet.in' },
  { name: 'Science Direct', url: 'http://www.sciencedirect.com' },
  { name: 'Springer Link', url: 'http://www.link.springer.com' },
  { name: 'PubMed', url: 'http://www.pubmed.gov' },
  { name: 'PDF Drive', url: 'http://www.pdfdrive.com' },
];

const eBooks = [
  'Upper GI Endoscopy',
  'Echocardiography and Stress Testing',
  'Research in Diabetes',
  'Diabetes Mellitus, Geriatric Medicine – W.H.O. Workshop',
];

const Resources = () => {
  return (
    <Layout>
      <PageHero title="Resources" subtitle="Library, E-Resources & Downloads" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {resources.map((item) => (
              <a 
                key={item.title} 
                href={item.link}
                className="bg-secondary rounded-xl p-6 card-hover block"
              >
                <item.icon className="h-10 w-10 text-accent-dark mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </a>
            ))}
          </div>

          {/* Library Section */}
          <div id="library" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Digital Library</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="rounded-xl overflow-hidden shadow-premium mb-6">
                  <img src={library} alt="Library" className="w-full h-64 object-cover" />
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Welcome to the Library and Information Centre. We wish you the right information at the right time. 
                    The Library and Information Centre is aimed to collect, organize, consolidate, preserve, disseminate 
                    and exchange information important in the field of health sciences education.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Working Hours */}
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-accent-dark" />
                    <h3 className="font-semibold text-foreground">Library Working Hours</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    The library is open on all days (Except Sundays and Government holidays)
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-muted rounded-lg p-3">
                      <span className="text-foreground font-medium">Week Days</span>
                      <span className="text-muted-foreground">9:00 AM to 8:30 PM</span>
                    </div>
                    <div className="flex justify-between bg-muted rounded-lg p-3">
                      <span className="text-foreground font-medium">Saturday</span>
                      <span className="text-muted-foreground">9:00 AM to 6:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Membership */}
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-accent-dark" />
                    <h3 className="font-semibold text-foreground">Membership</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    All teaching faculty, students and staff are eligible to be members of the library.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      Due date will be marked on the due date slip pasted in every book
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      If due date falls on a holiday, books can be returned on the next working day
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      Items can be renewed only once (except reference materials)
                    </li>
                  </ul>
                </div>

                {/* General Instructions */}
                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-6 w-6 text-accent-dark" />
                    <h3 className="font-semibold text-foreground">General Instructions</h3>
                  </div>
                  <ul className="space-y-2">
                    {libraryInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* E-Resources Section */}
          <div id="e-resources" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">E-Books & E-Journals</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* E-Books */}
              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Available E-Books</h3>
                <ul className="space-y-2">
                  {eBooks.map((book, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Book className="h-4 w-4 text-accent-dark flex-shrink-0" />
                      {book}
                    </li>
                  ))}
                </ul>
              </div>

              {/* E-Journal Links */}
              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">E-Journal Databases</h3>
                <ul className="space-y-2">
                  {eResources.map((resource, index) => (
                    <li key={index}>
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Downloads Section */}
          <div id="downloads">
            <h2 className="text-2xl font-bold text-foreground mb-6">Downloads</h2>
            <div className="bg-secondary rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-4">
                Study materials, forms, and academic resources will be available for download here. 
                Please check back for updated content.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Download className="h-8 w-8 mx-auto mb-2 text-accent-dark" />
                  <h4 className="font-medium text-foreground text-sm">Admission Forms</h4>
                  <p className="text-xs text-muted-foreground">Coming Soon</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Download className="h-8 w-8 mx-auto mb-2 text-accent-dark" />
                  <h4 className="font-medium text-foreground text-sm">Study Materials</h4>
                  <p className="text-xs text-muted-foreground">Coming Soon</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Download className="h-8 w-8 mx-auto mb-2 text-accent-dark" />
                  <h4 className="font-medium text-foreground text-sm">Academic Calendar</h4>
                  <p className="text-xs text-muted-foreground">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;