interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="gradient-primary py-16 lg:py-20">
      <div className="section-container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-primary-foreground/80">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
