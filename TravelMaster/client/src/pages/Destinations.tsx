import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Camera, Waves, Users } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Diani Beach, Kenya",
    description: "Pristine White Sand Paradise",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    id: 2,
    name: "Stone Town, Zanzibar",
    description: "Historic Spice Island Heritage",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    id: 3,
    name: "Watamu, Kenya",
    description: "Marine National Park Wonder",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    id: 4,
    name: "Dar es Salaam, Tanzania",
    description: "Vibrant Coastal Metropolis",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    id: 5,
    name: "Nungwi Beach, Zanzibar",
    description: "Turquoise Waters & Dhow Sunsets",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
  {
    id: 6,
    name: "Lamu Island, Kenya",
    description: "UNESCO World Heritage Jewel",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  },
];

const activities = [
  {
    icon: <Waves className="text-white text-2xl" />,
    title: "Dhow Sailing",
    description: "Traditional sailing adventures",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    bgColor: "bg-primary",
  },
  {
    icon: <Mountain className="text-white text-2xl" />,
    title: "Spice Tours",
    description: "Aromatic plantation experiences",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    bgColor: "bg-accent",
  },
  {
    icon: <Camera className="text-white text-2xl" />,
    title: "Marine Photography",
    description: "Underwater coral reef shots",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    bgColor: "bg-secondary",
  },
  {
    icon: <Users className="text-white text-2xl" />,
    title: "Swahili Culture",
    description: "Authentic coastal traditions",
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    bgColor: "bg-green-500",
  },
];

export default function Destinations() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Amazing Destinations</h1>
          <p className="text-xl text-gray-600">Discover the world's most captivating places</p>
        </div>

        {/* Featured Destination Hero */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <div
            className="h-96 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4">Zanzibar Spice Island Experience</h2>
                <p className="text-xl mb-6">Discover pristine beaches, rich culture, and aromatic spice tours</p>
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-semibold">
                  Explore This Destination
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {destinations.map((destination) => (
            <div key={destination.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm">{destination.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Showcase */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Popular Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 ${activity.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {activity.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{activity.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Explore?</h2>
          <p className="text-xl text-gray-600 mb-8">Let us help you plan your perfect adventure</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Browse Tours
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
