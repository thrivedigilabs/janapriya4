import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    children: [
      { name: 'Overview', href: '/about?tab=overview' },
      { name: 'Vision & Mission', href: '/about?tab=vision' },
      { name: 'Governance', href: '/about?tab=governance' },
      { name: 'Leadership', href: '/about?tab=leadership' },
      { name: 'Approvals', href: '/about?tab=approvals' },
    ]
  },
  { 
    name: 'Academics', 
    href: '/academics',
    children: [
      { name: 'Our Institutes', href: '/academics?tab=faculties' },
      { name: 'Programs', href: '/academics?tab=programs' },
      { name: 'Academic Calendar', href: '/academics?tab=calendar' },
    ]
  },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Examinations', href: '/examinations' },
  { name: 'Resources', href: '/resources' },
  { name: 'Students', href: '/students' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="mailto:jipmshassan@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">jipmshassan@gmail.com</span>
              </a>
              <a href="tel:+919900747923" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">+91 99007 47923</span>
              </a>
            </div>
            <p className="hidden md:block text-xs lg:text-sm">
              Affiliated to RGUHS | Approved by INC, KNC & Karnataka Allied Health Council
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className={cn(
        "bg-background transition-shadow duration-300",
        isScrolled && "shadow-premium"
      )}>
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Janapriya Logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold text-primary">Janapriya</span>
                <span className="text-[10px] lg:text-xs text-muted-foreground -mt-1">Group of Institutions (Hassan & Mangalore)</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                      location.pathname === item.href 
                        ? "text-primary bg-primary/5" 
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.name}
                    {item.children && <ChevronDown className="h-3 w-3" />}
                  </Link>
                  
                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-full left-0 w-48 bg-background border border-border rounded-md shadow-premium-lg py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Apply Now Button + Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link to="/apply" className="hidden sm:block">
                <Button className="bg-accent hover:bg-accent-dark text-accent-foreground font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Apply Now
                </Button>
              </Link>
              
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-foreground hover:bg-muted rounded-md"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-foreground/20 z-40 lg:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 lg:hidden animate-slide-in-right shadow-premium-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-bold text-lg text-primary">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-foreground hover:bg-muted rounded-md"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between px-6 py-3 text-base font-medium transition-colors",
                        location.pathname === item.href 
                          ? "text-primary bg-primary/5" 
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      {item.name}
                      {item.children && (
                        <ChevronDown 
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openDropdown === item.name && "rotate-180"
                          )} 
                        />
                      )}
                    </Link>
                    {item.children && (
                      <div className="bg-muted/50 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-10 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <Link to="/apply" className="block">
                  <Button className="w-full bg-accent hover:bg-accent-dark text-accent-foreground font-semibold shadow-lg">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
