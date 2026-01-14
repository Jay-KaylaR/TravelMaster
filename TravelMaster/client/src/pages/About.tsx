import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Globe } from "lucide-react";

const teamMembers = [
  {
    name: "John Anderson",
    position: "CEO & Founder",
    description: "25+ years in travel industry",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  },
  {
    name: "Sarah Chen",
    position: "Travel Director",
    description: "Expert in Asian destinations",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  },
  {
    name: "Mike Rodriguez",
    position: "Marketing Manager",
    description: "Adventure travel specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  },
  {
    name: "Emily Watson",
    position: "Customer Service Manager",
    description: "Luxury travel expert",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  },
];

const stats = [
  { number: "50,000+", label: "Happy Travelers" },
  { number: "150+", label: "Destinations" },
  { number: "15+", label: "Years Experience" },
  { number: "4.9★", label: "Average Rating" },
];

const values = [
  {
    icon: <Heart className="text-white text-2xl" />,
    title: "Our Mission",
    description: "To create transformative travel experiences that connect people with cultures, places, and moments that inspire lifelong memories.",
    bgColor: "bg-accent",
  },
  {
    icon: <Star className="text-white text-2xl" />,
    title: "Our Values",
    description: "Excellence, authenticity, and sustainability guide everything we do. We believe in responsible travel that benefits local communities.",
    bgColor: "bg-secondary",
  },
  {
    icon: <Globe className="text-white text-2xl" />,
    title: "Our Vision",
    description: "To be the world's most trusted travel partner, making extraordinary journeys accessible to everyone while protecting our planet.",
    bgColor: "bg-green-500",
  },
];

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Wanderlust Travel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've been crafting unforgettable travel experiences for over 15 years, connecting adventurers 
            with the world's most amazing destinations.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2008 by a group of passionate travelers, Wanderlust Travel began as a small agency 
              with a big dream: to make extraordinary travel experiences accessible to everyone.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a local travel agency has grown into a global platform, serving thousands of 
              travelers each year. Our commitment to personalized service, attention to detail, and deep 
              local knowledge sets us apart in the travel industry.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate and expand our offerings while maintaining the personal touch 
              that our clients love.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Travel Team"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.position}</p>
                <p className="text-sm text-gray-500">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-primary rounded-2xl p-8 text-white text-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="p-0">
                <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Awards & Recognition */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-2">Best Travel Agency 2023</div>
              <p className="text-gray-600">Travel & Leisure Magazine</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">Excellence in Service</div>
              <p className="text-gray-600">World Travel Awards</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">Sustainable Tourism Leader</div>
              <p className="text-gray-600">Green Travel Association</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
