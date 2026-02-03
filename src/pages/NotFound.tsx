import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="text-center px-6">
        {/* Large 404 Number */}
        <h1 className="text-[120px] md:text-[180px] font-bold leading-none text-primary/20 select-none">
          404
        </h1>
        
        {/* Error Message */}
        <div className="-mt-8 md:-mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2" onClick={() => window.history.back()}>
            <span className="cursor-pointer" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </span>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-primary/80 animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
