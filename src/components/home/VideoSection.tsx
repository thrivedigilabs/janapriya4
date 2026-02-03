export function VideoSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title text-accent-dark">Experience Janapriya</h2>
          <p className="section-subtitle">
            Discover our world-class facilities and vibrant campus life
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-premium-lg aspect-video">
          <iframe
            src="https://www.youtube.com/embed/7cwUcdpUayQ"
            title="Janapriya Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
