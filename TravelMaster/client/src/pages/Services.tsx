import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plane, 
  Bed, 
  Route, 
  Car, 
  ClipboardList, 
  Shield,
  Check 
} from "lucide-react";

const services = [
  {
    icon: <Plane className="text-white text-2xl" />,
    title: "Flight Booking",
    description: "Find and book the best flights to any destination worldwide with our comprehensive search engine.",
    features: ["Best price guarantee", "24/7 customer support", "Flexible cancellation"],
    bgColor: "bg-primary",
  },
  {
    icon: <Bed className="text-white text-2xl" />,
    title: "Hotel Reservations",
    description: "Book luxury accommodations and budget-friendly stays from our curated selection of properties.",
    features: ["Handpicked properties", "Instant confirmation", "Special member rates"],
    bgColor: "bg-accent",
  },
  {
    icon: <Route className="text-white text-2xl" />,
    title: "Guided Tours",
    description: "Experience destinations like a local with our expert guides and carefully crafted itineraries.",
    features: ["Expert local guides", "Small group sizes", "Skip-the-line access"],
    bgColor: "bg-secondary",
  },
  {
    icon: <Car className="text-white text-2xl" />,
    title: "Transportation",
    description: "Seamless transportation solutions including car rentals, airport transfers, and private drivers.",
    features: ["Airport pickup/drop-off", "Luxury vehicle fleet", "Professional drivers"],
    bgColor: "bg-green-500",
  },
  {
    icon: <ClipboardList className="text-white text-2xl" />,
    title: "Travel Planning",
    description: "Custom itinerary planning service to create your perfect vacation based on your preferences.",
    features: ["Personalized itineraries", "Budget optimization", "24/7 travel support"],
    bgColor: "bg-purple-500",
  },
  {
    icon: <Shield className="text-white text-2xl" />,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance to protect your investment and ensure peace of mind.",
    features: ["Medical coverage", "Trip cancellation", "Emergency assistance"],
    bgColor: "bg-red-500",
  },
];

const packages = [
  {
    name: "Basic Explorer",
    services: "Flight + Hotel + Airport Transfer",
    duration: "3-5 Days",
    price: "$799",
  },
  {
    name: "Adventure Seeker",
    services: "Flight + Hotel + Tours + Activities + Transportation",
    duration: "7-10 Days",
    price: "$1,899",
  },
  {
    name: "Luxury Traveler",
    services: "Premium Flight + Luxury Hotel + Private Tours + Concierge + Insurance",
    duration: "10-14 Days",
    price: "$4,299",
  },
  {
    name: "Grand Explorer",
    services: "Business Class + 5-Star Hotels + Private Guide + All Activities + Full Support",
    duration: "14+ Days",
    price: "$7,999",
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h1>
          <p className="text-xl text-gray-600">Comprehensive travel solutions tailored to your needs</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="hover-lift p-8">
              <CardContent className="p-0 text-center">
                <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Service Packages</h3>
          <div className="overflow-x-auto">
            <Table className="w-full bg-white rounded-lg shadow-lg">
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-white font-semibold">Package</TableHead>
                  <TableHead className="text-white font-semibold">Services Included</TableHead>
                  <TableHead className="text-white font-semibold">Duration</TableHead>
                  <TableHead className="text-white font-semibold">Price</TableHead>
                  <TableHead className="text-white font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-semibold text-gray-900">{pkg.name}</TableCell>
                    <TableCell className="text-gray-600">{pkg.services}</TableCell>
                    <TableCell className="text-gray-600">{pkg.duration}</TableCell>
                    <TableCell className="text-primary font-bold">{pkg.price}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        Select Package
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Wanderlust Travel?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Expert Knowledge</h4>
              <p className="text-gray-600">Our travel experts have firsthand experience with every destination we offer, ensuring authentic and memorable experiences.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h4>
              <p className="text-gray-600">Round-the-clock customer support ensures you're never alone during your travels. We're here whenever you need us.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Personalized Service</h4>
              <p className="text-gray-600">Every trip is customized to your preferences, interests, and budget. No two journeys are the same.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Planning?</h2>
          <p className="text-xl text-gray-600 mb-8">Let our experts create the perfect travel experience for you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
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
