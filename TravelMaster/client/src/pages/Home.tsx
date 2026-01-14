import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import type { Tour } from "@/lib/types";

export default function Home() {
  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const featuredTours = tours.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Discover Your Next Adventure"
        subtitle="Create unforgettable memories with our curated tours and luxury accommodations worldwide"
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
        showSearch={true}
        primaryAction={{
          text: "Explore Tours",
          onClick: () => window.location.href = "/tours",
        }}
        secondaryAction={{
          text: "Book Hotels",
          onClick: () => window.location.href = "/hotels",
        }}
      />

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600">Discover the world's most breathtaking locations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <Card key={tour.id} className="hover-lift overflow-hidden">
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{tour.name}</h3>
                    <p className="text-sm">{tour.description}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">From ${tour.price}</span>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience the Journey</h2>
            <p className="text-xl text-gray-600">Watch our travelers share their incredible experiences</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-64 md:h-96"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Travel Experience Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8">Join thousands of happy travelers who chose Wanderlust Travel</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Browse Tours
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
