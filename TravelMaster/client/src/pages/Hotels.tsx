import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Hotel, HotelBookingForm } from "@/lib/types";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell } from "lucide-react";

const hotelBookingSchema = z.object({
  guestName: z.string().min(2, "Guest name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  hotelSelection: z.string().min(1, "Please select a hotel"),
  checkInDate: z.string().min(1, "Please select check-in date"),
  checkOutDate: z.string().min(1, "Please select check-out date"),
  specialRequests: z.string().optional(),
});

const amenityIcons: Record<string, JSX.Element> = {
  "Wi-Fi": <Wifi className="h-4 w-4" />,
  "Parking": <Car className="h-4 w-4" />,
  "Restaurant": <Coffee className="h-4 w-4" />,
  "Gym": <Dumbbell className="h-4 w-4" />,
};

export default function Hotels() {
  const { toast } = useToast();
  
  const { data: hotels = [], isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const bookingMutation = useMutation({
    mutationFn: (data: HotelBookingForm) => apiRequest("POST", "/api/bookings/hotels", data),
    onSuccess: () => {
      toast({
        title: "Reservation Successful!",
        description: "Your hotel reservation has been submitted. We'll contact you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Reservation Failed",
        description: "There was an error submitting your reservation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<HotelBookingForm>({
    resolver: zodResolver(hotelBookingSchema),
    defaultValues: {
      guestName: "",
      email: "",
      phone: "",
      hotelSelection: "",
      checkInDate: "",
      checkOutDate: "",
      specialRequests: "",
    },
  });

  const onSubmit = (data: HotelBookingForm) => {
    bookingMutation.mutate(data);
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Luxury Hotels & Accommodations</h1>
          <p className="text-xl text-gray-600">Stay in comfort and style at our handpicked properties</p>
        </div>

        {/* Hotel Search */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </Label>
                <Input id="destination" placeholder="Where to stay?" />
              </div>
              <div>
                <Label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </Label>
                <Input id="checkin" type="date" />
              </div>
              <div>
                <Label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </Label>
                <Input id="checkout" type="date" />
              </div>
              <div>
                <Label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4+">4+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90 font-semibold">
                  Search Hotels
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="hover-lift overflow-hidden"
            >
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1">
                  {renderStars(hotel.rating)}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{hotel.name}</h3>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                    >
                      {amenityIcons[amenity] || <span className="w-4 h-4" />}
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-primary">${hotel.pricePerNight}</span>
                    <span className="text-gray-600">/night</span>
                  </div>
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => {
                      form.setValue("hotelSelection", hotel.name);
                      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hotel Reservation Form */}
        <Card id="booking-form">
          <CardHeader>
            <CardTitle>Reserve Your Stay</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hotelSelection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Selection</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose hotel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hotels.map((hotel) => (
                            <SelectItem key={hotel.id} value={hotel.name}>
                              {hotel.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-in Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Special Requests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requests or preferences..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? "Reserving..." : "Reserve Hotel"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
