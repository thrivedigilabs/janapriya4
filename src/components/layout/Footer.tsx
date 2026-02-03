import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '@/assets/logo.png';

const faculties = [
  { name: 'Janapriya Nursing College, Hassan', href: '/academics?tab=faculties#nursing' },
  { name: 'Janapriya Institute of Paramedical Health Sciences, Hassan', href: '/academics?tab=faculties#paramedical' },
  { name: 'Janapriya Institute of Allied Health Sciences, Hassan', href: '/academics?tab=faculties#allied-hassan' },
  { name: 'Janapriya Institute of Allied Health Sciences, Mangalore', href: '/academics?tab=faculties#allied-mangalore' },
  { name: 'Janapriya Institute of Physiotherapy, Mangalore', href: '/academics?tab=faculties#physiotherapy' },
];

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Examinations', href: '/examinations' },
  { name: 'Library', href: '/resources' },
  { name: 'Training & Placement', href: '/students' },
  { name: 'Student Welfare', href: '/students' },
  { name: 'Contact Us', href: '/contact' },
];

const programs = [
  { name: 'Undergraduate Programs (B.Sc)', href: '/academics?tab=programs#undergraduate' },
  { name: 'Diploma Programs', href: '/academics?tab=programs#diploma' },
];

const socials = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Institution Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Janapriya Logo" className="w-12 h-12 object-contain bg-primary-foreground rounded-full p-1" />
              <div>
                <h3 className="font-bold text-lg">Janapriya</h3>
                <p className="text-xs text-primary-foreground/70">Group of Institutions (Hassan & Mangalore)</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4 leading-relaxed">
              Affiliated to RGUHS, recognized by Government of Karnataka. Approved by INC, KNC & Karnataka Allied Health Council. Committed to excellence in health sciences education.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Institutes */}
          <div>
            <h4 className="font-semibold text-base mb-4">Our Institutes</h4>
            <ul className="space-y-2">
              {faculties.map((faculty) => (
                <li key={faculty.name}>
                  <Link 
                    to={faculty.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {faculty.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Programs */}
          <div>
            <h4 className="font-semibold text-base mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80">
                  <strong>Hassan:</strong> Plot No. 503/A, KIADB Growth Center, H N Pura Road<br />
                  <strong>Mangalore:</strong> Padil, Mangaluru 575007
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                <div className="text-primary-foreground/80">
                  <a href="tel:+919900747923" className="hover:text-accent transition-colors">+91 99007 47923</a> (Hassan)<br />
                  <a href="tel:+919148247799" className="hover:text-accent transition-colors">+91 91482 47799</a> (Mangalore)
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href="mailto:janapriyaconhassan@gmail.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  janapriyaconhassan@gmail.com
                </a>
              </div>
            </div>

            <h4 className="font-semibold text-base mb-3">Programs</h4>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link 
                    to={program.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
            <p>© 2025 Janapriya Group of Institutions (Hassan & Mangalore). All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
