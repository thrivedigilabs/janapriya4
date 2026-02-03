import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('welcomePopupSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('welcomePopupSeen', 'true');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-foreground/50 z-[60] animate-fade-in"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-background rounded-lg shadow-premium-lg max-w-lg w-full overflow-hidden">
          <div className="gradient-primary p-6 text-primary-foreground relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Welcome to Janapriya</h2>
            <p className="text-primary-foreground/90">Group of Institutions (Hassan & Mangalore)</p>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Admissions Open 2025-26
            </h3>
            <p className="text-muted-foreground mb-4">
              Join Karnataka's premier health sciences institution. Affiliated to RGUHS, approved by INC, KNC & Karnataka Allied Health Council with 100% placement assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/apply" className="flex-1" onClick={handleClose}>
                <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                  Apply Now
                </Button>
              </Link>
              <Link to="/academics" className="flex-1" onClick={handleClose}>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
